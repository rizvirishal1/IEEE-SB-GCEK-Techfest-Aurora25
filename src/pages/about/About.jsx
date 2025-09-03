//imports…
//styles
import styles from "./about.module.scss"

export default function About() {

    return (
        <div className={styles.about}>
            <div className={styles.squareDecoration}></div>
            <h1 className={styles.title}>About Us</h1>
            <h2 className={styles.subtitle}>Aurora'25</h2>
            <p className={styles.description}>
                We are proud to announce AURORA '25, the inaugural annual technical festival of the IEEE Student Branch at Govt. College of Engineering, Kannur. As the first edition, AURORA '25 is not just an event; it's the launch of a new legacy in Kerala's tech landscape. Our mission is to establish a premier state-level platform that ignites innovation, fosters hands-on learning, and connects the region's brightest engineering minds with industry leaders. This is a ground-floor opportunity to be part of a tradition in the making.
            </p>
            <h2 className={styles.subtitle}>IEEE SB GCEK</h2>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perspiciatis amet neque repellat obcaecati numquam, ullam magnam libero fuga incidunt voluptatem, voluptates possimus reiciendis natus perferendis vel fugit aliquid? Ad.
            </p>
        </div>
    );
}