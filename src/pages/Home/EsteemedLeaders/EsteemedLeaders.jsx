import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronRight, X, Quote } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";

const EsteemedLeaders = () => {
  const [selectedSpeech, setSelectedSpeech] = useState(null);

  const speechesData = [
    {
      id: 1,
      role: "Chairman Sir Speech",
      name: "Dr. M. A. Halim Patwary",
      title: "CHAIRMAN OF IDEAL COMMERCE COLLEGE",
      quote: "In today’s competitive global economy, success demands skilled, forward-thinking individuals grounded in values.",
      shortMessage: "At Ideal Commerce College, we are committed to nurturing capable minds equipped with moral integrity and academic excellence.",
      fullMessage: `In today’s competitive global economy, success demands skilled, forward-thinking individuals grounded in values, patriotism, and knowledge. At Ideal Commerce College, we are committed to nurturing such capable minds—equipped with both moral integrity and academic excellence.

Recognizing the growing need for science-based education alongside business studies, we have introduced a science stream to offer students a broader, multidimensional learning experience. This expansion will empower students to contribute meaningfully to the vision of a Digital Bangladesh.`,
      image: "https://i.ibb.co.com/nVD8wft/Chairman.png",
    },
    {
      id: 2,
      role: "Director Ma'am Speech",
      name: "Hasina Momotaz",
      title: "DIRECTOR OF IDEAL COMMERCE COLLEGE",
      quote: "Our Guide Teacher System ensures each group of 7–8 students is closely mentored for academic and personal growth.",
      shortMessage: "Known for strong discipline and dedicated teachers who ensure studies are completed within class hours, minimizing private tuition.",
      fullMessage: `It is now progressing successfully with both departments. The college is known for its strong discipline, spacious campus, and dedicated teachers who ensure students complete their studies within class hours—minimizing the need for private tuition.

A standout feature is the Guide Teacher System, where each group of 7–8 students is mentored closely by a teacher for both academic and personal support, with regular communication maintained with guardians. Many students with lower SSC results have significantly improved their performance in HSC and gained admission to public universities.`,
      image: "https://i.ibb.co.com/zVWR5SV8/Director.png",
    },
    {
      id: 3,
      role: "Principal Sir Speech",
      name: "Professor Md. Amjad Hossain",
      title: "HEAD OF IDEAL COMMERCE COLLEGE",
      quote: "Providing quality education under the motto 'Modernity in Quality Education.'",
      shortMessage: "Located in Farmgate, Dhaka, operating under the Abdul Halim Patwary Foundation to shape complete individuals.",
      fullMessage: `Ideal Commerce College, located in Farmgate, Dhaka, is a renowned educational institution established and operated by the Abdul Halim Patwary Foundation. Since its inception in 2004 with the Business Studies stream and later expanding to Science in 2019, the college has been committed to providing quality education under the motto “Modernity in Quality Education.”

Our experienced and trained faculty members ensure a supportive learning environment that nurtures each student’s potential. We emphasize not only academic excellence but also personal development, discipline, and moral values to shape students into complete individuals. We believe that every student has unique talent, and with proper care and guidance, they can achieve outstanding results. Ideal Commerce College is fully dedicated to this mission — helping students grow academically, socially, and morally for a brighter future.`,
      image: "https://i.ibb.co.com/99d0rKJZ/Principle.png",
    },
  ];

  return (
    <section className="w-full bg-[#f1f3f6] py-16 md:py-20 relative">
      {/* Reduced padding on mobile from px-6 to px-3 */}
      <div className="w-11/12 md:w-5/6 mx-auto px-3 md:px-6">
        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="speech-swiper pb-14"
        >
          {speechesData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center min-h-[420px]">
                {/* Left Side: Image with Decorative Border Frame */}
                <div className="md:col-span-5 flex justify-center relative">
                  <div className="relative w-64 h-80 sm:w-80 sm:h-96">
                    {/* Orange Outline Backdrop Box */}
                    <div className="absolute -top-3 -left-3 inset-0 border-2 border-amber-400 rounded-2xl z-0" />

                    {/* Main Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative z-10 w-full h-full object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                </div>

                {/* Right Side: Speech & Content */}
                <div className="md:col-span-7 flex flex-col justify-center space-y-4 md:space-y-5">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 md:w-12 md:h-12 text-blue-200 fill-blue-200" />

                  {/* Main Quote / Headline */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight tracking-tight">
                    "{item.quote}"
                  </h2>

                  {/* Divider Line */}
                  <div className="w-8 h-1 bg-amber-400 rounded-full" />

                  {/* Author Meta */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mt-0.5">
                      {item.title}
                    </p>
                  </div>

                  {/* Short Excerpt */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                    {item.shortMessage}
                  </p>

                  {/* Read Full Message Trigger Button */}
                  <div>
                    <button
                      onClick={() => setSelectedSpeech(item)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group mt-2 mb-4"
                    >
                      Read Full Message
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Full Message Modal */}
      {selectedSpeech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSpeech(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-5 mb-6">
              <img
                src={selectedSpeech.image}
                alt={selectedSpeech.name}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-amber-400"
              />
              <div>
                <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">
                  {selectedSpeech.role}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {selectedSpeech.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {selectedSpeech.title}
                </p>
              </div>
            </div>

            {/* Modal Body / Full Message */}
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
              <p className="font-semibold text-gray-900 text-base md:text-lg italic">
                "{selectedSpeech.quote}"
              </p>
              <p>{selectedSpeech.fullMessage}</p>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedSpeech(null)}
                className="bg-[#192231] hover:bg-[#111722] text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EsteemedLeaders;