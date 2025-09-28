//imports…
import api from "../../api";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
//styles    
import styles from "./userdashboard.module.scss"

export default function UserDashboard() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
                <button
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

            </div>)}


        </div>
    );
}