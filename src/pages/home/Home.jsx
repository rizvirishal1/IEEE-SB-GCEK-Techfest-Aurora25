//imports…
import background from "../../assets/images/background.svg"
//styles
import styles from "./home.module.scss"

export default function Home() {

    return (
        <div className={styles.home}>
            <img className={styles.background} src={background} alt="background" />
        </div>
    );
}