export const isEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

export const checkExit = (array, value) => array.includes(value);

export const checkMinLength = (val, key, length) => {
    if (val.length >= length) return '';
    return `${key} must be at least ${length} characters long`;

}

export const checkMaxLength = (val, key, length) => {
    if (val.length <= length) return '';
    return `${key} user name should not exceed ${length} characters`;

}


export const addElment = (array, value, callback, isFrist = true) => {
    const isExit =
        (callback && callback(array, value)) || checkExit(array, value);

    if (isExit) return array;
    return isFrist ? [...array, value] : [...array, value];
};


export const displayName = (name) => {
    return name.length >= 10 ? name.substring(0, 10) + '...' : name.length
};

export const getLocalStorage = (key) => {
    return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : "";
}

export const setLocalStorage = (key, value) => {
    console.log(key, value)
    return localStorage.setItem(key, JSON.stringify(value))
}

/**
 * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RlNmM3MjcxMGVkYzQ0NzcwYWYzOGUiLCJpYXQiOjE2NzY3MDM3MzUsImV4cCI6MTY3NjcwNzMzNX0.pXjKSL-zJmIZrdJc3KIPP6uls8XuOHxt0dfVx6mqL7o"
 * 
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RlNmM3MjcxMGVkYzQ0NzcwYWYzOGUiLCJpYXQiOjE2NzY3MDM3MzQsImV4cCI6MTY3NjcwNzMzNH0.Mb_d4_Kj1anxPfN2_VglG15T9YIUIrUppxG9A1mbj64
 * 
 * 
 * Mb_d4_Kj1anxPfN2_VglG15T9YIUIrUppxG9A1mbj64

 */