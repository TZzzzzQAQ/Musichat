const TokenForEveryone = 'tokenForEveryone';
const setEveryoneToken = (token) => {
    localStorage.setItem(TokenForEveryone, token)
}

const getEveryoneToken = () => {
    return localStorage.getItem(TokenForEveryone)
}

const removeEveryoneToken = () => {
    localStorage.removeItem(TokenForEveryone)
}

export {
    setEveryoneToken,
    getEveryoneToken,
    removeEveryoneToken
}