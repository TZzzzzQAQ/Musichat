import {getToken} from '@/utils/index.jsx'
import {Navigate} from 'react-router-dom'

const AuthRoute = ({children}) => {
    const isToken = getToken()
    if (isToken) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace/>
    }
}

export default AuthRoute