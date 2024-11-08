export const formatMoney = (amount: number) => {
  // For amounts >= 1 million, show in millions (M)
  if (amount >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 1,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(amount);
  }
  
  // For regular amounts, show with no decimal places
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0
  }).format(amount);
};

