import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveToy } from "../store/actions/toy.actions"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy)
    const labels = toyService.getLabels()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {

        if (!id) return
        loadToyToEdit(id)
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
        value = target.type === 'number' ? +value : value

        setToyToEdit(prevToy => ({ ...prevToy, [name]: value }))
    }

    function onHandleSubmit(ev) {
        ev.preventDefault()

        saveToy(toyToEdit)
            .then(() => {
                navigate('/toy')
                showSuccessMsg(id ? 'Changes saved' : 'Toy added successfully')
            })
            .catch((err) => {
                console.log(err)
                showErrorMsg('Could\'nt save toy')
            })
    }

    return <section className="toy-edit">
        <h2>{id ? 'Edit Toy' : 'Add a Toy'}</h2>
        <form action="" onSubmit={onHandleSubmit}>
            <label htmlFor="name">
                <input type="text" id="name" name="name" placeholder="Enter name" value={toyToEdit.name || ''} onChange={handleChange} />
            </label>

            <label htmlFor="price">
                <input type="number" id="price" name="price" placeholder="Enter price" value={toyToEdit.price || ''} onChange={handleChange} />
            </label>


            {labels.map(label =>
                <label key={label} htmlFor="label">{label}<input type="checkbox" id="label" name="label" value={label}></input></label>
            )}


            <button>Save</button>
        </form>
        <Link to='/toy'><button>Back</button></Link>
    </section>
}