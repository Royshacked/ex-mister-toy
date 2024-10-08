import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { ToyPreview } from "./toyPreview.jsx";
import { useSelector } from "react-redux";

export function ToyList({ toys, onRemove }) {
    const user = useSelector(state => state.userModule.loggedInUser)

    if (!toys.length) return <h2>No Toys...</h2>
    return <section className="toy-list">
        <ul>
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    {user && user.isAdmin && <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
                        <Link to={`/toy/edit/${toy._id}`}><Button variant="outlined">Edit</Button></Link>
                        <Button variant="outlined" onClick={() => onRemove(toy._id)} sx={{ color: 'red', borderColor: 'red' }}>Delete</Button>
                    </Stack>}
                </li>
            )}
        </ul>
    </section>
}