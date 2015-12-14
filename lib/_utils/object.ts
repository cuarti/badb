
/**
 * Clone an object
 *
 * @returns {T}
 */
export function clone<T>(): T {

    var cloned: T = <T>{};

    for(var i in this.value) {
        if(this.value.hasOwnProperty(i)) {
            cloned[i] = this.value[i];
        }
    }

    return cloned;
}

/**
 * Extend an object with new properties
 *
 * @param {T} obj1
 * @param {Object} obj2
 * @returns {T}
 */
export function extend<T>(obj1: T, obj2: Object): T {

    for(var i in obj2) {
        if(obj2.hasOwnProperty(i)) {
            obj1[i] = obj2[i];
        }
    }

    return obj1;
}
