import { Link, NavLink } from "react-router-dom";
import { LoginSignup } from "./LoginSignup.jsx";

export function AppHeader() {
    return <section className="app-header">
        <div>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/dashboard">DashBoard</NavLink>
            <NavLink to="/toy">Toys</NavLink>
        </div>
        <LoginSignup />
    </section>
}