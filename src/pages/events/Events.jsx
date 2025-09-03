//imports…
import EventCard from "../../components/event-card/EventCard";
import events from "../../data/events";
import { useState } from "react";
import { useNavigate } from "react-router";
//components
//icons
//styles
import styles from "./events.module.scss"

export default function Events() {


    //variables...
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [filterQuery, setFilterQuery] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    //boolean

    const storeScrollPosition = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    }

    const filter = (eventType) => {
        setFilterQuery(eventType);

        if (eventType === "all") {
            if (!searchQuery) {
                //case 1: no filter and no search
                setFilteredEvents(events);
                return;
            }
            else {
                //case 2: only search
                const result = events.filter(event => event.title.toLowerCase().includes(searchQuery));
                setFilteredEvents(result);
                return;
            }
        }

        if (!searchQuery) {
            // case 3: only filter
            const result = events.filter(event => event.type === eventType);
            setFilteredEvents(result);
            return;
        }



        // case 4: both filter and search
        const result = events.filter(event => {

            return event.type === eventType && event.title.toLowerCase().includes(searchQuery);
        });
        setFilteredEvents(result);


    }

    return (
        <div className={styles.events}>
            <div className={styles.header}>
                <h1 className={styles.title}>Events</h1>
                <input
                    type="search" className={styles.searchInput}
                    placeholder="Search events..."
                    name="search"
                    onChange={(e) => {
                        const query = e.target.value.toLowerCase();
                        setSearchQuery(query);
                        if (!query) {
                            if (filterQuery === "all") {
                                // 1. no search no filter
                                setFilteredEvents(events);
                                return;
                            }
                            else {
                                // 2. filter only
                                setFilteredEvents(events.filter(event => event.type === filterQuery));
                                return;
                            }
                        }

                        if (filterQuery === "all") {
                            // 3. search only
                            const result = events.filter(event => {

                                return event.title.toLowerCase().includes(query)
                            })
                            setFilteredEvents(result);
                            return;
                        }


                        // 4. search and filter
                        const result = events.filter(event => {
                            return event.title.toLowerCase().includes(query) && event.type === filterQuery
                        });
                        setFilteredEvents(result);
                        return;


                    }}
                />

                <div className={styles.filter} >
                    <span
                        id="all"
                        className={filterQuery === "all" ? styles.activeFilter : ""}
                        onClick={() => filter("all")}
                    >
                        All
                    </span>
                    <span
                        className={filterQuery === "pre" ? styles.activeFilter : ""}
                        onClick={() => filter("pre")}
                    >
                        Pre-Events</span>
                    <span
                        className={filterQuery === "main" ? styles.activeFilter : ""}
                        onClick={() => filter("main")}
                    >Main Events</span>
                </div>


            </div>
            <div className={styles.eventList}>
                {filteredEvents.length === 0 ? (
                    <div className={styles.noResults}>No results found.</div>
                ) : (
                    filteredEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            event={event}
                            onCardClick={() => {
                                storeScrollPosition()
                                navigate(`/event-details/${event.id}`);
                            }}
                        />
                    ))
                )}
            </div>

        </div>
    );
}