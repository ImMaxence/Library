export const getFirstLetter = (str) => {
    if (typeof str !== 'string') {
        throw new Error('Le paramètre doit être une chaîne de caractères');
    }
    return str.charAt(0).toUpperCase();
};