
import events from "../../data/events";
import useFetchUserData from "../../hooks/useFetchUserData";


export default function UserDashboard() {

    const { isLoading, userData, logout, getEarlyBirdTicket } = useFetchUserData();

    return (

        <div >
            {!isLoading && !userData && <p>Error loading user data. Please try again.</p>}
            {!isLoading && userData && (<div>

                <h1>User Dashboard</h1>
                <button
                    onClick={logout}
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
                    <div key={index}>
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