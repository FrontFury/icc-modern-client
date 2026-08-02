import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronRight, X, Quote, Award } from "lucide-react";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const EsteemedLeaders = () => {
  const [selectedSpeech, setSelectedSpeech] = useState(null);

  const speechesData = [
    {
      id: 1,
      role: "Chairman Sir Speech",
      name: "Dr. M. A. Halim Patwary",
      title: "CHAIRMAN OF IDEAL COMMERCE COLLEGE",
      quote:
        "In today’s competitive global economy, success demands skilled, forward-thinking individuals grounded in values.",
      shortMessage:
        "At Ideal Commerce College, we are committed to nurturing capable minds equipped with moral integrity and academic excellence.",
      fullMessage: `In today’s competitive global economy, success demands skilled, forward-thinking individuals grounded in values, patriotism, and knowledge. At Ideal Commerce College, we are committed to nurturing such capable minds—equipped with both moral integrity and academic excellence.

Recognizing the growing need for science-based education alongside business studies, we have introduced a science stream to offer students a broader, multidimensional learning experience. This expansion will empower students to contribute meaningfully to the vision of a Digital Bangladesh.`,
      image: "https://i.ibb.co.com/nVD8wft/Chairman.png",
    },
    {
      id: 2,
      role: "Director Ma'am Speech",
      name: "Hasina Momotaz",
      title: "DIRECTOR OF IDEAL COMMERCE COLLEGE",
      quote:
        "Our Guide Teacher System ensures each group of 7–8 students is closely mentored for academic and personal growth.",
      shortMessage:
        "Known for strong discipline and dedicated teachers who ensure studies are completed within class hours, minimizing private tuition.",
      fullMessage: `It is now progressing successfully with both departments. The college is known for its strong discipline, spacious campus, and dedicated teachers who ensure students complete their studies within class hours—minimizing the need for private tuition.

A standout feature is the Guide Teacher System, where each group of 7–8 students is mentored closely by a teacher for both academic and personal support, with regular communication maintained with guardians. Many students with lower SSC results have significantly improved their performance in HSC and gained admission to public universities.`,
      image: "https://i.ibb.co.com/zVWR5SV8/Director.png",
    },
    {
      id: 3,
      role: "Principal Sir Speech",
      name: "Professor Md. Amjad Hossain",
      title: "HEAD OF IDEAL COMMERCE COLLEGE",
      quote:
        "Providing quality education under the motto 'Modernity in Quality Education.'",
      shortMessage:
        "Located in Farmgate, Dhaka, operating under the Abdul Halim Patwary Foundation to shape complete individuals.",
      fullMessage: `Ideal Commerce College, located in Farmgate, Dhaka, is a renowned educational institution established and operated by the Abdul Halim Patwary Foundation. Since its inception in 2004 with the Business Studies stream and later expanding to Science in 2019, the college has been committed to providing quality education under the motto “Modernity in Quality Education.”

Our experienced and trained faculty members ensure a supportive learning environment that nurtures each student’s potential. We emphasize not only academic excellence but also personal development, discipline, and moral values to shape students into complete individuals. We believe that every student has unique talent, and with proper care and guidance, they can achieve outstanding results. Ideal Commerce College is fully dedicated to this mission — helping students grow academically, socially, and morally for a brighter future.`,
      image: "https://i.ibb.co.com/99d0rKJZ/Principle.png",
    },
  ];

  return (
    <section className="w-full bg-[#030712] py-20 md:py-28 relative overflow-hidden">
      {/* Background Glow Accents matching AlumniStories */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-11/12 md:w-5/6 mx-auto px-3 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold text-xs uppercase px-4 py-1.5 rounded-full tracking-wider mb-4 shadow-inner">
            <Award className="w-3.5 h-3.5" />
            Leadership Messages
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Words from Our{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Esteemed Leaders
            </span>
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="speech-swiper pb-16 [&_.swiper-pagination-bullet]:bg-slate-600 [&_.swiper-pagination-bullet-active]:!bg-amber-400 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all"
        >
          {speechesData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-gradient-to-b from-slate-900/90 via-[#071927]/80 to-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Decorative Inner Ambient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center min-h-[420px] relative z-10">
                  {/* Left Side: Frame Styled Portrait */}
                  <div className="md:col-span-5 flex justify-center relative">
                    <div className="relative w-64 h-80 sm:w-80 sm:h-96 group">
                      {/* Outer Gradient Glowing Frame */}
                      <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/40 via-cyan-500/30 to-amber-400/50 rounded-2xl blur-md opacity-80 group-hover:opacity-100 transition-opacity" />

                      {/* Main Image Box */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-slate-800 shadow-2xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Speech & Details */}
                  <div className="md:col-span-7 flex flex-col justify-center space-y-5">
                    {/* Role Badge & Quote Icon Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        {item.role}
                      </span>
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <Quote className="w-5 h-5 fill-cyan-400/20" />
                      </div>
                    </div>

                    {/* Headline Quote */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-extrabold text-white leading-tight tracking-tight">
                      "{item.quote}"
                    </h3>

                    {/* Accent Divider */}
                    <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />

                    {/* Author Meta */}
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-slate-100">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mt-1">
                        {item.title}
                      </p>
                    </div>

                    {/* Short Excerpt */}
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                      {item.shortMessage}
                    </p>

                    {/* Read Full Message Trigger */}
                    <div>
                      <button
                        onClick={() => setSelectedSpeech(item)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-sm font-semibold text-cyan-400 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 group shadow-md"
                      >
                        Read Full Message
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Full Message Glass Modal */}
      {selectedSpeech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSpeech(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors border border-slate-700/50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 border-b border-slate-800 pb-6 mb-6">
              <img
                src={selectedSpeech.image}
                alt={selectedSpeech.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-amber-400/80 bg-slate-800 shadow-md flex-shrink-0"
              />
              <div className="pr-8">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md inline-block mb-1">
                  {selectedSpeech.role}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {selectedSpeech.name}
                </h3>
                <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                  {selectedSpeech.title}
                </p>
              </div>
            </div>

            {/* Modal Body / Full Message */}
            <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
              <p className="font-bold text-amber-300 text-base md:text-lg italic bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                "{selectedSpeech.quote}"
              </p>
              <div className="text-slate-300 pt-2 space-y-3">
                {selectedSpeech.fullMessage}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSpeech(null)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
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