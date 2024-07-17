import { useParams } from "react-router-dom"

export function ToyEdit() {
    const { id } = useParams()

    return <section className="toy-edit">
        Edit
    </section>
}