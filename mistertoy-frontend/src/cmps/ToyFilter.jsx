import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/toy.reducer"

export function ToyFilter() {
    const filterByToEdit = useSelector(state => state.toyModule.filterBy)

    const dispatch = useDispatch()

    function handleChange({ target }) {
        const { name, value } = target

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit, [name]: value } })
    }

    return <section className="toy-filter">
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

        {/* <label htmlFor="labels">
            <select multiple name="labels" id="labels">
                
            </select>
        </label> */}


    </section>
}