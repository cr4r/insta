var {ig,igstalk} = require('./lib/insta')

// image, video
ig('https://www.instagram.com/p/B7i-6rvgMR4').then((hsl)=> {
    console.log(hsl)
})

//Igstalk
igstalk('myfabolouslife').then((hsl)=> {
        console.log(hsl)
})

