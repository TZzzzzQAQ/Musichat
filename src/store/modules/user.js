import {createSlice} from '@reduxjs/toolkit'
import {request} from '@/utils'

const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: ''
    },
    // 同步修改方法
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload
        }
    }
})

// 解构出actionCreater
const {setUserInfo} = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setUserInfo(res.data.token))
    }
}

export {fetchLogin}

export default userReducer