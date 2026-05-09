import { Mail, Phone, HelpCircle } from 'lucide-react';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-primary/5">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="text-primary" size={32} />
            <h1 className="text-3xl font-bold text-slate-900">Help Center</h1>
          </div>
          <p className="text-slate-600 text-lg">We're here to help you navigate the Campus Blood Network.</p>
        </div>
        
        <div className="p-8 prose prose-slate max-w-none">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6 mb-12">
            <div>
              <h4 className="font-semibold text-slate-900">How do I request blood?</h4>
              <p className="text-slate-600">Navigate to the "Emergency" tab and fill out the request form with the patient's details and hospital location. Our verified donors will see it immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">How do I become a donor?</h4>
              <p className="text-slate-600">Register for an account using your university details. Make sure to accurately select your blood group and mark yourself as "Available" when you are ready to donate.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Is my data secure?</h4>
              <p className="text-slate-600">Yes, we prioritize your privacy. Only verified students and administrators have access to contact information.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">Contact Support</h3>
            <p className="mb-6 text-slate-600">If you have any further queries, encounter technical issues, or need immediate administrative assistance, please contact the network administrator:</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Email Address</p>
                  <a href="mailto:wp.rasedul@gmail.com" className="text-lg font-semibold text-slate-900 hover:text-primary transition-colors">wp.rasedul@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Phone Number</p>
                  <a href="tel:+8801837995395" className="text-lg font-semibold text-slate-900 hover:text-primary transition-colors">+8801837995395</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
