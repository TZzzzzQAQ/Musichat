const Token = 'token_key'
const setToken = (token) => {
    localStorage.setItem(Token, token)
}

const getToken = () => {
    return localStorage.getItem(Token)
}

const removeToken = () => {
    localStorage.removeItem(Token)
}

export {
    setToken,
    getToken,
    removeToken
}