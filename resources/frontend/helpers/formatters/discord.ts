export function getNameInitials(name: string) {
  const words = name.split(' ');

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words.map(word => word[0].toUpperCase()).join('');
}
