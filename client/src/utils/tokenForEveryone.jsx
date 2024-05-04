const TokenForEveryone = 'tokenForEveryone';
const setEveryoneToken = (token) => {
    sessionStorage.setItem(TokenForEveryone, token)
}

const getEveryoneToken = () => {
    return sessionStorage.getItem(TokenForEveryone)
}

const removeEveryoneToken = () => {
    sessionStorage.removeItem(TokenForEveryone)
}

export {
    setEveryoneToken,
    getEveryoneToken,
    removeEveryoneToken
}