module.exports = function(grunt) {
  grunt.initConfig({
    peg: {
      parser: {
        src: "parser/n-src-grammar.pegjs",
        dest: "parser/n-src-parser.js"
      }
    },
    watch: {
      files: ['parser/n-src-grammar.pegjs'],
      tasks: ['peg:parser']
    }
  });

  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['peg']);
}

