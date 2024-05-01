import {getEveryoneToken} from '@/utils/index.jsx'
import {Navigate} from 'react-router-dom'

const AuthRoute = ({children}) => {

    const isToken = getEveryoneToken()
    if (isToken) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace/>
    }
}

export default AuthRoute

// 拿数据    const profile = useSelector(state => state.profile)