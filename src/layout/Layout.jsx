//imports…
import { useEffect } from "react";
import { useState } from "react";
//components
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
//icons
import upArrow from "../assets/icons/uparrow.svg"
//styles
import styles from "./layout.module.scss"

// Custom hook for scroll visibility
const useScrollVisibility = (threshold = 300) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > threshold);
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [threshold]);

    return isVisible;
};

export default function Layout(props) {
    //variables
    const isVisible = useScrollVisibility(300);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <Navbar />
                <div >{props.children}</div>
            </div>
            <Footer />

            {
                isVisible &&
                <img src={upArrow}
                    className={styles.upArrowButton}
                    alt="Up Arrow"
                    onClick={scrollToTop}
                />
            }

        </div>
    );
}