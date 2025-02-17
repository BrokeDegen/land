export const formatCurrencyInput = (input: string) => {
  // Remove leading zeros except the first one
  input = input.replace(/^0+(?!$|\.)/, '');

  // If the input starts with a dot, prepend a zero
  if (input.startsWith('.')) {
    input = '0' + input;
  }

  return input;
};
