import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { saveToy } from "../store/actions/toy.actions"
import { Button, Checkbox, Stack, TextField } from "@mui/material";

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
    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        loadToyToEdit(id)
    }, [])

    async function loadToyToEdit(id) {
        try {
            const toy = await toyService.getById(id)
            return setToyToEdit(toy)
        }
        catch (err) {
            console.log(err)
            showErrorMsg('Could\'nt get toy for edit')
        }
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

    async function onHandleSubmit(ev, values) {
        ev.preventDefault()
        try {
            await saveToy({ ...toyToEdit, name: values.name, price: values.price })
            navigate('/toy')
            showSuccessMsg(id ? 'Changes saved' : 'Toy added successfully')
        } catch (error) {
            console.log(error)
            showErrorMsg('Could\'nt save toy')
        }
    }

    return <section className="toy-edit">
        <h2>{id ? 'Edit Toy' : 'Add a Toy'}</h2>
        <Formik
            enableReinitialize
            initialValues={{
                name: toyToEdit.name || '',
                price: toyToEdit.price || '',
            }}
            validationSchema={EditSchema}
        >
            {({ errors, touched, values }) => (

                <Form onSubmit={(ev) => onHandleSubmit(ev, values)} >
                    <h3>Toy's Name</h3>
                    <label htmlFor="name">
                        <Field as={CustomInput} type="text" id="name" name="name" placeholder="Enter name" required />
                        {errors.name && touched.name && <div>{errors.name}</div>}
                    </label>

                    <h3>Toy's Price</h3>
                    <label htmlFor="price">
                        <Field as={CustomInput} type="number" id="price" name="price" placeholder="Enter price" required />
                        {errors.price && touched.price && <div>{errors.price}</div>}
                    </label>

                    <h3>Categories</h3>
                    <div className="toy-edit-labels">
                        {labels.map(label =>
                            <label key={label} htmlFor={label}>{label}
                                <Field as={CustomCheckBox} type="checkbox" id={label} name="labels" value={label} checked={toyToEdit.labels.includes(label)} onChange={handleLabelChange}></Field>
                            </label>
                        )}
                    </div>
                    <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
                        <Button variant='outlined' type="submit" sx={{ color: 'green', borderColor: 'green' }}>Save</Button>
                        <Link to='/toy'><Button type="button" variant="outlined" sx={{ color: 'red', borderColor: 'red' }}>Back</Button></Link>
                    </Stack>
                </Form>)}
        </Formik>

    </section>
}


function CustomInput(props) {
    return <TextField {...props} />
}

function CustomCheckBox(props) {
    return <Checkbox {...props} />
}

