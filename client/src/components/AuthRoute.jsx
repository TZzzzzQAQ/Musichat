import {getUserToken} from '@/utils/index.jsx'
import {Navigate} from 'react-router-dom'

const AuthRoute = ({children}) => {

    const isToken = getUserToken()
    if (isToken) {
        return <>{children}</>
    } else {
        return <Navigate to="/account" replace/>
    }
}

export default AuthRoute
