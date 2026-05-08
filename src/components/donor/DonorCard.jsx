import { motion } from 'framer-motion';
import { Phone, MapPin, Building, GraduationCap, Clock } from 'lucide-react';
import { cn } from '../../utils/utils';

export default function DonorCard({ donor, onContactClick }) {
  const isAvailable = donor.available;
  
  // Format last donation date
  let formattedDate = "Never";
  if (donor.lastDonationDate) {
    try {
      const date = new Date(donor.lastDonationDate);
      formattedDate = date.toLocaleDateString();
    } catch {
      formattedDate = "Invalid date";
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden"
    >
      <div className={cn(
        "absolute top-0 right-0 w-2 h-full",
        isAvailable ? "bg-green-500" : "bg-slate-300"
      )} />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900">{donor.fullName}</h3>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <GraduationCap size={14} />
            <span>{donor.department} (Batch {donor.session})</span>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold text-lg border border-primary/20">
          {donor.bloodGroup}
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Building size={14} className="text-slate-400" />
          <span>Student ID: {donor.studentId}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Phone size={14} className="text-slate-400" />
          <span>{donor.phone || 'Not available'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={14} className="text-slate-400" />
          <span>{donor.address || 'Location not specified'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock size={14} className="text-slate-400" />
          <span>Last Donation: {formattedDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2.5 h-2.5 rounded-full",
            isAvailable ? "bg-green-500" : "bg-slate-300"
          )} />
          <span className={cn(
            "text-sm font-medium",
            isAvailable ? "text-green-700" : "text-slate-500"
          )}>
            {isAvailable ? "Available to donate" : "Currently unavailable"}
          </span>
        </div>
        
        <button 
          onClick={() => onContactClick(donor)}
          disabled={!isAvailable}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
            isAvailable 
              ? "bg-primary text-white hover:bg-primary-dark shadow-sm" 
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          <Phone size={14} />
          <span>Contact</span>
        </button>
      </div>
    </motion.div>
  );
}
