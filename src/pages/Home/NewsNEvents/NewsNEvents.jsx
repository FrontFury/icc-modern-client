import React from "react";
import { Newspaper, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const NewsNEvents = () => {
  const newsItems = [
    {
      id: 1,
      date: "OCT 30, 2024",
      title: "New Research Center Opening",
      description: "State-of-the-art facilities dedicated to sustainable energy and AI research.",
    },
    {
      id: 2,
      date: "OCT 25, 2024",
      title: "Annual Science Fair Winners Announced",
      description: "Celebrating the innovative projects and scientific breakthroughs of our students.",
    },
    {
      id: 3,
      date: "OCT 20, 2024",
      title: "ABC College Ranks Top 10 for Innovation",
      description: "Recognized globally for our commitment to pioneering educational methodologies.",
    },
  ];

  const eventItems = [
    {
      id: 1,
      day: "10",
      month: "OCT",
      title: "ICC ALUMNI RE-UNION 2026",
      location: "Main Auditorium",
      time: "All Day",
    },
    {
      id: 2,
      day: "16",
      month: "DEC",
      title: "Victory Day 2026",
      location: "Campus Grounds",
      time: "10:00 AM - 4:00 PM",
    },
    {
      id: 3,
      day: "20",
      month: "NOV",
      title: "Alumni Networking Night",
      location: "Grand Hall",
      time: "06:30 PM",
    },
    {
      id: 4,
      day: "05",
      month: "DEC",
      title: "Open Campus Day",
      location: "Campus Grounds",
      time: "All Day",
    },
    {
      id: 5,
      day: "15",
      month: "NOV",
      title: "Fall Convocation 2024",
      location: "Main Auditorium",
      time: "10:00 AM",
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fa] py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Left Column: Latest News */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-[#1d4ed8]" />
            <h2 className="text-base font-bold text-[#1f2937]">Latest News</h2>
          </div>

          <div className="space-y-4">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <span className="text-xs font-semibold tracking-wider text-[#2563eb] block mb-1">
                  {news.date}
                </span>
                <h3 className="text-sm font-bold text-[#111827] mb-1.5">
                  {news.title}
                </h3>
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  {news.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Events */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-[#f97316]" />
              <h2 className="text-base font-bold text-[#1f2937]">Upcoming Events</h2>
            </div>

            <div className="space-y-4">
              {eventItems.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 sm:gap-4 group cursor-pointer"
                >
                  <div className="bg-[#111827] text-white rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center shrink-0">
                    <span className="text-base sm:text-lg font-bold leading-none">{event.day}</span>
                    <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-gray-300 mt-0.5">
                      {event.month}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#111827] group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#6b7280] mt-0.5">
                      {event.location} • {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/calendar"
              className="w-full inline-block text-center bg-transparent border border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white text-xs font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              View Full Calendar
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsNEvents;