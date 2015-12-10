
/**
 * Object utilities
 */
export class TObject<T> {

    public value: T;

    public constructor(value: T) {
        this.value = value;
    }

    /**
     * Clone object
     *
     * @returns {T}
     */
    public clone(): T {

        var clone: any = {};

        for(var i in this.value) {
            if(this.value.hasOwnProperty(i)) {
                clone[i] = this.value[i];
            }
        }

        return clone;
    }

    /**
     * Extend object with new properties
     *
     * @param {Object} obj
     * @returns {TObject}
     */
    public extend(obj: Object): TObject<T> {

        for(var i in obj) {
            if(obj.hasOwnProperty(i)) {
                this.value[i] = obj[i];
            }
        }

        return this;
    }

    /**
     * Clone object
     *
     * @param {T} obj
     * @returns {T}
     */
    public static clone<T>(obj: T): T {
        return new TObject(obj).clone();
    }

    /**
     * Extend object with new properties
     *
     * @param {T} obj1
     * @param {Object} obj2
     * @returns {T}
     */
    public static extend<T>(obj1: T, obj2: Object): T {
        return new TObject(obj1).extend(obj2).value;
    }

}
