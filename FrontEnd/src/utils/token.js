// Encapsulate methods related to tokens
const TOKEN = 'token_key'
const setToken = (token) => {
    localStorage.setItem(TOKEN, token)
}

const getToken = () => {
    return localStorage.getItem(TOKEN)
}

const removeToken = () => {
    localStorage.removeItem(TOKEN)
}

export {
    setToken,
    getToken,
    removeToken
}