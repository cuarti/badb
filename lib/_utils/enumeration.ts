
/**
 * Get key of enum by value
 *
 * @param {Object} enumeration
 * @param {number} value
 * @returns {string}
 */
export function enumKey(enumeration: Object, value: number): string {
    return enumeration[value];
}

/**
 * Get value of enum by key
 *
 * @param {Object} enumeration
 * @param {string} key
 * @returns {number}
 */
export function enumValue(enumeration: Object, key: string): number {
    return enumeration[key];
}
