//imports…
//styles
import styles from "./eventcard.module.scss"

export default function EventCard({ event, onCardClick }) {

    return (
        <div className={styles.eventCard} onClick={onCardClick}>
            <img className={styles.eventImage} src={event.imageUrl} alt="Event" />
            <div className={styles.eventCaption}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>Venue: {event.venue}</p>
            </div>

        </div>
    );
}