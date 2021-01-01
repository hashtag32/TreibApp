const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================
* Product Page: https://spexdoc.net
* Copyright 2020 SpexDoc (https://spexdoc.net)
* Licensed under MIT (https://github.com/hashtag32/spexdocapp/blob/master/LICENSE.md)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Material Dashboard React - v1.9.0
=========================================================
* Product Page: https://spexdoc.net
* Copyright 2020 SpexDoc (https://spexdoc.net)
* Licensed under MIT (https://github.com/hashtag32/spexdocapp/blob/master/LICENSE.md)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://spexdoc.net
* Copyright 2020 SpexDoc (https://spexdoc.net)
* Licensed under MIT (https://github.com/hashtag32/spexdocapp/blob/master/LICENSE.md)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
