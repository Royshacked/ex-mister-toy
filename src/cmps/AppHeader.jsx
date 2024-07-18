import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return <section className="app-header">
        <Link to="/toy">Toys</Link>
    </section>
}