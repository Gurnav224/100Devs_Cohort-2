

function generateRandom(){
    return Math.floor(Math.random()*100)
}

function celciusToFahrenheit(celsius){
    return (celsius*9)/5+32
}

module.exports ={ generateRandom, celciusToFahrenheit}