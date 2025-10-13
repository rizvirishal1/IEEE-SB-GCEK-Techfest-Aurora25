import { useParams } from 'react-router-dom';
import BGImg from "../../assets/images/BGfromPoster.png";
import events from '../../data/events';
import { useNavigate } from 'react-router';
import { use, useEffect } from 'react';
import api from '../../api';
import styles from "./eventdetails.module.scss";
import { toast } from 'react-toastify';
import { useState } from 'react';

const EventDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const event = events.find(event => event.id === id);
  const [userData, setUserData] = useState(null);
  const [isTicketBought, setIsTicketBought] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await api.get("/user/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUserData(response.data);
        setIsTicketBought(response.data.eventTickets?.some(ticket => ticket.eventId === event.id));
      }
      catch (error) {
        toast.error("Failed to fetch user data. Please try again.");
        console.error(error);
        localStorage.removeItem("authToken");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
    fetchData();
  }, [navigate]);



  const handleTicketRegistration = (event) => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      return;
    }
    navigate("/order-summary", { state: { ticket: event } });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 flex items-center justify-center"
      style={{ backgroundImage: `url(${BGImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className={` ${styles.eventContainer} bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-lg shadow-2xl shadow-blue-500/20 p-6 sm:p-12 flex flex-col lg:flex-row max-w-7xl mx-auto  transition-all duration-300`}>

        {/* Left/Top Section */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{event?.title}</h1>

          {/* Yellow image and Register button on smaller screens */}
          <div className="lg:hidden flex flex-col items-center w-full">
            <img
              src={event?.imageUrl}
              alt={event?.title}
              className="w-4/5 max-w-sm mb-6 rounded-lg"
            />
            <button
              disabled={event?.type === "workshop" || userData?.eventTickets?.some(ticket => ticket.eventId === event.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 mb-6"
              onClick={() => handleTicketRegistration(event)}
            >
              {event?.type === "competition" ? (isTicketBought ? "BOUGHT" : "REGISTER") : "TICKETS - SOLD OUT"}
            </button>
          </div>

          {/* Details and Description for smaller screens */}
          <div className="lg:hidden text-gray-300 text-sm">
            <p className="mb-2">
              <span className="font-semibold">Date:</span> {event?.date}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Time:</span> {event?.time}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Location:</span> {event?.venue}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Fee:</span> {event?.price}
            </p>
            <p className="mb-2">
              <span className="font-semibold">IEEE Members Fee:</span> {event?.priceForIeeeMembers}
            </p>
            <p className={`${styles.textForMobile} mt-4 text-base`}>
              {event?.description}
            </p>
            <br />
            <p>For more details, contact the organizer:</p>
            <p>Harikesh: 6238622195</p>
          </div>

          {/* Description for larger screens */}
          <div className="hidden lg:block">
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              {event?.description}</p>
            <br />
            <p>For more details, contact the organizer:</p>
            <p>Harikesh: 6238622195</p>
          </div>



          {/* Register button for larger screens */}
          <button
            disabled={event?.type === "workshop"}
            className="hidden lg:block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 mt-8"
            onClick={() => handleTicketRegistration(event)}
          >
            {event?.type === "workshop" ? "TICKETS - SOLD OUT" : "REGISTER"}
          </button>

        </div>

        {/* Right Section (visible on larger screens) */}
        <div className="hidden lg:w-1/2 lg:flex flex-col items-center justify-center ml-8">
          <div className=" rounded-lg p-2.5 shadow-xl flex-shrink-0 mb-8 w-full max-w-sm">
            <img
              src={event?.imageUrl}
              alt={event?.title}
              className="w-full h-auto mb-4 rounded-lg"
            />
          </div>

          <div className="text-gray-200 w-full max-w-sm">
            <p className="mb-2">
              <span className="font-semibold">Date:</span> {event?.date}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Time:</span> {event?.time}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Location:</span> {event?.venue}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Fee:</span> {event?.price}
            </p>
            <p className="mb-2">
              <span className="font-semibold">IEEE Members Fee:</span> {event?.priceForIeeeMembers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;