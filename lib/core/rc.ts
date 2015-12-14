
import {readFileSync} from 'fs';

export const COMMENT_IDENTIFIER: string = '#';

export const IDENTIFIER_REGEX: RegExp = /^\w+$/;
export const NUMBER_REGEX: RegExp = /^\d+(\.\d+)?$/;
export const BOOLEAN_REGEX: RegExp = /^true|false|TRUE|FALSE$/;
export const STRING_REGEX: RegExp = /^\w+$/;

/**
 * Parse config of file
 *
 * @param {string} path
 * @returns {Object}
 */
export function parseRC(path: string): Object {

    let config = {};

    readFileSync(path, 'utf8').split('\n').forEach(function(line, i) {

        if(line.trim() !== '' && line[0] !== COMMENT_IDENTIFIER) {

            var parts = line.split('=');
            if(parts.length === 2) {

                var key = parts[0].trim();
                var value = parts[1].trim();

                if(!key.match(IDENTIFIER_REGEX)) {
                    throw new Error('rc: parse error at line ' + i + ': "' + key + '"');
                }

                if(value.match(NUMBER_REGEX)) {
                    config[key] = value.indexOf('.') >= 0 ? parseFloat(value) : parseInt(value);

                } else if(value.match(BOOLEAN_REGEX)) {
                    config[key] = value[0].toLowerCase() === 't';

                } else if(value.match(STRING_REGEX)) {
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
