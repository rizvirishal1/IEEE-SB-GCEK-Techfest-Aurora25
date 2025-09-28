export default function EventCard({ event, onCardClick }) {
  return (
    <div
      className="w-[300px] bg-black/50 border border-blue-600 rounded-[50px] text-center shadow-2xl shadow-blue-500/50 overflow-hidden cursor-pointer hover:scale-[1.03] transition-transform duration-300"
      onClick={onCardClick}
    >
      {/* Equivalent to img { width: 100%; } */}
      <img className="w-full" src={event.imageUrl} alt="Event" />
      <div className="p-4">
        <h3 className="text-xl text-white font-semibold mb-1">{event.title}</h3>
        <p className="text-sm text-gray-400">Venue: {event.venue}</p>
      </div>
    </div>
  );
}
