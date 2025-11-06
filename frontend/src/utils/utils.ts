export function formatDocument(value: string) {
  // Remove tudo que não for número
  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 11) {
    // CPF
    const formatted = numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return { formatted, type: "CPF" };
  } else {
    // CNPJ
    const formatted = numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
    return { formatted, type: "CNPJ" };
  }
};