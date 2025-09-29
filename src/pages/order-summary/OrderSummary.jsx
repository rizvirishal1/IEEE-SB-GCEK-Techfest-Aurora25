//imports…
import api from "../../api";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
//styles
import styles from "./ordersummary.module.scss"

export default function OrderSummary() {
    const location = useLocation();
    const navigate = useNavigate();
    const ticketDetails = location.state.ticket || {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ticket = new FormData();
        ticket.append("paymentScreenshot", e.target.paymentScreenshot.files[0]);
        ticket.append("type", ticketDetails.type);
        ticket.append("offerType", ticketDetails.offerType);

        try {
            await api.post("/user/buy-ticket", ticket, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            toast.success("Payment successful! Your ticket has been booked.");
        } catch (error) {
            if (error.response?.data?.error === "Session expired. Please login") {
                toast.error("Session expired. Please login again.");
                localStorage.removeItem("authToken");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                toast.error(error.response?.data?.error || "Submission failed. Please try again.");
            }

        }

    }

    return (
        <div className={styles.orderSummary}>
            <h1>Order Summary Page</h1>
            {ticketDetails && (
                <div className={styles.summaryBox}>
                    <h2>Order Details</h2>
                    <p>Ticket Type: {ticketDetails.type}</p>
                    <p>Price: {ticketDetails.offerType === "early-bird" ? "$50" : "$100"}</p>
                    <form className={styles.paymentForm} onSubmit={handleSubmit}>
                        <label htmlFor="paymentScreenshot">Upload Payment Screenshot:</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="paymentScreenshot"
                            name="paymentScreenshot"
                            required
                        />
                        <button type="submit">Submit Payment</button>
                    </form>
                </div>
            )}
            {!ticketDetails && <p>No order details available.</p>}
        </div>
    );
}