module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ['src-n-grammar.pegjs'],
      tasks: ['peg:parser']
    },
    peg: {
      parser: {
        src: "src-n-grammar.pegjs",
        dest: "index.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['peg']);
}
