imag = require('./lib/insta')

//image, video
imag('https://www.instagram.com/p/B7i-6rvgMR4').then((hsl)=> {
    console.log(hsl)
})