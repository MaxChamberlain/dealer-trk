export const proper = (string) => {
    return string.split(' ').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(' ');
}

export const parsePhone = (phone) => {
    return phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

export const properNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}