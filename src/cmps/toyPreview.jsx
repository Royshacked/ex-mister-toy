import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return <section className="toy-preview">
        <Link to={`/toy/${toy._id}`}><h2>{toy.name}</h2></Link>
        <p>{toy.price}$</p>
    </section>
}