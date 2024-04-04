export function generateSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retira acentos
    .toLowerCase() // caixa baixa
    .replace(/[^\w\s-]/g, "") // remove simbolos
    .replace(/\s+/g, "-"); // remove espaços por hífen
}