import { Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-secondary text-gray-400 font-sans border-t border-gray-900">
      <div className="w-5/6 mx-auto px-6 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              IDEAL COMMERCE COLLEGE
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              Built for academic excellence since 1999. Dedicated to nurturing the next generation of global leaders.
            </p>
            {/* Social / Action Icons */}
            <div className="flex gap-3 pt-2">
              <button 
                aria-label="Website" 
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button 
                aria-label="Share" 
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-white transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Column 2: Admissions */}
          <div>
            <h3 className="text-amber-500 font-medium text-sm tracking-wider uppercase mb-5">
              ADMISSIONS
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">How to Apply</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scholarships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fees & Funding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">International Students</a></li>
            </ul>
          </div>

          {/* Column 3: Academics */}
          <div>
            <h3 className="text-amber-500 font-medium text-sm tracking-wider uppercase mb-5">
              ACADEMICS
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Departments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Academic Calendar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Library & Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-amber-500 font-medium text-sm tracking-wider uppercase mb-5">
              CONTACT US
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>123 Academic Way, Education City, ED 45678</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="mailto:info@abccollege.edu" className="hover:text-white transition-colors">info@abccollege.edu</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2024 ABC College. All rights reserved. Built for academic excellence.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Campus Map</a>
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;