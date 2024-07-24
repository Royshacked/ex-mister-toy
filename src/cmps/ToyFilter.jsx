import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/toy.reducer"
import { toyService } from "../services/toy.service"
import { useEffect, useState } from "react"

export function ToyFilter() {
    const filterByToEdit = useSelector(state => state.toyModule.filterBy)
    const [labelsForFilter, setLabelsForFilter] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        toyService.getLabelsForFilter()
            .then(setLabelsForFilter)
    }, [])

    function handleChange({ target }) {
        let { name, value } = target

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
            case 'select-multiple':
                value = Array.from(target.selectedOptions, option => option.value || [])
            default: break
        }

        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit, [name]: name === 'desc' ? +filterByToEdit.desc * -1 : value } })
    }
    console.log(filterByToEdit)
    return <section className="toy-filter">
        <div className="inputs-main">
            <h3>Filters</h3>
            <label htmlFor="name">
                <input type="text" name="name" id="name" placeholder="Toy's name" onChange={handleChange} value={filterByToEdit.name || ''} />
            </label>

            <label htmlFor="instock">
                <select name="inStock" id="instock" onChange={handleChange} value={filterByToEdit.inStock}>
                    <option value="all">All</option>
                    <option value="true">In stock</option>
                    <option value="false">Not in stock</option>
                </select>
            </label>

            <label htmlFor="sortby">
                <select name="sortBy" id="sortby" onChange={handleChange} value={filterByToEdit.sortBy}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created at</option>
                </select>
            </label>



            {filterByToEdit.sortBy && <label htmlFor="desc">
                <input type="checkbox" name="desc" id="desc" onChange={handleChange} checked={+filterByToEdit.desc < 0} />
                {+filterByToEdit.desc > 0 ? '📈' : '📉'}
            </label>}


            <label className="inputs-labels" htmlFor="labels">
                <select multiple name="labels" id="labels" onChange={handleChange} value={filterByToEdit.labels || []}>
                    <option value="">None</option>
                    {labelsForFilter.map(label =>
                        <option key={label} value={label}>{label}</option>
                    )}
                </select>
            </label>
        </div>
    </section>
}