import EventCard from "../../components/event-card/EventCard";
import events from "../../data/events";
import { useState } from "react";
import { useNavigate } from "react-router";
import BGImage from "../../assets/images/BGfromPoster.png";

export default function Events() {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filterQuery, setFilterQuery] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const storeScrollPosition = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
  };

  const filter = (eventType) => {
    setFilterQuery(eventType);

    if (eventType === "all") {
      if (!searchQuery) {
        setFilteredEvents(events);
        return;
      } else {
        const result = events.filter((event) =>
          event.title.toLowerCase().includes(searchQuery)
        );
        setFilteredEvents(result);
        return;
      }
    }

    if (!searchQuery) {
      const result = events.filter((event) => event.type === eventType);
      setFilteredEvents(result);
      return;
    }

    const result = events.filter((event) => {
      return (
        event.type === eventType &&
        event.title.toLowerCase().includes(searchQuery)
      );
    });
    setFilteredEvents(result);
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BGImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {/* MODIFIED: Added 'justify-center' to vertically center the content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-10 px-5 min-h-screen">
        {/* THIS IS THE CONTAINER DIV that now holds both the UI and the events list */}
        <div className="bg-black/40  backdrop-blur-lg p-8 rounded-[20px] shadow-2xl w-full lg:h-[85vh] mt-[7vh]  flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-8 text-white text-center">
            Upcoming Events
          </h1>
          <input
            type="search"
            className="min-w-[250px] h-12 mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-white/70 text-gray-800 placeholder-gray-500 transition duration-150"
            placeholder="Search events..."
            name="search"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              setSearchQuery(query);
              if (!query) {
                if (filterQuery === "all") {
                  setFilteredEvents(events);
                  return;
                } else {
                  setFilteredEvents(
                    events.filter((event) => event.type === filterQuery)
                  );
                  return;
                }
              }

              if (filterQuery === "all") {
                const result = events.filter((event) => {
                  return event.title.toLowerCase().includes(query);
                });
                setFilteredEvents(result);
                return;
              }

              const result = events.filter((event) => {
                return (
                  event.title.toLowerCase().includes(query) &&
                  event.type === filterQuery
                );
              });
              setFilteredEvents(result);
              return;
            }}
          />

          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg  flex items-center justify-around h-14 bg-white/10 rounded-xl p-1 shadow-inner ">
            <span
              id="all"
              className={`p-2 w-1/3 text-center rounded-lg font-semibold cursor-pointer transition-all duration-300 ${
                filterQuery === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-200 hover:bg-white/20"
              }`}
              onClick={() => filter("all")}
            >
              All
            </span>
            <span
              className={`p-2 w-1/3 text-center rounded-lg font-semibold cursor-pointer transition-all duration-300 ${
                filterQuery === "pre"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-200 hover:bg-white/20"
              }`}
              onClick={() => filter("pre")}
            >
              Pre-Events
            </span>
            <span
              className={`p-2 w-1/3 text-center rounded-lg font-semibold cursor-pointer transition-all duration-300 ${
                filterQuery === "main"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-200 hover:bg-white/20"
              }`}
              onClick={() => filter("main")}
            >
              Main Events
            </span>
          </div>

          <div className="flex flex-wrap w-full gap-[30px] justify-center mt-[20px] p-4 max-h-[70vh]  overflow-y-auto scrollbar-hide">
            {filteredEvents.length === 0 ? (
              <div className="text-2xl font-medium text-white/70 mt-10">
                No results found.
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  onCardClick={() => {
                    storeScrollPosition();
                    navigate(`/event-details/${event.id}`);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
