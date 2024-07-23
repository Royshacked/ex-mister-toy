import { httpService } from './http.service.js'

// const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

const labels = ['on wheels', 'box game', 'art', 'baby', 'doll', 'puzzle',
    'outdoor', 'battery powered']

const shopBranches = [
    {
        name: 'tel aviv',
        coords: {
            lat: 32.109333,
            lng: 34.855499,
        }
    },
    {
        name: 'hadera',
        coords: {
            lat: 32.4374056,
            lng: 34.9256168,
        }
    },
    {
        name: 'bat yam',
        coords: {
            lat: 32.017136,
            lng: 34.745441,
        }
    },
]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getLabelsForFilter,
    getLabels,
    getShopBranches,
    getDefaultBranch
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
        labels: [],
        inStock: true,
    }
}


function getDefaultFilter() {
    return { name: '', inStock: 'all', labels: '', sortBy: '', desc: '-1' }
}


function getFilterFromSearchParams(searchParams) {
    return {
        name: searchParams.get('name') || '',
        inStock: searchParams.get('inStock') || 'all',
        labels: searchParams.get('labels') ? searchParams.get('labels').split(',') : '',
        sortBy: searchParams.get('sortBy') || '',
        desc: searchParams.get('desc') || '-1',
    }
}

function getLabelsForFilter() {
    return httpService.get(BASE_URL + 'labels')
}

function getLabels() {
    return labels
}

function getShopBranches() {
    return shopBranches
}

function getDefaultBranch() {
    return {
        name: 'tel aviv',
        coords: {
            lat: 32.109333,
            lng: 34.855499,
        }
    }
}



