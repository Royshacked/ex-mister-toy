import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
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
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    try {
        const users = await storageService.query(STORAGE_KEY)
        const user = users.find(user => user.username === username)
        try {
            return _setLoggedinUser(user)
        } catch (error) {
            throw new Error('there was a problem')
        }
    } catch (error) {
        throw new Error('there was a problem')
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    try {
        const newUser = await storageService.post(STORAGE_KEY, user)
        return _setLoggedinUser(newUser)
    } catch (error) {
        throw new Error('there was a problem signing up')
    }
}

async function logout() {
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



