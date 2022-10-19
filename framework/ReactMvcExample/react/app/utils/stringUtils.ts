export const stringIsNullOrEmpty = (str: null | undefined | string): boolean => {
    return !!!str || /^\s*$/.test(str);
};
