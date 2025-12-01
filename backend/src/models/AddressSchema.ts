import mongoose, { Schema, Document } from "mongoose";
import { IAddress } from "../types/index.js";
import axios from "axios";

const AddressSchema: Schema<IAddress> = new mongoose.Schema({
    postalCode: {
        type: String,
        required: [true, "CEP é obrigatório!"],
        validate: {
            validator: function(value: string): boolean {
                return /^\d{5}-?\d{3}$/.test(value);
            },
            message: "CEP Inválido, era esperado o formato XXXXX-XXX"
        }
    },
    street: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    }
}, { _id: false });

// Hook que roda antes de salvar o endereço
// validando o código postal na API dos ViaCEP
AddressSchema.pre<IAddress>("save", async function (next) {
    if (this.isModified("postalCode")) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${this.postalCode}/json/`);
            
            if (!response.data.erro) {
                this.street = response.data.logradouro || "";
                this.city = response.data.localidade || "";
                this.state = response.data.uf || "";
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.warn("Erro ao fazer requisição do CEP no ViaCEP:", errorMessage);
        }
    }
    next();
});

export default AddressSchema;