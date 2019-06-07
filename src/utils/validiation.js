export const isEmpty = (val) => {
    if(val === null || val === undefined) return true;
    if(typeof val === 'string' && val.trim().length === 0) return true;
    if(typeof val === 'object' && Object.keys(val).length === 0) return true;
    return false;
}

export const isPhone = (val) => /^\d{9,12}$/.test(val);

export const isEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}