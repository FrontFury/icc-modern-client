import React, { useState } from 'react';
import { HelpCircle, UploadCloud, ChevronDown, Send } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 sm:p-8 lg:p-12 font-sans text-slate-800">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Section Details & Step Indicator */}
        <div className="lg:col-span-4 space-y-6 pt-2">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
              Online Application
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Please ensure all details provided match your official SSC academic transcripts. Submission of incorrect information may result in application cancellation.
            </p>
          </div>

          {/* Stepper list */}
          <div className="space-y-4 pt-2">
            
            {/* Step 1 - Active */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                1
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-none mb-1">
                  Personal Details
                </h3>
                <p className="text-[11px] text-slate-500">
                  Verify identity through official documents.
                </p>
              </div>
            </div>

            {/* Step 2 - Inactive */}
            <div className="flex items-start gap-3 opacity-60">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 leading-none mb-1">
                  Academic History
                </h3>
                <p className="text-[11px] text-slate-500">
                  Upload transcripts and grade sheets.
                </p>
              </div>
            </div>

            {/* Step 3 - Inactive */}
            <div className="flex items-start gap-3 opacity-60">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 leading-none mb-1">
                  Submission
                </h3>
                <p className="text-[11px] text-slate-500">
                  Receive confirmation code via SMS/email.
                </p>
              </div>
            </div>

          </div>

          {/* Need Assistance Callout Box */}
          <div className="bg-[#e5e7eb]/70 rounded-xl p-4 border border-slate-300/60 mt-8">
            <div className="flex items-center gap-1.5 text-blue-700 text-[11px] font-black uppercase tracking-wider mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Need Assistance?
            </div>
            <p className="text-xs text-slate-600 mb-1">
              Contact our Farmgate admission helpdesk at:
            </p>
            <a 
              href="mailto:admissions@icc.edu.bd" 
              className="text-xs font-bold text-slate-900 underline hover:text-blue-700 transition"
            >
              admissions@icc.edu.bd
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Application Form Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Grid 1: Name & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  placeholder="Full Name as per Transcript"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 appearance-none focus:outline-none focus:bg-white focus:border-blue-600 transition cursor-pointer"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid 2: Father's Name & Mother's Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  placeholder="Legal Name"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  placeholder="Legal Name"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Grid 3: Date of Birth & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+880 1700-000000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Grid 4: Email Address & Academic Stream / Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Academic Group
                </label>
                <div className="relative">
                  <select
                    name="group"
                    value={formData.group}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 appearance-none focus:outline-none focus:bg-white focus:border-blue-600 transition cursor-pointer"
                  >
                    <option value="" disabled>Select Group</option>
                    <option value="Business Studies (Commerce)">Business Studies (Commerce)</option>
                    <option value="Science">Science</option>
                    <option value="Humanities (Arts)">Humanities (Arts)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid 5: Previous Result (GPA) & Upload Photo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
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
                  className="w-full px-3.5 py-2.5 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Upload Photo
                </label>
                <label className="w-full flex items-center justify-between px-3.5 py-2 bg-[#f9fafb] border border-slate-200 rounded-lg text-xs text-slate-500 hover:bg-slate-100 cursor-pointer transition">
                  <span className="truncate">
                    {formData.photo ? formData.photo : 'Select file (JPG, PNG)'}
                  </span>
                  <UploadCloud className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
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
                className="w-full py-3.5 bg-black hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-lg transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Application</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Disclaimer Footer */}
            <p className="text-[10px] text-center text-slate-400 pt-1">
              By submitting, you agree to Ideal Commerce College's Terms of Enrollment and Academic Integrity Policies.
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}