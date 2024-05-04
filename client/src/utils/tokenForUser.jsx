const TokenForUser = 'tokenForUser';
const setUserToken = (token) => {
    sessionStorage.setItem(TokenForUser, token)
}

const getUserToken = () => {
    return sessionStorage.getItem(TokenForUser)
}

const removeUserToken = () => {
    sessionStorage.removeItem(TokenForUser)
}

export {
    setUserToken,
    getUserToken,
    removeUserToken
}