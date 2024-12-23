package np.com.bhattaraiankit.userService.Utils.BloomFilter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.BitSet;

public class BloomFilterUtils {
     
 public static byte[] serialize(BitSet bitSet) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(bitSet);
        oos.flush();
        return bos.toByteArray();
    }

    public static BitSet deserialize(byte[] data) throws IOException, ClassNotFoundException {
        ByteArrayInputStream bis = new ByteArrayInputStream(data);
        ObjectInputStream ois = new ObjectInputStream(bis);
        return (BitSet) ois.readObject();
    }}
