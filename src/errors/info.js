export const generateUserErrorInfoFirstName = () => {
    return `El campo "First Name" se encuentra vacio o es invalido`
}

export const generateUserErrorInfoLastName = () => {
    return `El campo "Last Name" se encuentra vacio o es invalido`
}

export const generateUserErrorInfoAge = () => {
    return `El campo "Age" se encuentra vacio o es invalido`
}

export const generateProdErrorInfo = () => {
    return `El campo "Name" se encuentra vacio o es invalido`
}

export const generateCartErrorInfoStock = (info) => {
    return `El producto deseado se encuentra fuera de stock en estos momentos la cantidad del prod es de "${info.stock}"`
}