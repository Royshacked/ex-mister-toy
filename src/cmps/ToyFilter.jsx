import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/toy.reducer"

export function ToyFilter() {
    const filterByToEdit = useSelector(state => state.toyModule.filterBy)

    const dispatch = useDispatch()

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

            default: break
        }
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit, [name]: name === 'desc' ? +filterByToEdit.desc * -1 : value } })
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

        <label htmlFor="sortby">Sort By:
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
    </section>
}