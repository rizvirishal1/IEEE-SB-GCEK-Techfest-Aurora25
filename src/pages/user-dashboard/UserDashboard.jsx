import api from "../../api";
import events from "../../data/events";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import BGfromPoster from "../../assets/images/BGfromPoster.png";
import styles from "./userdashboard.module.scss";

export default function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(null);
  const [entryPass, setEntryPass] = useState(null);
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
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);

        const entryPassResponse = await api.get("/user/entry-pass", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEntryPass(entryPassResponse.data.entryPass || null);

      } catch (error) {
        toast.error(
          error.response?.data?.error ||
          "Failed to fetch user data. Please try again."
        );
        localStorage.removeItem("authToken");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, location.pathname]);

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BGfromPoster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className={` ${styles.userDashboardContainer} bg-black/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-4xl text-white`}>
          {isLoading && <p className="text-xl text-center py-10">Loading...</p>}
          {!isLoading && !userData && (
            <p className="text-xl text-center py-10 text-red-400">
              Error loading user data. Please try again.
            </p>
          )}

          {!isLoading && userData && (
            <div className="userDashboard">
              <div className="flex justify-between items-center mb-6 border-b border-white/50 pb-4">
                <h1 className="text-3xl font-extrabold">
                  Welcome, {userData.name}!
                </h1>
                {/* .logoutBtn -> bg-red-600, hover:bg-red-700, p-2 px-4, rounded-lg */}
                <button
                  className="logoutBtn bg-red-600 text-white font-semibold rounded-lg py-2 px-4 text-base cursor-pointer transition duration-200 hover:bg-red-700 shadow-md"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-4">User Details</h3>
              <div className="space-y-1 mb-6 text-white/90">
                <p>
                  Mobile: <span className="font-medium">{userData.mobile}</span>
                </p>
                {userData.IEEEMemberId && (
                  <p>
                    IEEE Member ID:{" "}
                    <span className="font-medium">{userData.IEEEMemberId}</span>
                  </p>
                )}
                <p>
                  IEEE Member Status:{" "}
                  <span className="font-medium">
                    {userData.IEEEMemberId === ""
                      ? "Non-Member"
                      : userData.IEEEMemberStatus}
                  </span>
                </p>
                {userData.reasonForMembershipRejection && (
                  <div> <p>
                    Reason for Rejection:{" "}
                    <span className="font-medium">{userData.reasonForMembershipRejection}</span>
                  </p>
                    <p>For clarification contact us:</p>
                    <span className="font-medium">Ajay E.K. : 85929 36392</span>
                  </div>
                )}
              </div>

              <hr className="border-white/50 my-6" />
              <h3 className="text-xl font-semibold mb-4">Tickets</h3>

              {/* Fest Ticket section visible for users who didnt buy the fest ticket */}
              {!userData.entryPassId && (
                <div className="p-4 bg-green-700/30 border border-green-500 rounded-lg flex flex-col items-start mb-6">
                  <p className="text-lg font-bold mb-3">
                    Entry Pass
                  </p>
                  {/* .buyEarlyBirdTicketBtn -> bg-green-600, hover:bg-green-700, min-w-48, p-3, rounded-lg */}
                  <button
                    className="buyEarlyBirdTicketBtn bg-green-600 text-white font-semibold rounded-lg py-3 px-6 text-lg cursor-pointer transition duration-300 hover:bg-green-700 shadow-lg"
                    onClick={() => {
                      navigate("/order-summary", {
                        state: {
                          ticket: {
                            type: "Entry Pass",
                          },
                        },
                      });
                    }}
                  >
                    BUY TICKET
                  </button>
                </div>
              )}

              <div className="border border-white/40 p-4 rounded-lg mb-6">
                <p className="text-lg font-medium mb-2">Entry Pass Purchase Status:</p>
                <p className="ml-4">
                  Status:{" "}
                  <span className="font-medium text-yellow-300">
                    {entryPass ? entryPass.purchaseStatus : "Not Purchased"}
                  </span>
                </p>
                {entryPass && entryPass.reasonForRejection && (
                  <div>
                    <p className="ml-4 text-red-400">
                      Reason for Rejection:{" "}
                      <span className="font-medium">
                        {entryPass.reasonForRejection}
                      </span>
                    </p>
                    <p className="ml-4 text-red-400">
                      For clarification contact us:{" "}
                      <span className="font-medium">
                        Ajay E.K. : 85929 36392
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <hr className="border-white/50 my-6" />
              <h3 className="text-xl font-semibold mb-4">Registered Events:</h3>
              {userData.eventTickets && userData.eventTickets.length > 0 ? (
                <ul className="space-y-4">
                  {userData.eventTickets.map((ticket) => {
                    const event = events.find((e) => e.id === ticket.eventId);
                    return (
                      <li key={ticket.eventId} className="p-4 bg-blue-700/30 border border-blue-500 rounded-lg">
                        <p className="text-lg font-medium">
                          Event: <span className="font-semibold">{event.title}</span>
                        </p>
                        <p className="ml-4">
                          Price for IEEE Members: <span className="font-medium">{event.priceForIeeeMembers}</span>
                        </p>
                        <p className="ml-4">
                          Price for Non-Members: <span className="font-medium">{event.price}</span>
                        </p>
                        <p className="ml-4">
                          Purchase Status: <span className="font-medium text-yellow-300">{ticket.purchaseStatus}</span>
                        </p>
                        {ticket.reasonForRejection && (
                          <p className="ml-4 text-red-400">
                            Reason for Rejection: <span className="font-medium">{ticket.reasonForRejection}</span>
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-400">No registered events found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
