package np.com.bhattaraiankit.userService.Utils.BloomFilter;

import java.util.BitSet;
import java.util.function.Function;

public class BloomFilter<T> {

    private final BitSet bitSet; //to set indicate if an item is present or not 
    private final int bitSetSize;// the total-size of the bitSet
    private final int hashCount; //no. of hashFunction
    private final Function<T,Integer> [] hashFunctions; // the set of hashFunctions used for computation for setting the bit 

    @SafeVarargs
    public BloomFilter(int bitSetSize,int hashCount, Function<T,Integer>... hashFunctions){
        bitSet=new BitSet();
        this.bitSetSize=bitSetSize;
        this.hashCount=hashCount;
        this.hashFunctions=hashFunctions;
    }

    public void add(T value){

        for(Function<T,Integer> function:hashFunctions){
            bitSet.set(Math.abs(function.apply(value)%bitSetSize)); // calculates the hash and set the respective bit ....
        }
    }

    public boolean mightContains(T value){
        for(Function<T,Integer> function: hashFunctions){
            if(!(bitSet.get(Math.abs(function.apply(value)%bitSetSize)))) return false;
        }

        return true;
    }


    public BitSet getBitSet(){
        return bitSet;
    }

    public void setBitSet(BitSet bitSet) {
        this.bitSet.clear();
        this.bitSet.or(bitSet);
    }
}
