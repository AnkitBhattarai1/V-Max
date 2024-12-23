package np.com.bhattaraiankit.auth_service.BloomFilter;

import java.util.BitSet;
import java.util.function.Function;
public class BloomFilter<T> {

    private final BitSet bitset;
    private final int bitSetSize;
    private final int hashCount;
    private final Function<T,Integer>[] hashFunctions;

    @SafeVarargs
    public BloomFilter(int bitSetSize, int hashCount, Function<T,Integer>... hashFunctions ){
        this.bitset = new BitSet();
        this.bitSetSize=bitSetSize;
        this.hashCount=hashCount;
        this.hashFunctions=hashFunctions;

    }



    public void add(T value){
        for(Function<T,Integer> function : hashFunctions)
            bitset.set(Math.abs(function.apply(value)%bitSetSize));
    }

    public boolean mightContains(T value){
        for(Function<T,Integer> function:hashFunctions)
            if(!(bitset.get(Math.abs(function.apply(value)%bitSetSize)))) return false;
        return true;
    }
    public void setBitSet(BitSet bitSet){
        this.bitset.clear();
        this.bitset.or(bitset);
    }


    public BitSet getBitSet(){
        return bitset;
    }
    
}
