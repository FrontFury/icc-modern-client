import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  User, Mail, IdCard, Lock, Eye, EyeOff, Building2, 
  UploadCloud, X, GraduationCap, ShieldCheck, ArrowRight, Sparkles 
} from 'lucide-react';
import SuccessModal from '../Shared/SuccessModal/SuccessModal';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure()
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      studentId: '',
      department: '',
      password: '',
      profileImage: null,
      agreedToTerms: false,
    },
  });

  const { registerUser, updateUserProfile } = useAuth();

  // Register profileImage manually for validation
  React.useEffect(() => {
    register('profileImage', { required: 'Profile picture is required' });
  }, [register]);

  // Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setValue('profileImage', file, { shouldValidate: true });

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setValue('profileImage', null, { shouldValidate: true });
  };

  // Fixed Async Submit Handler
const onSubmit = async (data) => {
    try {
      // 1. Upload profile image to ImgBB
      let imageUrl = '';
      if (data.profileImage) {
        const formData = new FormData();
        formData.append('image', data.profileImage);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        const res = await axios.post(image_API_URL, formData);
        imageUrl = res.data.data.display_url;
      }

      // 2. Create Firebase User
      await registerUser(data.email, data.password);

      // 3. Update Firebase Profile
      const userProfile = {
        displayName: data.fullName,
        photoURL: imageUrl,
      };
      await updateUserProfile(userProfile);

      // 4. Save User Info to MongoDB via secure POST request
      const userInfo = {
        name: data.fullName,
        email: data.email,
        studentId: data.studentId,
        department: data.department,
        photoURL: imageUrl
      };

      const userRes = await axiosSecure.post('/users', userInfo);

      if (userRes.data.insertedId || userRes.data.success) {

        setIsSuccessOpen(true);
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };
  const handleModalClose = () => {
    setIsSuccessOpen(false);
    navigate(location.state || '/', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 font-sans text-slate-800 selection:bg-blue-500 selection:text-white">
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={handleModalClose}
        title="Welcome to Ideal Commerce College"
        message="Your student profile has been created successfully."
        buttonText="Go to Portal"
      />
      {/* Left Column - Hero Visual Section */}
      <div className="relative lg:w-5/12 xl:w-1/2 bg-slate-950 text-white flex flex-col justify-between p-8 lg:p-12 xl:p-16 overflow-hidden min-h-[380px] lg:min-h-screen">
        {/* Background Image & Overlays */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          style={{ backgroundImage: `url('https://i.ibb.co.com/WpcNNKKJ/Sign-Up.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-500 text-white flex items-center justify-center font-black text-lg border border-white/20 shadow-xl shadow-blue-900/30">
              ICC
            </div>
            <div>
              <h2 className="text-base font-black tracking-wide uppercase text-white leading-none">
                Ideal Commerce College
              </h2>
              <p className="text-[10px] font-semibold text-blue-300/80 tracking-widest uppercase mt-1">
                Dhaka • EIIN: 134207
              </p>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 my-auto py-8 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-medium mb-6 backdrop-blur-md shadow-inner">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Farmgate Campus • Digital Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4 text-white">
            Forge your academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">future today.</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-md font-normal">
            Join a modern learning platform. Register your institutional account to seamlessly access coursework, examination details, and digital campus features.
          </p>
        </div>

        {/* Hero Footer Stats */}
        <div className="relative z-10 grid grid-cols-2 gap-6 pt-6 border-t border-white/10 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white">20+ Years</div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Academic Excellence</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white">15k+</div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Verified Alumni</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="lg:w-7/12 xl:w-1/2 flex flex-col justify-center mt-24 p-6 sm:p-10 lg:p-12 xl:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-xl mx-auto">
          
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Registration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please enter your institutional credentials to register on the student portal.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            
            {/* Profile Image Upload */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Profile Photo <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative group shrink-0">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-blue-500/30 shadow-md">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition shadow-md"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-200/60 text-slate-400 flex items-center justify-center shrink-0 border border-slate-300/60">
                    <User className="w-8 h-8" />
                  </div>
                )}

                <div className="flex-1">
                  <label
                    htmlFor="profileImageInput"
                    className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-dashed rounded-xl cursor-pointer transition-all duration-200 text-xs font-semibold ${
                      errors.profileImage 
                        ? 'border-red-300 bg-red-50/50 text-red-600 hover:bg-red-50' 
                        : 'border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600 shadow-sm'
                    }`}
                  >
                    <UploadCloud className="w-4 h-4 text-blue-500" />
                    <span>{imagePreview ? 'Change Photo' : 'Upload Student Photo'}</span>
                  </label>
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Supports JPG, PNG or WEBP (Max. 5MB)
                  </p>
                </div>
              </div>

              {errors.profileImage && (
                <p className="text-[11px] text-red-500 font-medium mt-2">
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Tanvir Hossain"
                  {...register('fullName', { required: 'Full name is required' })}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-[11px] text-red-500 font-medium mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email & Student ID Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="student@icc.edu.bd"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Student Roll / ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IdCard className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="ICC-2025-1042"
                    {...register('studentId', { required: 'Student ID is required' })}
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.studentId ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.studentId && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">{errors.studentId.message}</p>
                )}
              </div>
            </div>

            {/* Department Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department / Program <span className="text-red-500">*</span>
              </label>
              <select
                {...register('department', { required: 'Please select a department' })}
                className={`w-full px-3.5 py-2.5 bg-slate-50/50 border rounded-xl text-xs sm:text-sm text-slate-800 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.department ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
                }`}
              >
                <option value="" disabled>Select your department</option>
                <optgroup label="HSC Programs (Class XI & XII)">
                  <option value="hsc-business">HSC - Business Studies</option>
                  <option value="hsc-science">HSC - Science</option>
                  <option value="hsc-arts">HSC - Humanities / Arts</option>
                </optgroup>
              </select>
              {errors.department && (
                <p className="text-[11px] text-red-500 font-medium mt-1">{errors.department.message}</p>
              )}
            </div>

            {/* Create Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 chars (A-z, 0-9, !@#)"
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Password must contain 8+ chars, uppercase, lowercase, number, and special symbol',
                    },
                  })}
                  className={`w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-blue-600 focus:ring-blue-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-500 font-medium mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Terms Verification */}
            <div className="pt-1">
              <div className="flex items-start gap-2.5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register('agreedToTerms', {
                    required: 'You must agree to the institutional terms',
                  })}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
                  I verify that I am an active student of Ideal Commerce College and agree to the{' '}
                  <a href="#terms" className="text-blue-600 font-semibold hover:underline">Institutional Terms</a> and{' '}
                  <a href="#privacy" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>.
                </label>
              </div>
              {errors.agreedToTerms && (
                <p className="text-[11px] text-red-500 font-medium mt-1">{errors.agreedToTerms.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.99] mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Complete Sign Up'}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span>
              </div>
            </div>

            <SocialLogin />
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Already registered?{' '}
            <button
              type="button"
              onClick={() => navigate('/signIn', { state: location.state })}
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}