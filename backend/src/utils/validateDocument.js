export function validateDocument(clientType, document) {
    if (clientType === "CPF" && !/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(document)) {
        return res.status(400).json({
            status: "error",
            message: "CPF inválido: esperado o formato XXX.XXX.XXX-XX"
        });
    };

    if (clientType === "CNPJ" && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(document)) {
        return res.status(400).json({
            status: "error",
            message: "CNPJ inválido: esperado o formato XX.XXX.XXX/XXXX-XX"
        });
    };
}