module.exports = {
  plugins: [
    require('autoprefixer')({
      "browsers": [
        "last 2 versions",
        "Firefox >= 20",
        "iOS 7",
        "> 5%"
      ]
    }),
    require('cssnano')()
  ]
}
