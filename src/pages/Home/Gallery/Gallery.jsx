import { X, Calendar, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import gallery1 from "../../../assets/Campus Culture/1.png";
import gallery2 from "../../../assets/Campus Culture/2.png";
import gallery3 from "../../../assets/Campus Culture/3.png";
import gallery4 from "../../../assets/Campus Culture/4.png";
import gallery5 from "../../../assets/Campus Culture/5.png";
import gallery6 from "../../../assets/Campus Culture/6.jpg";
import gallery7 from "../../../assets/Campus Culture/7.png";
import gallery8 from "../../../assets/Campus Culture/8.png";
import gallery9 from "../../../assets/Campus Culture/9.png";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Alumni Reunion & Cultural Program",
      description: "Grand cultural performance and gathering of former students celebrating college traditions and cherished memories.",
      date: "DEC 20, 2022",
      image: gallery1,
    },
    {
      id: 2,
      title: "Academic Conference & Faculty Meet",
      description: "Interactive conference discussing innovative teaching methodologies and academic strategies for HSC excellence.",
      date: "NOV 14, 2025",
      image: gallery2,
    },
    {
      id: 3,
      title: "Graduation & Farewell Ceremony",
      description: "Honoring our outgoing batch with awards, heartfelt tributes, and warm wishes for their future endeavors.",
      date: "OCT 05, 2025",
      image: gallery3,
    },
    {
      id: 4,
      title: "Morning Kick-off",
      description: "Energizing morning assembly marking the official start of college events with enthusiasm and school spirit.",
      date: "SEP 18, 2025",
      image: gallery4,
    },
    {
      id: 5,
      title: "Annual Educational Excursion",
      description: "Students exploring real-world applications and historical sites during our annual off-campus learning trip.",
      date: "AUG 22, 2025",
      image: gallery5,
    },
    {
      id: 6,
      title: "Teachers Panel",
      description: "Dedicated faculty panel addressing student development, academic guidelines, and institutional goals.",
      date: "JUL 10, 2025",
      image: gallery6,
    },
    {
      id: 7,
      title: "Chairman Sir Speaking at the Auditorium",
      description: "Inspiring address by Chairman Sir sharing the institution's core vision and encouraging student success.",
      date: "JUN 02, 2025",
      image: gallery7,
    },
    {
      id: 8,
      title: "Band Durnibar Rocks the Stage",
      description: "Thrilling live musical performance by Band Durnibar lighting up the campus concert stage.",
      date: "MAY 15, 2025",
      image: gallery8,
    },
    {
      id: 9,
      title: "Annual Sports",
      description: "High-energy inter-college athletic competitions celebrating teamwork, physical fitness, and sportsmanship.",
      date: "APR 28, 2026",
      image: gallery9,
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fa] py-20">
      <div className="w-5/6 mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="w-10 h-1 bg-amber-400 rounded-full mx-auto mb-3" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            Campus Life Gallery
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            A glimpse into our vibrant, diverse, and modern academic community.
          </p>
        </div>

        {/* 9-Image Grid (3x3 Layout with Fixed Aspect Ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 aspect-[4/3]"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                
                {/* View Icon Badge */}
                <div className="flex justify-end">
                  <span className="bg-white/20 backdrop-blur-md text-white p-2.5 rounded-full shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                {/* Title & Date */}
                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    {item.date}
                  </span>
                  <h3 className="text-white text-base md:text-lg font-bold leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View Entire Gallery Button */}
        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-block bg-black hover:bg-gray-900 text-white text-xs font-semibold px-8 py-3 rounded-md transition-all duration-200 shadow-sm"
          >
            View Entire Gallery
          </Link>
        </div>

      </div>

      {/* Information Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="w-full h-64 sm:h-80 relative bg-gray-100">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              
              {/* Date Badge */}
              <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedImage.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 leading-snug">
                {selectedImage.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {selectedImage.description}
              </p>

              {/* Modal Close Action */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-[#111726] hover:bg-black text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;