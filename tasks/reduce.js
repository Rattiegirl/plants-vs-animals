const arr = [1, 3, 5, 2]
const sum = arr.reduce((a, num) => {
    return a + num
}, 0)
const product = arr.reduce((a, num) => {
    return a * num
}, 1)
const evenSum = arr.reduce((a, num) => {
    if (num % 2 === 0) {
        return a + num
    } else {
        return a
    }
}, 0)
console.log(sum, product, evenSum)

// for (let i=0; i<arr.length; i++){
//     sum += arr[i]
// }