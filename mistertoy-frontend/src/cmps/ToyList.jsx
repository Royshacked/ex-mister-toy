import { Link } from "react-router-dom";
import { ToyPreview } from "./toyPreview.jsx";

export function ToyList({ toys, onRemove }) {
    return <section className="toy-list">
        <ul>
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
                    <button onClick={() => onRemove(toy._id)}>Delete</button>
                </li>
            )}
        </ul>
    </section>
}