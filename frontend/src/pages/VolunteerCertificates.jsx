import { useState } from 'react';
import { Award, Download, Calendar as CalendarIcon, Clock } from 'lucide-react';

const mockCertificates = [
  { id: 1, event: 'Beach Cleanup', date: '2026-07-15', hours: 4.5, uniqueId: 'CERT-A1B2C3' },
  { id: 2, event: 'Math Tutoring', date: '2026-07-20', hours: 2.0, uniqueId: 'CERT-X9Y8Z7' },
];

const VolunteerCertificates = () => {
  const [certificates] = useState(mockCertificates);

  const handleDownload = (id) => {
    console.log('Downloading certificate', id);
    // Logic to call API and download PDF
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Certificates</h2>
        <p className="text-gray-500 text-sm mt-1">View and download your earned certificates for completed events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
            {/* Background design element */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-50 rounded-full opacity-50"></div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="bg-indigo-100 text-indigo-600 p-4 rounded-2xl">
                <Award size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{cert.event}</h3>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  ID: {cert.uniqueId}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 relative z-10 flex-grow">
              <div className="flex items-center text-gray-600 text-sm">
                <CalendarIcon size={16} className="mr-3 text-gray-400" /> Issued: {cert.date}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock size={16} className="mr-3 text-gray-400" /> Hours Credited: {cert.hours}
              </div>
            </div>

            <button 
              onClick={() => handleDownload(cert.id)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl font-medium transition-colors relative z-10"
            >
              <Download size={18} /> Download PDF
            </button>
          </div>
        ))}

        {certificates.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-gray-100 border-dashed text-center">
            <Award size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Certificates Yet</h3>
            <p className="text-gray-500 mt-1">Complete your first event to earn a certificate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerCertificates;
