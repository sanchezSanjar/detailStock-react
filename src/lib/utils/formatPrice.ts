// Floating point math gives values like 54.980000000000004, so money is always
// rounded to cents and shown with two decimals.
export const formatPrice = (value: number): string => {
    const cents = Math.round((Number(value) || 0) * 100);
    return `$${(cents / 100).toFixed(2)}`;
};
