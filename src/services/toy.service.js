import { httpService } from './http.service.js'

// const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getLabels,
}


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + toyId)
}


function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        // toy.createdAt = Date.now()
        return httpService.post(BASE_URL, toy)
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
    return { name: '', inStock: 'all', labels: '', sortBy: '', desc: '1' }
}


function getFilterFromSearchParams(searchParams) {
    return {
        name: searchParams.get('name') || '',
        inStock: searchParams.get('inStock') || 'all',
        labels: searchParams.get('labels').split(',') || [],
        sortBy: searchParams.get('sortBy') || '',
        desc: searchParams.get('desc') || '1',
    }
}

function getLabels() {
    return httpService.get(BASE_URL+'labels')
}



