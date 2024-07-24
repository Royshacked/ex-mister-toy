import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveToy } from "../store/actions/toy.actions"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy)
    const labels = toyService.getLabels()
    const navigate = useNavigate()
    const { id: toyId } = useParams()

    useEffect(() => {

        if (!toyId) return
        loadToyToEdit(toyId)
    }, [])

    function loadToyToEdit(id) {
        return toyService.getById(id)
            .then(setToyToEdit)
            .catch((err) => {
                console.log(err)
                showErrorMsg('Could\'nt get toy for edit')
            })
    }

    function handleChange({ target }) {
        let { name, value } = target
        name === 'number' ? +value : value

        setToyToEdit(prevToy => ({ ...prevToy, [name]: value }))
    }

    function handleLabelChange({ target }) {
        const { name, value: label } = target

        setToyToEdit(prevToy => ({ ...prevToy, [name]: !prevToy[name].includes(label) ? addLabel(label) : removeLabel(label) }))
    }

    function addLabel(newLabel) {
        const newLabels = toyToEdit.labels
        newLabels.push(newLabel)
        return newLabels
    }

    function removeLabel(newLabel) {
        let newLabels = toyToEdit.labels
        newLabels = newLabels.filter(label => label !== newLabel)
        return newLabels
    }

    function onHandleSubmit(ev) {
        ev.preventDefault()

        saveToy(toyToEdit)
            .then(() => {
                navigate('/toy')
                showSuccessMsg(toyId ? 'Changes saved' : 'Toy added successfully')
            })
            .catch((err) => {
                console.log(err)
                showErrorMsg('Could\'nt save toy')
            })
    }

    return <section className="toy-edit">
        <h2>{toyId ? 'Edit Toy' : 'Add a Toy'}</h2>
        <form action="" onSubmit={onHandleSubmit}>
            <h3>Toy's Name</h3>
            <label htmlFor="name">
                <input type="text" id="name" name="name" placeholder="Enter name" value={toyToEdit.name || ''} onChange={handleChange} required />
            </label>

            <h3>Toy's Price</h3>
            <label htmlFor="price">
                <input type="number" id="price" name="price" placeholder="Enter price" value={toyToEdit.price || ''} onChange={handleChange} required />
            </label>

            <h3>Categories</h3>
            <div className="toy-edit-labels">
                {labels.map(label =>
                    <label key={label} htmlFor="labels">{label}
                        <input type="checkbox" id="labels" name="labels" value={label} checked={toyToEdit.labels.includes(label)} onChange={handleLabelChange}></input>
                    </label>
                )}
            </div>
            <button>Save</button>
        </form>
        <Link to='/toy'><button>Back</button></Link>
    </section>
}