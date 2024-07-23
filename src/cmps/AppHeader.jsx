import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return <section className="app-header">
        <NavLink to="/toy">Toys</NavLink>
        <NavLink to="/about">About</NavLink>
    </section>
}