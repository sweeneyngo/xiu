export function add(a: string, b: number) {
  let carry = b;
  let result = "";
  let i = a.length - 1;
  while (i >= 0 || carry > 0) {
    const digit = i >= 0 ? parseInt(a[i]) : 0;
    const sum = digit + (carry % 10);
    result = (sum % 10).toString() + result;
    carry = Math.floor(sum / 10) + Math.floor(carry / 10);
    i--;
  }
  return result;
}
