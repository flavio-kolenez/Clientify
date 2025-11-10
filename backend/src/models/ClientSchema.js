import mongoose from "mongoose";
import AddressSchema from "./AddressSchema.js";

const ClientSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    clientType: {
        type: String,
        enum: ["CPF", "CNPJ"],
        required: [true, "Tipo de cliente é obrigatório!"]
    },
    document: {
        type: String,
        required: [true, "Número do documento necessário!"],
        validate: {
            validator: function (value) {
                // Durante updates, this.clientType pode não estar disponível
                // então vamos verificar se conseguimos acessar o clientType
                const clientType = this.clientType || this.getUpdate?.()?.clientType || this.get?.('clientType');
                
                if (clientType === "CPF") {
                    return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(value);
                } else if (clientType === "CNPJ") {
                    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value);
                }
                
                // Se não conseguir determinar o tipo, deixa passar (será validado no controller)
                return true;
            },
        },
        unique: [true, "Documento já cadastrado!"]
    },
    name: {
        type: String,
        required: [true, "Nome é obrigatório!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email é obrigatório!"],
        trim: true,
        lowercase: true,
        match: [
            /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            "Email em formato inválido!"
        ],
        unique: [true, "Email já cadastrado!"]
    },
    phone: {
        type: String,
        match: [/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/, "Número de telefone em formato inválido!"],
    },
    address: AddressSchema,
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true 
});

export default mongoose.model("Client", ClientSchema);