let mix = require('laravel-mix');

mix
    .js('src/assets/js/app.js', 'assets/js/app.js')
    .sass('src/assets/sass/style.scss', 'assets/css/style.css' )
    .setPublicPath('.')
    .version();
