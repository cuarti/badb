
process.chdir(__dirname);

(function() {
    'use strict';

    var badb;
    try {
        badb = require('../..');
        //badb = require('badb');

    } catch(e) {
        console.error('You need `badb` module installed in the same directory as your app.');
        console.error('Please run `npm install badb --save` to install.');
        return;
    }

    badb.serve();

}());
