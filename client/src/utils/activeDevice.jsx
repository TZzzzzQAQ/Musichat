const ActiveDevice = 'activeDevice';
const setActiveDevice = (token) => {
    localStorage.setItem(ActiveDevice, token)
}

const getActiveDevice = () => {
    return localStorage.getItem(ActiveDevice)
}

const removeActiveDevice = () => {
    localStorage.removeItem(ActiveDevice)
}

export {
    setActiveDevice,
    getActiveDevice,
    removeActiveDevice
}