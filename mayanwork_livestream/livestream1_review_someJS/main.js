// const turns = prompt('enter your number',0);

// console.log(turns)

// // check for odd
// let number = 10;
// for(let i = 0; i <= number; i++){
//     if(i%2===0){
//         console.log(`${i} is even`)
//     }
//     else{
//         console.log(`${i} is odd`)
//     }
// }

// let number = prompt('Enter an number');

// while(number <= 100){
//     number = prompt('Enter an number')
//     if(number > 50 || number <100 ){
//         break;
//     }
// }

// // print table

// let table = parseInt(prompt("Enter an number"));

// while(table < 2 || table > 9){
//     table = parseInt(prompt('Enter an number'))
// }


// for(let i = 1; i <=10; i++){
//     console.log(`${table} * ${i} = ${table * i}`)
// }


// let userWord = prompt('enter a word');

// while(!(userWord === 'yes' || userWord === 'no')){
//     userWord = prompt('enter a word')
// }


for(let i =1; i <= 100; i++){
    if((i%3===0) && (i%5===0)){
        console.log(`fizzBuzz`)
    }
    else if(i%3===0){
        console.log(`Fizz`)
    }
    else if(i%5===0){
        console.log('Buzz')
    }
    else{
        console.log(i)
    }
}
