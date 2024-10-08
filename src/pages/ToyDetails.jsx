import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { Button } from "@mui/material"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        loadToy(id)
    }, [])

    async function loadToy(id) {
        try {
            const toy = await toyService.getById(id)
            return setToy(toy)
        } catch (error) {
            console.log(err)
            showErrorMsg('Could\'nt get toy')
        }
    }

    if (!toy) return <h2>Loading...</h2>
    return <section className="toy-details">
        <div>
            <h2>{toy.name}</h2>
            <span>Price:</span>
            <span>{toy.price}$</span>
            <span>Created At:</span>
            <span>{new Date(toy.createdAt).toUTCString()}</span>
            <span>Category:</span>
            <span>{toy.labels.join(',')}</span>
        </div>

        <Link to="/toy"><Button variant="outlined" sx={{ color: 'red', borderColor: 'red' }}>Back</Button></Link>
    </section>
}