module.exports = function(grunt) {
  grunt.initConfig({
    peg: {
      parser: {
        src: "parser/n-src-grammar.pegjs",
        dest: "parser/n-src-parser.js"
      }
    }
  })

  grunt.loadNpmTasks('grunt-peg');
  grunt.registerTask('default', ['peg']);
}

