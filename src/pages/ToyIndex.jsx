import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"

import { ToyList } from "../cmps/ToyList.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"

import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"

export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const isLoading = useSelector(state => state.toyModule.isLoading)

    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: SET_FILTER_BY, filterBy: defaultFilter })
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        loadToys(filterBy)
            .then(() => showSuccessMsg('Toys loaded'))
            .catch((err) => {
                console.log(err)
                showErrorMsg('Couldn\'nt load toys')
            })
    }, [filterBy])

    function onRemove(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg(`Toy ${toyId} has been removed successfully`))
            .catch((err) => {
                console.log(err)
                showErrorMsg('Couldn\'nt remove toy')
            })
    }

    return <section className="toy-index">
        <div className="toys-header">
            <h2>Our Toys</h2>
            <ToyFilter filterBy={filterBy} />
            <Link to='/toy/edit'><button>Add</button></Link>
        </div>

        {!isLoading && <ToyList toys={toys} onRemove={onRemove} />}
    </section>
}