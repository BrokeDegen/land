export const truncateAddress = (address: string) => {
  if (address.length <= 8) {
    return address; // Return the address as is if it's too short to truncate
  }
  const start = address.slice(0, 7); // Get the first 4 characters
  const end = address.slice(-4); // Get the last 4 characters
  return `${start}****${end}`;
};
