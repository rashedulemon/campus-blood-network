export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-primary/5">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-600">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="p-8 prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>
            By accessing or using the Campus Blood Network, you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the service.
          </p>

          <h3 className="text-slate-900 font-semibold text-xl">1. Eligibility</h3>
          <p>
            Our service is intended for verified university students and affiliated personnel. 
            You must provide accurate and complete information during registration.
          </p>

          <h3 className="text-slate-900 font-semibold text-xl">2. Acceptable Use</h3>
          <p>
            You agree to use this platform solely for the purpose of facilitating or seeking voluntary blood donations. 
            Any misuse of the platform, including posting fake requests, harassing donors, or attempting to commercialize 
            the blood donation process, is strictly prohibited and will result in immediate account termination.
          </p>

          <h3 className="text-slate-900 font-semibold text-xl">3. Medical Disclaimer</h3>
          <p>
            The Campus Blood Network is a communication tool to connect donors with recipients. We do not provide medical 
            advice, nor do we verify the medical eligibility of donors. All blood donations must be conducted under the 
            strict supervision of qualified medical professionals at registered hospitals or clinics.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
            <h3 className="text-slate-900 font-semibold text-lg mb-2">Contact Information</h3>
            <p>If you have any questions about these Terms, or need to report a violation, please contact us:</p>
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
