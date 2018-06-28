module.exports = {
    options: {
        banner: '/*! <%= package.name %> - v<%= package.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> © 2018-2019 Chuanyu Wang */'
    },
    public: {
        files: [{
            expand: true,
            src: ['public/js/*.js']/*
            dest: 'public/js',
            cwd: '.',
            /*
            rename: function (dst, src) {
                // To keep the source js files and make new files as `*.min.js`: 
                // return dst + '/' + src.replace('.js', '.min.js'); 
                // Or to override to src: 
                return src;
            }
            */
        }]
    }
};