
/**
 * Enumeration utils for typescript enums
 */
export class Enumeration {

    /**
     * Get key of enum by value
     *
     * @param {Object} enumeration
     * @param {number} value
     * @returns {string}
     */
    public static getKey(enumeration: Object, value: number): string {
        return enumeration[enumeration[value]];
    }

    /**
     * Get value of enum by key
     *
     * @param {Object} enumeration
     * @param {string} key
     * @returns {number}
     */
    public static getValue(enumeration: Object, key: string): number {
        return enumeration[key];
    }

}
