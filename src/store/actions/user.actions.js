import { userService } from "../../services/user.service.js"
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    }
    catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    console.log(credentials)
    try {
        const user = await userService.signup(credentials)
        console.log(user)
        store.dispatch({ type: SET_USER, user })
        return user
    }
    catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout(credentials) {
    try {
        await userService.logout(credentials)
        store.dispatch({ type: SET_USER, user: null })
    }
    catch (err) {
        console.log('user actions -> Cannot logout', err)
    }
}

