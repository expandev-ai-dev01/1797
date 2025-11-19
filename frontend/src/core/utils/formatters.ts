/**
 * @summary Formats a number into Brazilian currency format (R$).
 * @param {number} value - The number to format.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * @summary Formats a number into a kilometer string with a thousand separator.
 * @param {number} value - The number to format.
 * @returns {string} The formatted kilometer string (e.g., "100.000 km").
 */
export const formatKilometers = (value: number): string => {
  return `${new Intl.NumberFormat('pt-BR').format(value)} km`;
};
