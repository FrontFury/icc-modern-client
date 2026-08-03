import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'HSC - Business Studies',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'HSC - Business Studies',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-40 bg-[#030712] font-sans text-slate-200 pb-20 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Header Section */}
      <section className="border-b border-slate-800/80 pt-16 pb-16 px-6 sm:px-12 md:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="w-10 h-1 bg-cyan-400 rounded-full mb-4 shadow-[0_0_10px_#22d3ee]" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-4">
            <span>EIIN: 134207</span>
            <span className="text-slate-600">•</span>
            <span>Dhaka Education Board</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Contact Ideal Commerce College
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed font-medium">
            We are here to support your academic journey across Higher Secondary (HSC) and National University degree programs. Reach out to our admissions team or administration office.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Get in Touch & Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Get in Touch Card */}
            <div className="bg-[#0a1120]/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-6">
              <h2 className="text-xl font-extrabold text-white">
                Get in Touch
              </h2>

              <div className="space-y-6 text-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Campus Address</h3>
                    <p className="font-semibold text-slate-200 mt-0.5 leading-snug">
                      16, Indira Road, Farmgate, Tejgaon,<br />Dhaka-1215, Bangladesh
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Phone & Admission Desk</h3>
                    <p className="font-semibold text-slate-200 mt-0.5">
                      +880 2-9133452 / +880 1912-130388
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">General Email</h3>
                    <p className="font-semibold text-slate-200 mt-0.5">
                      info@idealcommercecollege.edu.bd
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Programs Info Card */}
            <div className="bg-[#0a1120]/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Available Disciplines</h3>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-b border-slate-800/80 pb-4">
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-200">HSC Business Studies</span>
                  <span className="bg-slate-900 border border-slate-800 text-cyan-400 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold">250 Seats</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-200">HSC Science</span>
                  <span className="bg-slate-900 border border-slate-800 text-cyan-400 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold">150 Seats</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-200">HSC Humanities / Arts</span>
                  <span className="bg-slate-900 border border-slate-800 text-cyan-400 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold">100 Seats</span>
                </li>
              </ul>

              {/* Office Hours */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Office Hours</span>
                </div>
                <div className="text-xs space-y-1 text-slate-400">
                  <div className="flex justify-between">
                    <span>Sat – Thu (Morning Shift)</span>
                    <span className="font-bold text-slate-200">08:00 AM – 04:00 PM</span>
                  </div>
                  <div className="flex justify-between text-rose-400 font-medium">
                    <span>Friday</span>
                    <span className="font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Contact Form & Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Card */}
            <div className="bg-[#0a1120]/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Thank you for contacting Ideal Commerce College. Our admissions desk will respond to your query shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl outline-none text-xs text-slate-200 placeholder-slate-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl outline-none text-xs text-slate-200 placeholder-slate-500 transition"
                      />
                    </div>
                  </div>

                  {/* Expanded & Organized Subject Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Subject of Inquiry
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl outline-none text-xs text-slate-200 transition cursor-pointer font-medium"
                    >
                      <optgroup label="HSC Admissions (XI-XII)" className="bg-slate-900 text-slate-200">
                        <option value="HSC Business Studies">HSC - Business Studies Group</option>
                        <option value="HSC Science">HSC - Science Group</option>
                        <option value="HSC Humanities">HSC - Humanities / Arts Group</option>
                      </optgroup>

                      <optgroup label="Student Services & General" className="bg-slate-900 text-slate-200">
                        <option value="Alumni Network">Alumni Network & Registration</option>
                        <option value="Transcript & Testimonial Request">Transcript & Testimonial Request</option>
                        <option value="General Query">General / Academic Inquiry</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify your SSC result / GPA, group interest, or degree details so we can best assist you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl outline-none text-xs text-slate-200 placeholder-slate-500 transition resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5"
                    >
                      <span>Send Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Map Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-xl bg-slate-900 h-80">
              <iframe
                title="Ideal Commerce College Location Map"
                className="w-full h-full border-0"
                src="https://maps.google.com/maps?q=Ideal%20Commerce%20College%20Indira%20Road%20Farmgate%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              />

              <div className="absolute bottom-3 left-3 right-3 bg-[#0a1120]/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/80 shadow-lg flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">
                    Ideal Commerce College Main Campus
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    16, Indira Road, Farmgate, Dhaka-1215
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Ideal+Commerce+College+Farmgate+Dhaka"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}