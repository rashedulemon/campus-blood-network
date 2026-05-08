import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Activity, Info } from 'lucide-react';

export default function AboutPage() {
  const faqs = [
    {
      q: "Who can donate blood?",
      a: "In general, anyone in good health, at least 18 years old, and weighing at least 50 kg can donate blood. There are some medical conditions and medications that may prevent you from donating."
    },
    {
      q: "How often can I donate?",
      a: "You must wait at least 8 weeks (56 days) between donations of whole blood. For double red cell donations, you must wait 112 days."
    },
    {
      q: "Is it safe to donate blood?",
      a: "Yes, it is completely safe. Sterile, single-use needles and equipment are used for each donor and then safely discarded."
    },
    {
      q: "How long does a donation take?",
      a: "The actual blood draw takes about 8-10 minutes. The entire process, from registration to post-donation rest, takes about 45-60 minutes."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 border border-primary/20"
          >
            <Info size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-900 mb-4"
          >
            About Blood Donation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Learn about the process, eligibility, and the impact of your donation.
          </motion.p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Save Lives</h3>
            <p className="text-slate-600 text-sm">One donation can save up to three lives. Your blood helps accident victims, surgery patients, and those with blood disorders.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Safe Process</h3>
            <p className="text-slate-600 text-sm">We ensure all donations are conducted safely in verified medical facilities or mobile camps using sterile, single-use equipment.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Activity size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Health Benefits</h3>
            <p className="text-slate-600 text-sm">Regular blood donation is linked to lower blood pressure and a lower risk of heart attacks. It also includes a free mini physical!</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {faqs.map((faq, index) => (
              <div key={index} className="p-8 hover:bg-slate-50 transition-colors">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
