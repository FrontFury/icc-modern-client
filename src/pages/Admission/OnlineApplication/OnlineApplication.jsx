import React, { useState } from 'react';
import { HelpCircle, UploadCloud, ChevronDown, Send, Sparkles } from 'lucide-react';

export default function OnlineApplication() {
  const [formData, setFormData] = useState({
    studentName: '',
    gender: '',
    fatherName: '',
    motherName: '',
    dob: '',
    phone: '',
    email: '',
    group: '',
    sscGpa: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files[0].name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully to Ideal Commerce College portal!');
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 sm:p-8 lg:p-12 font-sans text-slate-200 relative overflow-hidden antialiased">
      
      {/* Ambient Background Light Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* LEFT COLUMN: Section Details & Step Indicator */}
        <div className="lg:col-span-4 space-y-6 pt-2">
          
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-md mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Admission Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Online Application
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Please ensure all details provided match your official SSC academic transcripts. Submission of incorrect information may result in application cancellation.
            </p>
          </div>

          {/* Stepper list */}
          <div className="space-y-4 pt-2">
            
            {/* Step 1 - Active */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 shadow-[0_0_12px_rgba(34,211,238,0.5)]">
                1
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white leading-none mb-1">
                  Personal Details
                </h3>
                <p className="text-[11px] text-slate-400">
                  Verify identity through official documents.
                </p>
              </div>
            </div>

            {/* Step 2 - Inactive */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-900/60 backdrop-blur-md opacity-50">
              <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-300 leading-none mb-1">
                  Academic History
                </h3>
                <p className="text-[11px] text-slate-500">
                  Upload transcripts and grade sheets.
                </p>
              </div>
            </div>

            {/* Step 3 - Inactive */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-900/60 backdrop-blur-md opacity-50">
              <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-300 leading-none mb-1">
                  Submission
                </h3>
                <p className="text-[11px] text-slate-500">
                  Receive confirmation code via SMS/email.
                </p>
              </div>
            </div>

          </div>

          {/* Need Assistance Callout Box */}
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 backdrop-blur-md mt-8">
            <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-black uppercase tracking-wider mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Need Assistance?
            </div>
            <p className="text-xs text-slate-400 mb-1">
              Contact our Farmgate admission helpdesk at:
            </p>
            <a 
              href="mailto:admissions@icc.edu.bd" 
              className="text-xs font-bold text-cyan-300 hover:text-cyan-200 underline transition"
            >
              admissions@icc.edu.bd
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Application Form Card */}
        <div className="lg:col-span-8 bg-slate-900/60 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800/80 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Grid 1: Name & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  placeholder="Full Name as per Transcript"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white appearance-none focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200 cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-900 text-slate-400">Select Gender</option>
                    <option value="Male" className="bg-slate-900 text-white">Male</option>
                    <option value="Female" className="bg-slate-900 text-white">Female</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid 2: Father's Name & Mother's Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  placeholder="Legal Name"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  placeholder="Legal Name"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200"
                />
              </div>
            </div>

            {/* Grid 3: Date of Birth & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200 [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+880 1700-000000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200"
                />
              </div>
            </div>

            {/* Grid 4: Email Address & Academic Stream / Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Academic Group
                </label>
                <div className="relative">
                  <select
                    name="group"
                    value={formData.group}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white appearance-none focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200 cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-900 text-slate-400">Select Group</option>
                    <option value="Business Studies (Commerce)" className="bg-slate-900 text-white">Business Studies (Commerce)</option>
                    <option value="Science" className="bg-slate-900 text-white">Science</option>
                    <option value="Humanities (Arts)" className="bg-slate-900 text-white">Humanities (Arts)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid 5: Previous Result (GPA) & Upload Photo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  SSC Result (GPA)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="2.00"
                  max="5.00"
                  name="sscGpa"
                  placeholder="e.g. 4.85"
                  value={formData.sscGpa}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-300 mb-1.5">
                  Upload Photo
                </label>
                <label className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-400 hover:border-slate-700 cursor-pointer transition">
                  <span className="truncate">
                    {formData.photo ? formData.photo : 'Select file (JPG, PNG)'}
                  </span>
                  <UploadCloud className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Submit Application</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Disclaimer Footer */}
            <p className="text-[10px] text-center text-slate-500 pt-1">
              By submitting, you agree to Ideal Commerce College's Terms of Enrollment and Academic Integrity Policies.
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}