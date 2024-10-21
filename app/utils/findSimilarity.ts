export const isSimilar = (str1: string, str2: string): number => {
  const normalizedStr1 = str1.toLowerCase();
  const normalizedStr2 = str2.toLowerCase();

  if (
    normalizedStr1.includes(normalizedStr2) ||
    normalizedStr2.includes(normalizedStr1)
  ) {
    return 1.0
  }
  return 0.0
};
