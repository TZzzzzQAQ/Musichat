const TokenForUser = 'tokenForUser';
const setUserToken = (token) => {
    localStorage.setItem(TokenForUser, token)
}

const getUserToken = () => {
    return localStorage.getItem(TokenForUser)
}

const removeUserToken = () => {
    localStorage.removeItem(TokenForUser)
}

export {
    setUserToken,
    getUserToken,
    removeUserToken
}