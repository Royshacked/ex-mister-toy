import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return <section className="app-header">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">DashBoard</NavLink>
        <NavLink to="/toy">Toys</NavLink>
    </section>
}