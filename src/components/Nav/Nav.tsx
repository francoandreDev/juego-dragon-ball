import "../../styles/nav.css";

import { NavLink } from "react-router";

export function Nav() {
    return (
        <header className="header app">
            <nav className="nav-container">
                <ul className="nav-list">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/characters"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Characters
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/planets"
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Planets
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
