import React from "react";
import { Newspaper, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
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
    <section className="w-full bg-[#030712] py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">
        
        {/* Left Column: Latest News */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Newspaper className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Latest News
            </h2>
          </div>

          <div className="space-y-4">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="group bg-[#0a1120]/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-800/80 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 cursor-pointer"
              >
                <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block mb-1.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                  {news.date}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                  {news.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                  {news.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Events */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 mb-6">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Upcoming Events
              </h2>
            </div>

            <div className="space-y-4">
              {eventItems.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl bg-[#0a1120]/40 hover:bg-[#0a1120]/80 border border-transparent hover:border-slate-800 transition-all duration-300"
                >
                  {/* Event Date Badge */}
                  <div className="bg-[#0f172a] border border-slate-800 group-hover:border-amber-500/40 text-white rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center shrink-0 shadow-lg relative overflow-hidden transition-colors">
                    <div className="absolute top-0 inset-x-0 h-1 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                    <span className="text-lg sm:text-xl font-black leading-none text-white">
                      {event.day}
                    </span>
                    <span className="text-[10px] font-extrabold tracking-widest uppercase text-amber-400 mt-1">
                      {event.month}
                    </span>
                  </div>

                  {/* Event Info */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {event.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/calendar"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0a1120] hover:bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 text-slate-200 hover:text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 shadow-lg"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsNEvents;