import React from 'react';
import { CreditCard, Calendar, CheckCircle2, DollarSign } from 'lucide-react';

export default function FeesPage() {
  const feeStructure = [
    {
      group: 'Business Studies',
      tag: 'Business Group',
      monthly: '1,600/-',
      firstYear: '15,000/-',
      secondYear: '13,500/-',
    },
    {
      group: 'Science',
      tag: 'Science Group',
      monthly: '1,800/-',
      firstYear: '15,000/-',
      secondYear: '13,500/-',
    },
    {
      group: 'Humanities',
      tag: 'Humanities Group',
      monthly: '1,600/-',
      firstYear: '15,000/-',
      secondYear: '13,500/-',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#030712] font-sans text-slate-200 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Fee Information</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Monthly Tuition & Admission Fees
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
            Complete admission, session, and monthly tuition fee breakdown for 1st and 2nd-year HSC programs at Ideal Commerce College.
          </p>
        </div>

        {/* Dynamic Hover Interactive Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feeStructure.map((item, index) => (
            <div
              key={index}
              className="group relative bg-[#060b17] rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 cursor-pointer"
            >
              {/* Dynamic Badge (Shown smoothly on Hover) */}
              <span className="absolute -top-3.5 right-6 bg-cyan-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
                {item.tag}
              </span>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                    {item.group}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium">HSC Course Fee</p>
                </div>

                {/* Main Price Box */}
                <div className="p-5 bg-[#0a1120] rounded-2xl border border-slate-800/60 text-center space-y-2 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-[#081329]">
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">
                    Monthly Tuition
                  </span>
                  <div className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center gap-1">
                    <span className="text-cyan-400 text-2xl font-bold">৳</span> {item.monthly}
                  </div>
                </div>

                {/* Fee Features List */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      1st Year Admission & Session Fee
                    </span>
                    <span className="font-bold text-slate-200">৳ {item.firstYear}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      2nd Year Annual Fee
                    </span>
                    <span className="font-bold text-slate-200">৳ {item.secondYear}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Fee Chart Table */}
        <div className="bg-[#0a1120]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-slate-800/80 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Fee Chart Summary
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 border-b border-slate-800 uppercase text-[10px] font-bold text-slate-400 tracking-wider">
                <tr>
                  <th className="py-4 px-6">Group / Discipline</th>
                  <th className="py-4 px-6 text-center">Monthly Tuition Fee</th>
                  <th className="py-4 px-6 text-center">1st Year Admission & Session Fee</th>
                  <th className="py-4 px-6 text-center">2nd Year Annual Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {feeStructure.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition">
                    <td className="py-4 px-6 font-bold text-slate-100 flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{row.group}</span>
                    </td>
                    <td className="py-4 px-6 text-center text-cyan-400 font-bold">
                      ৳ {row.monthly}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-200 font-semibold">
                      ৳ {row.firstYear}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-200 font-semibold">
                      ৳ {row.secondYear}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}