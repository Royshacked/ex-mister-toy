import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/toy.reducer"
import { toyService } from "../services/toy.service"
import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select } from "@mui/material";

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
                value = Array.from(target.selectedOptions, option => option.value)
            default: break
        }

        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit, [name]: name === 'desc' ? +filterByToEdit.desc * -1 : value } })
    }

    return <section className="toy-filter">
        <div className="inputs-main">
            <h3>Filters</h3>
            <label htmlFor="name">
                <TextField label="Toy's name" variant="outlined" type="text" name="name" id="name" placeholder="Toy's name" onChange={handleChange} value={filterByToEdit.name || ''} />
            </label>


            {/* <label htmlFor="instock">
                <select name="inStock" id="instock" onChange={handleChange} value={filterByToEdit.inStock}>
                    <option value="all">All</option>
                    <option value="true">In stock</option>
                    <option value="false">Not in stock</option>
                </select>
            </label> */}
            {/* <InputLabel id="instock"></InputLabel> */}
            <Select
                labelId="instock"
                id="instock"
                name="inStock"
                value={filterByToEdit.inStock}
                label="In Stock?"
                onChange={handleChange}
            >
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='true'>In Stock</MenuItem>
                <MenuItem value='false'>Not in Stock</MenuItem>
            </Select>

            <Select labelId='sortby' name="sortBy" id="sortby" onChange={handleChange} value={filterByToEdit.sortBy}>
                <MenuItem value="">Sort By</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="createdAt">Created at</MenuItem>
            </Select>

            {filterByToEdit.sortBy && <label htmlFor="desc">
                <input type="checkbox" name="desc" id="desc" onChange={handleChange} checked={+filterByToEdit.desc < 0} />
                {+filterByToEdit.desc > 0 ? '📈' : '📉'}
            </label>}

            <Select multiple labelId="labels" label="labels" name="labels" id="labels" onChange={handleChange} value={filterByToEdit.labels || []}>
                <MenuItem value="">None</MenuItem>
                {labelsForFilter.map(label =>
                    <MenuItem key={label} value={label}>{label}</MenuItem>
                )}
            </Select>
        </div>
    </section>
}

