//imports…
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import events from "../../data/events";
//icons
import backIcon from "../../assets/icons/back.svg"
//styles
import styles from "./eventdetails.module.scss"

export default function EventDetails() {

    const location = useLocation();
    const navigate = useNavigate();
    const eventId = location.pathname.split("/").pop();
    const event = events.find(e => e.id === eventId);
    if (!event) {
        return (
            <div className={styles.eventDetails}>
                <div className={styles.modalContent}>
                    <div className={styles.header}>
                        <h2>Event Not Found</h2>
                    </div>
                    <div className={styles.content}>
                        <p>The event you are looking for does not exist.</p>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className={styles.eventDetails}>

            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <h2>{event.title || ""}</h2>
                    <img
                        src={backIcon}
                        alt="Back"
                        className={styles.backIcon}
                        onClick={() => {
                            navigate("/events");

                        }}
                    />
                </div>

                <div className={styles.content}>
                    <p>{event.description || ""}</p>
                </div>

            </div>

        </div>
    );
}