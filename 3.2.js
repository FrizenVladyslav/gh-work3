function findWaterVolume(roks) {
  let volume = 0;
  while (roks.length > 1) {
    const startIndex = roks.findIndex(
      (rok, index, roks) => rok > roks[++index]
    );
    const start = roks[startIndex];
    if (start === -1) break;
    roks.splice(0, startIndex + 1);
    const endIndex = roks.findIndex(
      row => row > start || row === Math.max.apply(null, roks)
    );
    const end = roks[endIndex];
    if (end === -1) break;
    const rocksWithWater = roks.splice(0, endIndex);
    if (rocksWithWater.length === 0) break;
    const maxValue = rocksWithWater.length * Math.min(start, end);
    volume += rocksWithWater.reduce(
      (accumulator, value) => accumulator - value,
      maxValue
    );
  }
  return volume;
}

console.log(findWaterVolume([2, 5, 1, 3, 1, 2, 1, 7, 7, 6]))
console.log(findWaterVolume([2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0]))
console.log(findWaterVolume([7, 0, 1, 3, 4, 1, 2, 1]))
console.log(findWaterVolume([2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0]))
console.log(findWaterVolume([2, 2, 1, 2, 2, 3, 0, 1, 2]))
console.log(findWaterVolume([2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 8])) 
console.log(findWaterVolume([2, 2, 2, 2, 2]))
