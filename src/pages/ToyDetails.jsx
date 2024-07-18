import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        loadToy(id)
    }, [])

    function loadToy(id) {
        return toyService.getById(id)
            .then(toy => setToy(toy))
            .catch((err) => {
                console.log(err)
                showErrorMsg('Could\'nt get toy')
            })

    }
    if (!toy) return <h2>Loading...</h2>
    return <section className="toy-details">
        <h2>{toy.name}</h2>
        <span>{toy.price}$</span>
        <span>{new Date(toy.createdAt).toUTCString()}</span>
        <span>{toy.labels.join(',')}</span>


        <Link to="/toy"><button>Back</button></Link>
    </section>
}