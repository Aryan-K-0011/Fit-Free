import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-4">Connect With Us</h1>
          <p className="text-lg text-slate-400">Questions? Partnerships? Feedback? Reach out.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="col-span-1 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl shadow-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 uppercase italic">HQ Contact</h3>
            <p className="text-orange-100 mb-10 leading-relaxed">
              Our support team is active 24/7. Fill out the form and we'll get you back to training in no time.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-500/30 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-500/30 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold">support@fitfree.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-500/30 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold">123 Iron Street, Muscle City, MC 90210</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-1 lg:col-span-2 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 md:p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                   <Mail className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Message Received</h3>
                <p className="text-slate-400 text-lg">Thank you. We will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-orange-500 font-bold hover:text-orange-400 uppercase tracking-wider"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold text-slate-400 mb-2 uppercase">First Name</label>
                    <input type="text" id="firstName" required className="w-full bg-slate-950 border border-slate-700 rounded-lg shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 py-3 px-4 text-white placeholder-slate-600 transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold text-slate-400 mb-2 uppercase">Last Name</label>
                    <input type="text" id="lastName" required className="w-full bg-slate-950 border border-slate-700 rounded-lg shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 py-3 px-4 text-white placeholder-slate-600 transition-all" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-400 mb-2 uppercase">Email</label>
                  <input type="email" id="email" required className="w-full bg-slate-950 border border-slate-700 rounded-lg shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 py-3 px-4 text-white placeholder-slate-600 transition-all" placeholder="john@example.com" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-400 mb-2 uppercase">Message</label>
                  <textarea id="message" rows={4} required className="w-full bg-slate-950 border border-slate-700 rounded-lg shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 py-3 px-4 text-white placeholder-slate-600 transition-all" placeholder="How can we help you?"></textarea>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto">Send Message</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;