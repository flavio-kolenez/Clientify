import mongoose, { Schema, Model } from "mongoose";
import { IClient } from "../types/index.js";
import AddressSchema from "./AddressSchema.js";

const ClientSchema: Schema<IClient> = new mongoose.Schema({
    clientType: {
        type: String,
        enum: ["CPF", "CNPJ"],
        required: [true, "Tipo de cliente é obrigatório!"]
    },
    document: {
        type: String,
        required: [true, "Número do documento necessário!"],
        validate: {
            validator: function (this: IClient, value: string): boolean {
                const clientType = this.clientType || (this as any).getUpdate?.()?.clientType || (this as any).get?.('clientType');
                
                if (clientType === "CPF") {
                    return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(value);
                } else if (clientType === "CNPJ") {
                    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value);
                }
                return true;
            },
            message: "Formato do documento inválido para o tipo selecionado"
        },
        unique: true
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
        unique: true
    },
    phone: {
        type: String,
        match: [/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/, "Número de telefone em formato inválido!"],
        default: ""
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

const Client: Model<IClient> = mongoose.model<IClient>("Client", ClientSchema);

export default Client;