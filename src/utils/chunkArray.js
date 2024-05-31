export const chunkArray = (array, chunkSize = 3) => {
  const resultArray = [[], [], []]

  array.forEach((item, index) => {
    resultArray[index % chunkSize]?.push(item)
  })

  return resultArray
}
