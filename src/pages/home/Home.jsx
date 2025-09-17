// imports...
import React, { useState, useEffect, useRef } from "react";
import background from "../../assets/images/homeBG.jpg";
import { useNavigate } from "react-router";
import eventhighlight from "../../data/event.highlight.js";

const EventHighlights = () => {
  return (
    <div
      className="w-full relative min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-black bg-opacity-80 backdrop-blur-sm z-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(77, 77, 77, 0.8), rgba(0,0,0,0.8))",
      }}
    >
      <div className="container mx-auto">
        <div className="w-full flex justify-center mb-10">
          <div className=" rounded-full px-8 py-3 backdrop-blur-md">
            <h2 className="text-3xl font-bold text-white rounded-full shadow-lg p-6 backdrop-blur-sm border-solid border-2 border-white/20">
              Event Highlights
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventhighlight.slice(0, 4).map((event) => (
            <div key={event.id} className="flex flex-col items-center">
              <div className="bg-black/40 border-2 border-white/20 p-4 rounded-lg shadow-xl">
                <div className="relative">
                  {/* <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    JUNE 20-22
                  </div> */}
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full aspect-square rounded-lg"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <div className="bg-white/10 rounded-[9px] px-9 py-3 backdrop-blur-md text-center">
                    <p className="text-white text-lg font-semibold">
                      {event.title}
                    </p>
                    <p className="text-white text-sm opacity-70">
                      {event.venue}
                    </p>
                    <p className="text-white text-sm opacity-70">
                      {event.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [showHighlights, setShowHighlights] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowHighlights(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setShowHighlights(true);
    // Smooth scroll to the highlights section
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen relative">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={background}
        alt="background"
      />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-white font-nico text-6xl sm:text-8xl md:text-9xl lg:text-[192px]">
          AURORA'25
        </h1>
        <p className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[64px] ">
          UNLEASH THE GLOW
        </p>
        <button
          className="mt-8 px-8 py-3 sm:px-8 sm:py-3 text-white font-semibold rounded-full shadow-lg hover:bg-white/40 transition duration-300 backdrop-blur-sm border-solid border-2 border-white/20"
          onClick={() => navigate("/register")}
        >
          Register Now
        </button>

        <div
          className="absolute bottom-10 z-10 cursor-pointer"
          onClick={handleClick}
        >
          <svg
            className="w-10 h-10 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>

      {showHighlights && (
        <div ref={scrollRef}>
          <EventHighlights />
        </div>
      )}
    </div>
  );
}
