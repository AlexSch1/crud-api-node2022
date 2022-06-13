import 'dotenv/config'

console.log(process.env['NODE_ENV'])
console.log(process.env['PORT'])

function sayMyName(name: string): void {
    if (name === "Heisenberg") {
        console.log("You're right 👍");
    } else {
        console.log("You're wrong 👎");
    }
}

sayMyName("Heisenberg");