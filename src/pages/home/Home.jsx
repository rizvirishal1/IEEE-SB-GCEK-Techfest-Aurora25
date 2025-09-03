//imports…
import background from "../../assets/images/background.svg"
import highlightsImage from "../../assets/images/highlights.png"
//styles
import styles from "./home.module.scss"

export default function Home() {

    return (
        <div className={styles.home}>
            <img className={styles.background} src={background} alt="background" />
            <h1 className={styles.title}>State Level Techfest</h1>
            <span className={styles.date}>GCE KANNUR <br /> 24th - 26th September 2025</span>
            <div className={styles.highlights}>
                <h2 className={styles.subtitle}>Event Highlights</h2>
                <div className={styles.marqueeContainer}>
                    <div className={styles.marquee}>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 1: Exciting Workshops</p>
                        </div>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 2: Guest Speakers</p>
                        </div>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 3: Networking Opportunities</p>
                        </div>
                    </div>

                    <div className={styles.marquee}>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 1: Exciting Workshops</p>
                        </div>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 2: Guest Speakers</p>
                        </div>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 3: Networking Opportunities</p>
                        </div>
                    </div>

                    <div className={styles.marquee}>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 1: Exciting Workshops</p>
                        </div>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 2: Guest Speakers</p>
                        </div>
                        <div className={styles.highlightCard}>
                            <img src={highlightsImage} alt="Highlights" />
                            <p>Highlight 3: Networking Opportunities</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}