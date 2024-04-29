const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export const currencyFormat = (curr) => {
  if (curr >= 1000000) {
    const valueInJT = curr / 1000000
    return `${valueInJT} JT`
  } else {
    return formatter.format(curr)
  }
}
