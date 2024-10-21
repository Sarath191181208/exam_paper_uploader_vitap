export const getShortForm = (courseName: string): string => {
  if (!courseName) return '';
  
  return courseName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};
