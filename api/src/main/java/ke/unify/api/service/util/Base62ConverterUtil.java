package ke.unify.api.service.util;


import io.seruco.encoding.base62.Base62;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.UUID;

public class Base62ConverterUtil {

    private static final Base62 BASE62 = Base62.createInstance();

    public static String generateUuid(){
        UUID uuid = UUID.randomUUID();
        ByteBuffer byteBuffer = ByteBuffer.wrap(new byte[16]);
        byteBuffer.putLong(uuid.getMostSignificantBits());
        byteBuffer.putLong(uuid.getLeastSignificantBits());

        byte[] bytes = byteBuffer.array();
        return new String(BASE62.encode(bytes), StandardCharsets.UTF_8);
    }

    public static String convert(Long id) {
        if (id == null){
            return null;
        }



        ByteBuffer bb = ByteBuffer.allocate(Long.BYTES);
        bb.putLong(Long.MAX_VALUE - id);
        byte[] bytes = bb.array();

        // Encode the byte array in base62
        return new String(BASE62.encode(bytes), StandardCharsets.UTF_8);
    }
}
