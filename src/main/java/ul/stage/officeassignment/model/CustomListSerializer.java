package ul.stage.officeassignment.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CustomListSerializer extends StdSerializer<Bureau> {

    public CustomListSerializer(Class<Bureau> t) {
        super(t);
    }

    public CustomListSerializer(JavaType type) {
        super(type);
    }

    @Override
    public void serialize(Bureau bureau, JsonGenerator gen, SerializerProvider provider) throws IOException {

        gen.writeObject(bureau.getNumero());
    }

}
