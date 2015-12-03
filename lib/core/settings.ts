
const path = require('path');
const fs = require('fs');


var ENV_FILENAME = '.heliosrc';

var settings = {};
var root = path.dirname(process.argv[1]) + '/';


var env = {};
fs.readFileSync(path.join(root, ENV_FILENAME), 'utf8').split('\n').forEach((l: any) => {

    if(l.trim() !== '' && l[0] !== '#') {

        l = l.split('=');
        if(l.length === 2) {
            env[l[0].trim()] = l[1].trim();
        }
    }

});

console.log(root);

export default {

    root: root,

    env: function(key: string): string {
        return env[key];
    },

    config: function(key: string) {

    }

}
