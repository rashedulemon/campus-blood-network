import { motion } from 'framer-motion';
import { Calendar, Phone, MapPin, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/utils';

export default function RequestCard({ request }) {
  const isUrgent = true; // We can add logic to determine urgency based on date
  
  // Format required date
  let formattedDate = "";
  if (request.requiredDate) {
    try {
      const date = new Date(request.requiredDate);
      formattedDate = date.toLocaleDateString(undefined, { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      formattedDate = request.requiredDate;
    }
  }

  // Calculate days remaining
  const getStatusBadge = () => {
    if (request.status === 'fulfilled') {
      return <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Fulfilled</span>;
    }
    
    return <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold animate-pulse">Active Request</span>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "bg-white rounded-2xl p-6 shadow-sm border transition-shadow",
        request.status === 'active' ? "border-red-200 hover:shadow-md" : "border-slate-200 opacity-80"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-red-50 text-primary font-bold text-xl border border-red-100">
            {request.bloodGroup}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">{request.patientName}</h3>
            <div className="flex items-center gap-2 mt-1">
              {getStatusBadge()}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex items-start gap-3 text-sm text-slate-700">
          <Phone size={16} className="text-slate-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-medium text-slate-900 block">Contact Number</span>
            <span>{request.contactNumber}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3 text-sm text-slate-700">
          <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-medium text-slate-900 block">Hospital</span>
            <span>{request.hospital}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3 text-sm text-slate-700">
          <Calendar size={16} className="text-slate-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-medium text-slate-900 block">Required By</span>
            <span className={cn(isUrgent && "text-red-600 font-medium")}>{formattedDate}</span>
          </div>
        </div>
        
        {request.notes && (
          <div className="flex items-start gap-3 text-sm text-slate-700">
            <AlertCircle size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-slate-900 block">Additional Notes</span>
              <span className="text-slate-600 italic">{request.notes}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a 
          href={`tel:${request.contactNumber}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors shadow-sm"
        >
          <Phone size={16} />
          <span>Call Contact</span>
        </a>
      </div>
    </motion.div>
  );
}
