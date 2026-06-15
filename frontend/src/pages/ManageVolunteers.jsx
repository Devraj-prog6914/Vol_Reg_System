import { useState } from 'react';
import { Search, Filter, Check, X, Eye } from 'lucide-react';

const mockVolunteers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', skills: ['Teaching', 'First Aid'], status: 'pending', hours: 0 },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', skills: ['Driving', 'Logistics'], status: 'approved', hours: 45 },
  { id: 3, name: 'Carol White', email: 'carol@example.com', skills: ['Web Dev', 'Design'], status: 'pending', hours: 0 },
];

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState(mockVolunteers);

  const handleStatusChange = (id, newStatus) => {
    setVolunteers(volunteers.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Volunteers</h2>
          <p className="text-gray-500 text-sm mt-1">Review, approve, and manage your volunteer community.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search volunteers by name or email..." 
            className="w-full pl-10 px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Volunteers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Volunteer</th>
                <th className="px-6 py-4 font-medium">Skills</th>
                <th className="px-6 py-4 font-medium">Total Hours</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {volunteers.map(volunteer => (
                <tr key={volunteer.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{volunteer.name}</div>
                    <div className="text-gray-500 text-xs">{volunteer.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{volunteer.hours} hrs</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      volunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      volunteer.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      {volunteer.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(volunteer.id, 'approved')}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                            <Check size={18} />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(volunteer.id, 'rejected')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageVolunteers;
