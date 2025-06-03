export const formatRupiah = (value: number): string => {
  if (value >= 1_000_000_000_000) {
    return `Rp ${(value / 1_000_000_000_000).toFixed(2)}T`; // Triliun
  } else if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toFixed(2)}M`; // Miliar
  } else if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(2)}Jt`; // Juta (optional)
  } else {
    return `Rp ${value.toLocaleString("id-ID")}`; // Raw format
  }
};