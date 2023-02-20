export function formatDate(date?: string | null) {
  if (!date) return "";
  const d = new Date(date);
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Opcion 1 de formateo de numeros
 * Formatea los numeros en formato de moneda (con Intl NumberFormat)
 * @param {float} number
 */
export function currency(number: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number || 0);
}
