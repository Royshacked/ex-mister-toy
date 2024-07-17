import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ToyList } from "../cmps/ToyList.jsx"

export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)

    useEffect(() => {
        loadToys()
            .then(() => showSuccessMsg('Toys loaded'))
            .catch((err) => {
                console.log(err)
                showErrorMsg('Couldn\'nt load toys')
            })
    }, [])

    function onRemove(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg(`Toy ${toyId} has been removed successfully`))
            .catch((err) => {
                console.log(err)
                showErrorMsg('Couldn\'nt remove toy')
            })
    }
    return <section className="toy-index">
        <ToyList toys={toys} onRemove={onRemove} />
    </section>
}