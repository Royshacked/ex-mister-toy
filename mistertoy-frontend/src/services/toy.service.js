
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getFilterFromSearchParams,
}

// _createToy()

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.name) filterBy.name = ''
            const regExp = new RegExp(filterBy.name, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) && (toy.inStock.toString() === filterBy.inStock || filterBy.inStock === 'all')
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
    }
}

function getRandomToy() {
    return {
        name: 'Doll-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function getDefaultFilter() {
    return { name: '', inStock: 'all' }
}


function getFilterFromSearchParams(searchParams) {
    return {
        name: searchParams.get('name') || '',
        inStock: searchParams.get('inStock') || 'all',
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))

function _createToy() {
    const toy = {
        _id: '',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
    }

    return save(toy)
}