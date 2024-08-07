import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"

import { ToyList } from "../cmps/ToyList.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"

import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"
import { Button } from "@mui/material"
import { LoginSignup } from "../cmps/LoginSignup.jsx"

export function ToyIndex() {
    const user = useSelector(state => state.userModule.loggedInUser)
    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const isLoading = useSelector(state => state.toyModule.isLoading)

    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()

    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)

    useEffect(() => {
        dispatch({ type: SET_FILTER_BY, filterBy: defaultFilter })

        return () => dispatch({ type: SET_FILTER_BY, filterBy: toyService.getDefaultFilter() })
    }, [])

    useEffect(() => {
        setSearchParams({ ...filterBy, labels: filterBy.labels ? filterBy.labels.join(',') : '' })
        const fetchData = async () => {
            try {
                const toys = await loadToys(filterBy)
                console.log(toys)
            }
            catch (err) {
                console.log(err)
                showErrorMsg('Couldn\'nt load toys')
            }
        }
        fetchData()
    }, [filterBy])

    async function onRemove(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg(`Toy has been removed successfully`)
        }
        catch (err) {
            console.log(err)
            showErrorMsg('Couldn\'nt remove toy')
        }
    }

    return <section className="toy-index">
        <div className="index-header">
            <div className="index-user">
                <h2>Our Toys</h2>
            </div>

            <ToyFilter filterBy={filterBy} />
            {user && user.isAdmin && <Link to='/toy/edit'><Button variant='outlined'>Add Toy</Button></Link>}
        </div>

        {!isLoading ? <ToyList toys={toys} onRemove={onRemove} /> : <h2>Loading...</h2>}
    </section>
}