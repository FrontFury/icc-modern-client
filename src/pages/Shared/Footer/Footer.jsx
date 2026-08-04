import { Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#030712] text-slate-400 font-sans border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-11/12 md:w-5/6 mx-auto px-3 md:px-6 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-white tracking-wider uppercase">
              IDEAL COMMERCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">COLLEGE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              Built for academic excellence since 2004. Directed by Abdul Halim Patwary Foundation and dedicated to nurturing future leaders in Dhaka.
            </p>
            {/* Social / Action Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/iccofficialsCampusLifeSection" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(34,211,238,0.2)]"
              >
                {/* Facebook Inline SVG */}
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <button 
                aria-label="Website" 
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(34,211,238,0.2)]"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button 
                aria-label="Share" 
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(34,211,238,0.2)]"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Admissions */}
          <div>
            <h3 className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-5">
              ADMISSIONS
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">How to Apply</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">HSC Admission Guidelines</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Fees & Scholarships</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Eligibility & Requirements</a></li>
            </ul>
          </div>

          {/* Column 3: Academics */}
          <div>
            <h3 className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-5">
              ACADEMICS
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Business Studies</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Science Division</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Humanities / Arts</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Academic Calendar</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-5">
              CONTACT US
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">83, Green Road, Farmgate, Dhaka-1205, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+8801912130388" className="text-slate-300 hover:text-cyan-400 transition-colors">+880 1912-130388</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:principalicc@yahoo.com" className="text-slate-300 hover:text-cyan-400 transition-colors">principalicc@yahoo.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Ideal Commerce College (EIIN: 134207). All rights reserved. Developed by{' '}
            <a 
              href="https://tasin07.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 font-semibold transition-colors"
            >
              Estiak Ahamed Tasin
            </a>
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Campus Map</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;