module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ['parser/src-n-grammar.pegjs'],
      tasks: ['peg:parser']
    },
    peg: {
      parser: {
        src: "parser/src-n-grammar.pegjs",
        dest: "parser/src-n-parser.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['peg']);
}

