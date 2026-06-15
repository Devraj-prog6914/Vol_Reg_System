import { useState, useEffect } from 'react';
import { User, MapPin, Briefcase, Camera, UploadCloud, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const VolunteerProfile = () => {
  const [formData, setFormData] = useState({
    phone: '',
    dateOfBirth: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    country: '',
    skills: '',
    interests: '',
    experienceLevel: '',
    availability: '',
  });
  
  const [avatarPreview, setAvatarPreview] = useState('https://via.placeholder.com/150');
  const [resumeName, setResumeName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // Mock Fetching Profile Data from LocalStorage
    const fetchProfile = async () => {
      try {
        await new Promise(r => setTimeout(r, 600)); // Simulate loading
        
        const storedProfile = JSON.parse(localStorage.getItem('mockProfile'));
        if (storedProfile) {
          setFormData(storedProfile.formData);
          if (storedProfile.avatar) setAvatarPreview(storedProfile.avatar);
          if (storedProfile.resumeName) setResumeName(storedProfile.resumeName);
        }
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        toast.success("Avatar image loaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      toast.success(`${file.name} uploaded!`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(r => setTimeout(r, 1200)); // Mock network delay
      
      const profileData = {
        formData,
        avatar: avatarPreview !== 'https://via.placeholder.com/150' ? avatarPreview : null,
        resumeName: resumeName || null
      };

      // Save to localStorage so it persists across refreshes
      localStorage.setItem('mockProfile', JSON.stringify(profileData));
      
      toast.success('Profile saved successfully! Your changes are active.');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar & Basic Info */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            <User size={20} className="text-indigo-500" /> Basic Information
          </h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-4">
              <label htmlFor="avatar-upload" className="w-32 h-32 bg-gray-100 rounded-full border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer block">
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white" />
                </div>
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
              <span className="text-sm font-medium text-gray-500">Click photo to change</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            <MapPin size={20} className="text-indigo-500" /> Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* Volunteering Details */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            <Briefcase size={20} className="text-indigo-500" /> Volunteering Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Teaching, First Aid" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
              <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g. Environment, Education" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
              <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="e.g. Weekends, Evenings" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
          
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (PDF/Word)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex justify-center text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                    <span>{resumeName ? resumeName : 'Upload a file'}</span>
                    <input id="file-upload" name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="sr-only" />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">PDF, DOC up to 5MB</p>
                {resumeName && <p className="text-xs text-green-600 font-bold mt-2 block">✓ {resumeName} Saved</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors flex items-center gap-2 disabled:opacity-50">
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerProfile;
