package np.com.bhattaraiankit.userService.Utils.BloomFilter;

import java.io.IOException;
import java.util.BitSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class BloomFilterService {

    private final String BLOOM_FILTER_SECRET_KEY = "user_service_bloom_filter";

    @Autowired
    RedisTemplate<String,byte[]> redisTemplate;
   
    public void setBitSet(BitSet bitSet){

        try{
            byte [] data = BloomFilterUtils.serialize(bitSet);
            redisTemplate.opsForValue().set(BLOOM_FILTER_SECRET_KEY,data); 
            System.out.println("setBitset");
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    public BitSet loadBitSet(){
        try {
          byte[] data = redisTemplate.opsForValue().get(BLOOM_FILTER_SECRET_KEY);
            
          if(data==null) return new BitSet();

          return BloomFilterUtils.deserialize(data);
        }
        catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        catch(ClassNotFoundException e){
            e.printStackTrace();
            return null;
        }
    }
    
}
