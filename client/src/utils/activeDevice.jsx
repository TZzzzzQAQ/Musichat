const ActiveDevice = 'activeDevice';
const setActiveDevice = (token) => {
    sessionStorage.setItem(ActiveDevice, token)
}

const getActiveDevice = () => {
    return sessionStorage.getItem(ActiveDevice)
}

const removeActiveDevice = () => {
    sessionStorage.removeItem(ActiveDevice)
}

export {
    setActiveDevice,
    getActiveDevice,
    removeActiveDevice
}