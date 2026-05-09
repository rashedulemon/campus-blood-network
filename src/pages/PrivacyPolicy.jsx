export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-primary/5">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="p-8 prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>
            Welcome to the Campus Blood Network. We respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
          </p>
          
          <h3 className="text-slate-900 font-semibold text-xl">1. Information We Collect</h3>
          <p>
            When you register as a donor or submit an emergency request, we collect information such as your name, 
            university student ID, blood group, email address, and contact number. This information is necessary 
            to facilitate blood donations effectively.
          </p>

          <h3 className="text-slate-900 font-semibold text-xl">2. How We Use Your Information</h3>
          <p>
            Your information is primarily used to connect blood donors with those in need. Emergency requests containing 
            contact information are made visible to registered users to allow immediate communication during critical times.
          </p>

          <h3 className="text-slate-900 font-semibold text-xl">3. Data Security</h3>
          <p>
            We implement standard security measures to maintain the safety of your personal information. However, please 
            be aware that no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
            <h3 className="text-slate-900 font-semibold text-lg mb-2">Privacy Inquiries</h3>
            <p>For any questions or concerns regarding our privacy practices, please contact our administrator:</p>
            <ul className="mt-4 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:wp.rasedul@gmail.com" className="text-primary hover:underline">wp.rasedul@gmail.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+8801837995395" className="text-primary hover:underline">+8801837995395</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
