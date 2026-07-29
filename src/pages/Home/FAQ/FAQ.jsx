import React, { useState } from 'react';
import { 
  ChevronDown, 
  Download, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  MessageSquare 
} from 'lucide-react';

const Prospectus = '/ICC-Prospectus.pdf';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqData = [
    {
      question: "What is the admission process at Ideal Commerce College?",
      answer: (
        <>
          <p className="mb-3">
            The admission process includes submitting an online application through the national portal, providing academic transcripts (SSC results), and completing enrollment based on merit. No entrance exam or interview is required, but selection depends on GPA and seat availability. Alternatively, you may visit the college campus directly, where an admission booth is available to assist with the application process.
          </p>
          <a
            href={Prospectus}
            download="Prospectus_ICC.pdf"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </>
      ),
    },
    {
      question: "What are the available programs at Ideal Commerce College?",
      answer: "We offer Higher Secondary programs in Science, Arts, and Commerce streams, designed to build strong academic foundations for university admission. Our curriculum emphasizes quality education, discipline, and modern teaching methods across all subjects.",
    },
    {
      question: "What are the campus facilities?",
      answer: "Our campus features modern, spacious classrooms equipped with multimedia technology, a well-furnished computer laboratory, and a comprehensive library that supports both academic and research needs. Students also benefit from sports facilities, a large auditorium for cultural and academic events, and dedicated spaces for debates, language practice, and other extracurricular activities. To ensure a comfortable learning environment, the campus maintains a clean, disciplined, and politics-free atmosphere, with reliable utilities such as pure drinking water and uninterrupted power supply.",
    },
    {
      question: "Does the college offer extracurricular activities and student organizations?",
      answer: "Yes, Ideal Commerce College offers a wide range of extracurricular activities and student organizations to support the overall development of its students. These include the Rover Scouts, Debate Club, Sports Club, Language Club, as well as various cultural and literary clubs. The college also organizes annual events such as Independence Day celebrations, Victory Day programs, and cultural festivals, which encourage student participation and leadership.",
    },
    {
      question: "How can I contact the admission office?",
      answer: "You can reach our admission office through email at principalicc@yahoo.com, phone at 0258155962, 01912130388, 01559086941-2 or visit us during office hours (9 AM - 4 PM, Sunday-Thursday).",
    },
  ];

  return (
    <section className="relative w-full py-16 px-6 lg:px-20 bg-gradient-to-b from-gray-950 via-[#00212A] to-black text-white overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-amber-500 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[420px] p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
              
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-teal-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 w-28 h-28 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6 shadow-inner">
                <HelpCircle className="w-14 h-14 text-amber-400 animate-pulse" />
              </div>

              <h3 className="relative z-10 text-2xl font-bold text-white mb-2">
                Need Clarification?
              </h3>
              <p className="relative z-10 text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
                Find answers to common queries regarding admissions, programs, and campus guidelines.
              </p>

              <div className="relative z-10 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Admissions
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" /> Programs
                </span>
              </div>

            </div>
          </div>

          {/* Right Column Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 border backdrop-blur-xl ${
                    isOpen
                      ? 'bg-white/10 border-amber-500/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="flex items-center gap-3 font-semibold text-base sm:text-lg text-gray-100 pr-2">
                      <MessageSquare className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-amber-400' : 'text-gray-400'}`} />
                      {faq.question}
                    </span>
                    <span
                      className={`p-2 rounded-full bg-white/10 text-amber-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-amber-500 text-black' : ''
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 pb-6 px-6'
                        : 'grid-rows-[0fr] opacity-0 pb-0 px-6'
                    }`}
                  >
                    <div className="overflow-hidden text-sm sm:text-base text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}