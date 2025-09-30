//imports…
import api from "../../api";
import events from "../../data/events"
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
//styles    
import styles from "./userdashboard.module.scss"

export default function UserDashboard() {

    const navigate = useNavigate();
    const location = useLocation();


    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        console.log(location.pathname);
        

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await api.get("/user/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {

                toast.error(error.response?.data?.error || "Failed to fetch user data. Please try again.");
                localStorage.removeItem("authToken");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } finally {
                setIsLoading(false);
            }

        };

        fetchData();
    }, []);

    return (
        <div className={styles.userDashboard}>
            {isLoading && <p>Loading...</p>}
            {!isLoading && !userData && <p>Error loading user data. Please try again.</p>}
            {!isLoading && userData && (<div>

                <h1>User Dashboard</h1>
                <button
                    className={styles.logoutBtn}
                    onClick={() => {
                        localStorage.removeItem("authToken");
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
                <h2>{userData.name}</h2>
                <hr />
                <h3>user details</h3>
                <p>Mobile: {userData.mobile}</p>
                {userData.IEEEMemberId && <p>IEEE Member ID: {userData.IEEEMemberId}</p>}
                <p>IEEE Member: {userData.IEEEMemberId === "" ? "Non-Member" : userData.IEEEMemberStatus}</p>
                <hr />
                {!userData.festTicket.isPurchased && (

                    < button
                        className={styles.buyEarlyBirdTicketBtn}
                        onClick={() => {
                            navigate("/order-summary", {
                                state: {
                                    ticket: {
                                        type: "festTicket",
                                        offerType: "early-bird"
                                    }
                                }
                            });
                        }}
                    >
                        GET EARLY BIRD TICKET
                    </button>
                )
                }

                <p>Tickets Bought:</p>
                <hr />
                <p>Fest Ticket:</p>
                <p>Type: {userData.festTicket.offerType}</p>
                <p>Status: {userData.festTicket.purchaseStatus}</p>
                <br />
                <p>Event Tickets:</p>
                {userData.eventTickets.length === 0 && <p>No event tickets purchased.</p>}
                {userData.eventTickets.length > 0 && userData.eventTickets.map((ticket, index) => (
                    <div key={index} className={styles.eventTicket}>
                        <p>Event Name: {events[ticket.eventId].title}</p>
                        <p>Status: {ticket.purchaseStatus}</p>
                        <hr />
                    </div>
                ))}


            </div>)
            }


        </div >
    );
}