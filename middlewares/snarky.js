
// MIDDLEWARE:
// Remove your middleware from the app.use in your index
// In my middleware function I can define the name of a variable by chaining the variable name I want to use to my req
// I can send the results of my middleware anywhere by assigning a value to my new req variable
// Assign the value of your random dumb quote to your new req variable
let quotes = [
    'Computers themselves, and software yet to be developed, will revolutionize the way we learn.',
    'A user interface is like a joke. If you have to explain it, it’s not that good.',
    'My code DOESN’T work, I have no idea why. My code WORKS, I have no idea why.',
    'Things aren’t always #000000 and #FFFFFF',
    'One man’s crappy software is another man’s full time job. – Jessica Gaston',
    'Old programmers never die. They simply give up their resources.',
    'Software is like sex: It’s better when it’s free. – (Linus Torvalds)',
]

const snarky = function(req, res, next) {
    res.send(quotes[Math.floor(Math.random()*quotes.length)]);
    next()
}

module.exports = snarky;