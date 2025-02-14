let mix = require('laravel-mix');

mix
    .js('src/assets/js/app.js', 'assets/js/app.js')
    .vue()
    .sass('src/assets/sass/styles.scss', 'assets/css/styles.css' )
    .setPublicPath('.')
    .version();
