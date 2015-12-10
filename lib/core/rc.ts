
import * as fs from 'fs';

/**
 * RC file config parser
 */
export class RC {

    public static COMMENT_IDENTIFIER: string = '#';

    public static IDENTIFIER_REGEX: RegExp = /^\w+$/;
    public static NUMBER_REGEX: RegExp = /^\d+(\.\d+)?$/;
    public static BOOLEAN_REGEX: RegExp = /^true|false|TRUE|FALSE$/;
    public static STRING_REGEX: RegExp = /^\w+$/;


    /**
     * Parse config of file
     *
     * @param {string} path
     * @returns {Object}
     */
    public static parse(path: string): Object {

        var config = {};

        fs.readFileSync(path, 'utf8').split('\n').forEach(function(line, i) {

            if(line.trim() !== '' && line[0] !== RC.COMMENT_IDENTIFIER) {

                var parts = line.split('=');
                if(parts.length === 2) {

                    var key = parts[0].trim();
                    var value = parts[1].trim();

                    if(!key.match(RC.IDENTIFIER_REGEX)) {
                        throw new Error('rc: parse error at line ' + i + ': "' + key + '"');
                    }

                    if(value.match(RC.NUMBER_REGEX)) {
                        config[key] = value.indexOf('.') >= 0 ? parseFloat(value) : parseInt(value);

                    } else if(value.match(RC.BOOLEAN_REGEX)) {
                        config[key] = value[0].toLowerCase() === 't';

                    } else if(value.match(RC.STRING_REGEX)) {
                        config[key] = value;

                    } else {
                        throw new Error('rc: parse error at line ' + i + ': "' + value + '"');
                    }

                } else {
                    throw new Error('rc: parse error at line ' + i + ': "' + line + '"');
                }

            }

        });

        return config;
    }

}
