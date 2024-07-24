import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { saveToy } from "../store/actions/toy.actions"

const EditSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long')
        .required('Required'),
    price: Yup.number()
        .min(10, 'Too Low!')
        .max(1000, 'Too High!')
        .required('Required'),
})

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

    function onHandleSubmit(ev, values) {
        ev.preventDefault()
        console.log(values)
        saveToy({ ...toyToEdit, name: values.name, price: values.price })
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
        <Formik
            initialValues={{
                name: '',
                price: '',
            }}
            validationSchema={EditSchema}
        // onSubmit={values => {
        //     console.log(values)
        // }}
        >
            {({ errors, touched, values }) => (
                <Form onSubmit={(ev) => onHandleSubmit(ev, values)}>
                    <h3>Toy's Name</h3>
                    <label htmlFor="name">
                        <Field name="name" id="name" placeholder="Enter name" required />
                        {errors.name && touched.name && <div>{errors.name}</div>}
                    </label>

                    <h3>Toy's Price</h3>
                    <label htmlFor="price">
                        <Field id="price" name="price" placeholder="Enter price" required />
                        {errors.price && touched.price && <div>{errors.price}</div>}
                    </label>

                    <h3>Categories</h3>
                    <div className="toy-edit-labels">
                        {labels.map(label =>
                            <label key={label} htmlFor={label}>{label}
                                <Field type="checkbox" id={label} name="labels" value={label} checked={toyToEdit.labels.includes(label)} onChange={handleLabelChange}></Field>
                            </label>
                        )}
                    </div>
                    <button type="submit">Save</button>
                </Form>)}
        </Formik>
        <Link to='/toy'><button>Back</button></Link>
    </section>
}


