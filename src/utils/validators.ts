export function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export function required(value: any) {
  return value !== undefined && value !== null && value !== '';
}
