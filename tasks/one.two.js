const getRandom = (r) => {
    let ball = Math.random()*r+1
    ball.Math.floor(ball)
    return ball
}
console.log(getRandom(7))