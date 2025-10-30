import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    postalCode: {
        type: String,
        required: [true, "CEP é obrigatório!"],
        validate: {
            validator: /^\d{5}-?\d{3}$/, // valida formato CEP brasileiro
            message: "CEP Invalido era experado o formato XXXXX-XXX"
        }
    },
    street: String,
    state: String,
    city: String
}, { _id: false });

// Hook que roda antes de salvar o endereço
AddressSchema.pre("save", async function (next) {
    if (this.isModified("postalCode")) {
        try {
            const axios = (await import('axios')).default;
            const res = await axios.get(`https://viacep.com.br/ws/${this.postalCode}/json/`);
            if (!res.data.erro) {
                this.street = res.data.logradouro;
                this.city = res.data.localidade;
                this.state = res.data.uf;
            }
        } catch (err) {
            console.warn("Erro ao fazer requisição do CEP no ViaCEP:", err.message);
        }
    }
    next();
});

export default AddressSchema;