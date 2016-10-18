# Template for Gulp based project

Inspire by CSS-Tricks [tutorial](https://css-tricks.com/gulp-for-beginners/).

Run `npm install` to setup project. And don't forget to edit `package.json` content for your project.

### Usage

* Development
  * `gulp` Invokes default gulp task. This task compiles PUG to HTML, SCSS to CSS. Then places all generated files and JavaScript files from `DEV_DIR` folder (`app/`) to `BUILD_DIR` folder (`build/`) and start Browsersync.

* Production
  * `gulp build` This task copies all generated HTML files, concatenates and minifies all generated CSS and JavaScript files from `BUILD_DIR` folder to `DIST_DIR` folder (`dist/`).
