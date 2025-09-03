//imports…
import { useLocation } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
//icons
import closeIcon from "../../assets/icons/close.svg"
import menuIcon from "../../assets/icons/menu.svg"
//styles
import styles from "./navbar.module.scss"

export default function Navbar() {
    //variables...
    const location = useLocation();
    const navigate = useNavigate();
    //boolean
    const isAbout = location.pathname == "/about";
    const isHome = location.pathname == "/";
    const isEvents = location.pathname == "/events";
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={isMenuOpen ? styles.navbarOpen : styles.navbar}>
            <div className={isMenuOpen ? styles.itemsOpen : styles.items}>
                <div className={isMenuOpen ? styles.menuList : ""}>
                    <span
                        className={isHome ? styles.active : styles.menuText}
                        onClick={() => {
                            navigate("/")
                            setTimeout(() => {
                                if (window.innerWidth <= 768) {
                                    setIsMenuOpen(false)
                                    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
                                }

                            }, 300);
                        }}
                    >
                        Home
                    </span>
                    <span
                        className={isAbout ? styles.active : styles.menuText}
                        onClick={() => {
                            navigate("/about");
                            setTimeout(() => {
                                if (window.innerWidth <= 768) {
                                    setIsMenuOpen(false)
                                    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";

                                }

                            }, 300);

                        }}
                    >
                        About
                    </span>
                    <span
                        className={isEvents ? styles.active : styles.menuText}
                        onClick={() => {
                            navigate("/events");
                            setTimeout(() => {
                                if (window.innerWidth <= 768) {
                                    setIsMenuOpen(false)
                                    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
                                }
                            }, 300);
                        }}
                    >
                        Events
                    </span>
                </div>
                <img
                    className={styles.menuIcon} src={isMenuOpen ? closeIcon : menuIcon}
                    alt="Menu"
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen)
                        document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
                    }}
                />

            </div>
        </div>
    );
}