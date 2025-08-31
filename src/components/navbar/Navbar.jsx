//imports…
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
//styles
import styles from "./navbar.module.scss"

export default function Navbar() {
    //variables...
    const location = useLocation();
    const navigate = useNavigate();
    //boolean
    const isHome = location.pathname == "/";
    const isAbout = location.pathname == "/about";
    const isEvents = location.pathname == "/events";

    return (
        <div className={styles.navbar}>
            <div className={styles.items}>
                <span
                    className={isHome ? styles.active : ""}
                    onClick={() => navigate("/")}
                >
                    Home
                </span>
                <span
                    className={isAbout ? styles.active : ""}
                    onClick={() => navigate("/about")}
                >
                    About
                </span>
                <span
                    className={isEvents ? styles.active : ""}
                    onClick={() => navigate("/events")}
                >
                    Events
                </span>
            </div>
        </div>
    );
}