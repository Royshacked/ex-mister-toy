import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'userDB'
const AUTH_URL = 'auth/'
const USER_URL = 'user/'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials
}


function getById(userId) {
    return httpService.get(USER_URL, userId)
}

async function login(credentials) {
    try {
        const user = await httpService.post(AUTH_URL + 'login', credentials)
        try {
            return _setLoggedinUser(user)
        } catch (error) {
            throw new Error('there was a problem')
        }
    } catch (error) {
        throw new Error('there was a problem')
    }
}

async function signup(credentials) {
    // const user = { username, password, fullname }
    try {
        const newUser = await httpService.post(AUTH_URL + 'signup', credentials)
        return _setLoggedinUser(newUser)
    } catch (error) {
        throw new Error('there was a problem signing up')
    }
}

async function logout() {
    try {
        await httpService.post(AUTH_URL + 'logout')
    } catch (error) {
        console.log(error)
        throw err
    }
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



