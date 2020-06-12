import axios from 'axios'


//action types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

//action creates
const getUser = user =>({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

//thunk creators

export const me = async (disatch) => {
    try {
        const res = await axios.get('/auth/me')
        dispatchEvent(getUser(res.data || defaultUser))
    } catch (error) {
        console.log(error)
    }
}

export const auth = (email, password, method) => {
    async dispatch => {
        let res
        try {
            res = await axios.post(`/auth/${method}`, {email, password})
        } catch (authError) {
            return dispatch(getUser({error: authError}))
        }
        try {
           dispatch(getUser(res.data))
           history.push('/home')
        } catch (error) {
            console.log(error)
        }
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.post('/auth/logout')
        dispatch(removeUser())
        history.push('/login')
    } catch (error) {
        console.log(error)
    }
}

//state
const defaultUser = {}

//reducer
 export default function(state=defaultUser, action) {
    switch (action.type){
        case GET_USER:
            return action.user;
        case REMOVE_USER:
            return defaultUser;
        default:
            return state
    }
}