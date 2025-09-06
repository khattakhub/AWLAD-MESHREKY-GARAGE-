import React from 'react';
import Link from 'next/link';
import { FacebookIcon, WhatsAppIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-secondary text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="mb-6 md:mb-0">
             <h3 className="text-2xl font-black text-white">AWLAD MESHREKY</h3>
             <p className="text-sm text-gray-400 mt-2">Your trusted partner for premium automotive services in Ajman. Quality and customer satisfaction are our top priorities.</p>
             <div className="flex justify-start space-x-4 mt-4">
                <a href="https://www.facebook.com/awladmeshreky" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-accent transition-colors duration-300">
                    <FacebookIcon />
                </a>
                <a href="https://wa.me/971508361799" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-accent transition-colors duration-300">
                    <WhatsAppIcon />
                </a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
                <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
                <li><Link href="/#testimonials" className="hover:text-accent transition-colors">Testimonials</Link></li>
                <li><Link href="/tools" className="hover:text-accent transition-colors">Tools</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Our Services */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
                <li>Engine Diagnostics & Repair</li>
                <li>Lube & Oil Change</li>
                <li>Brake System Services</li>
                <li>A/C Repair & Service</li>
                <li>Tire Services & Alignment</li>
                <li>Professional Detailing</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for promotions and tips.</p>
            <form>
                <div className="flex">
                    <input type="email" placeholder="Your Email" className="w-full bg-dark p-3 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent" />
                    <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold p-3 rounded-r-lg transition-colors">
                        Go
                    </button>
                </div>
            </form>
          </div>

        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AWLAD MESHREKY GARAGE. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;