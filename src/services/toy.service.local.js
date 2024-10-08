
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
}


function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            var filteredToys = toys

            if (filterBy.name || filterBy.inStock !== 'all') {
                const regExp = new RegExp(filterBy.name, 'i')

                filteredToys = filteredToys.filter(toy =>
                    regExp.test(toy.name) && (toy.inStock.toString() === filterBy.inStock || filterBy.inStock === 'all')
                )
            }

            if (filterBy.sortBy) {
                const { sortBy } = filterBy
                const dir = +filterBy.desc

                filteredToys = filteredToys.sort((t1, t2) => {
                    if (sortBy === 'name') return t1.name.localeCompare(t2.name) * dir
                    if (sortBy === 'price' || sortBy === 'createdAt') return (t1[sortBy] - t2[sortBy]) * dir
                })
            }

            return filteredToys
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
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: ['doll'],
        inStock: true,
    }
}


function getDefaultFilter() {
    return { name: '', inStock: 'all', label: '', sortBy: '', desc: '1' }
}


function getFilterFromSearchParams(searchParams) {
    return {
        name: searchParams.get('name') || '',
        inStock: searchParams.get('inStock') || 'all',
        label: searchParams.get('label') || '',
        sortBy: searchParams.get('sortBy') || '',
        desc: searchParams.get('desc') || '1',
    }
}


