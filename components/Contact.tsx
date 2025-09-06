
import React, { useState, useRef } from 'react';
import { PhotoIcon, SpinnerIcon } from './IconComponents';

// This tells TypeScript that 'emailjs' is a global variable
// provided by the script tag in index.html
declare const emailjs: any;

// IMPORTANT: To enable image uploads, you need to register a new application
// on Imgur to get a Client ID.
// 1. Go to https://api.imgur.com/oauth2/addclient
// 2. Choose "Anonymous usage without user authorization"
// 3. Enter an app name and email. For Authorization callback URL, you can use any valid URL (e.g., your website).
// 4. Copy the "Client ID" and paste it below, replacing 'YOUR_IMGUR_CLIENT_ID'.
const IMGUR_CLIENT_ID = 'YOUR_IMGUR_CLIENT_ID';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    appointmentDate: '',
    appointmentTime: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    appointmentDate: '',
    appointmentTime: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setFileError('File size cannot exceed 10MB.');
        setSelectedFile(null);
        e.target.value = ''; // Clear the file input
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const validate = (): boolean => {
    const errors = { name: '', phone: '', email: '', service: '', appointmentDate: '', appointmentTime: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
      isValid = false;
    }

    const phoneRegex = /^(?:\+971|0)?5[0-9]{8}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid UAE phone number.';
      isValid = false;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!formData.service) {
      errors.service = 'Please select a service.';
      isValid = false;
    }
    
    if (!formData.appointmentDate) {
      errors.appointmentDate = 'Please select a date.';
      isValid = false;
    }
    
    if (!formData.appointmentTime) {
      errors.appointmentTime = 'Please select a time.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ message: '', type: '' });
    if (!validate() || fileError) {
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = '';

      // Step 1: Upload image to Imgur if a file is selected
      if (selectedFile) {
        if (IMGUR_CLIENT_ID === 'YOUR_IMGUR_CLIENT_ID') {
          setFormStatus({ message: 'Image upload is not configured. Please contact the site administrator.', type: 'error' });
          console.error("Imgur Client ID is not set. Please update it in components/Contact.tsx.");
          setIsSubmitting(false);
          return;
        }

        const uploadFormData = new FormData();
        uploadFormData.append('image', selectedFile);

        const response = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
          },
          body: uploadFormData,
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
          imageUrl = result.data.link;
        } else {
          throw new Error(result.data?.error || 'Failed to upload image to Imgur.');
        }
      }

      // Step 2: Prepare template parameters for EmailJS
      // IMPORTANT: Make sure your EmailJS template includes `{{image_url}}` to display the link.
      const templateParams = {
        from_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        appointment_date: formData.appointmentDate,
        appointment_time: formData.appointmentTime,
        message: formData.message,
        image_url: imageUrl, // This will be an empty string if no file was uploaded
      };

      // --- EmailJS Configuration ---
      const SERVICE_ID = 'service_g6ff6ym';
      const TEMPLATE_ID = 'template_lrsgxr3';
      const PUBLIC_KEY = 'TBN1I_h2KqZ-xrzE7';

      // Step 3: Send email using EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      console.log('SUCCESS!');
      setFormStatus({ message: 'Thank you for your appointment request! We will get back to you shortly.', type: 'success' });
      
      form.current?.reset();
      setFormData({ name: '', phone: '', email: '', service: '', appointmentDate: '', appointmentTime: '', message: '' });
      setFormErrors({ name: '', phone: '', email: '', service: '', appointmentDate: '', appointmentTime: ''});
      setSelectedFile(null);
      setFileError('');

    } catch (error: any) {
      console.error('FAILED...', error);
      const errorMessage = error.text || (error.message ? `Request failed: ${error.message}` : 'Failed to send request. Please try again later.');
      setFormStatus({ message: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full p-3 bg-gray-100 dark:bg-dark-secondary border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent placeholder-gray-500 disabled:opacity-50 text-gray-900 dark:text-gray-200";
  const selectClasses = `${inputClasses} appearance-none pr-10`;
  const selectStyle = {
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
      backgroundPosition: `right 0.75rem center`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `1.5em 1.5em`,
  };

  return (
    <section id="contact" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark dark:text-white">Contact Us & Location</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Get in touch for a quote or visit our branch in Ajman.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-2/3 bg-white dark:bg-dark-secondary p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-dark dark:text-white mb-6">Book an Appointment</h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={inputClasses} disabled={isSubmitting} required />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputClasses} disabled={isSubmitting} required />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
              </div>
              <div>
                <input type="email" name="email" placeholder="Email Address (Optional)" value={formData.email} onChange={handleChange} className={inputClasses} disabled={isSubmitting} />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <div className="relative">
                  <select name="service" value={formData.service} onChange={handleChange} className={selectClasses} style={selectStyle} disabled={isSubmitting} required>
                    <option value="">Select a Service</option>
                    <option value="diagnostics">Engine Diagnostics</option>
                    <option value="oil_change">Oil Change</option>
                    <option value="brakes">Brake Services</option>
                    <option value="ac_repair">A/C Repair</option>
                    <option value="tires">Tire Services</option>
                    <option value="detailing">Detailing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {formErrors.service && <p className="text-red-500 text-sm mt-1">{formErrors.service}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Preferred Date</label>
                  <input type="date" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className={inputClasses} min={new Date().toISOString().split("T")[0]} disabled={isSubmitting} required />
                  {formErrors.appointmentDate && <p className="text-red-500 text-sm mt-1">{formErrors.appointmentDate}</p>}
                </div>
                <div>
                  <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Preferred Time</label>
                  <input type="time" id="appointmentTime" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} className={inputClasses} disabled={isSubmitting} required />
                  {formErrors.appointmentTime && <p className="text-red-500 text-sm mt-1">{formErrors.appointmentTime}</p>}
                </div>
              </div>

               <div>
                <label htmlFor="vehiclePhotos" className="block text-sm font-medium text-gray-800 dark:text-gray-300">Upload Photo of Issue (Optional)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl hover:border-primary dark:hover:border-accent transition-colors duration-300">
                    <div className="space-y-1 text-center">
                        <PhotoIcon />
                        <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                            <label htmlFor="vehiclePhotos" className={`relative cursor-pointer bg-white dark:bg-dark-secondary rounded-md font-medium text-primary dark:text-accent hover:text-primary-dark dark:hover:text-yellow-300 transition-colors duration-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary dark:focus-within:ring-accent ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}>
                                <span>Upload a file</span>
                                <input id="vehiclePhotos" name="vehiclePhotos" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" disabled={isSubmitting} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        {selectedFile && !fileError && <p className="text-sm text-green-600 mt-2 font-semibold">File selected: {selectedFile.name}</p>}
                        {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
                    </div>
                </div>
              </div>

              <div>
                <textarea name="message" placeholder="Additional Message (Optional)" rows={4} value={formData.message} onChange={handleChange} className={inputClasses} disabled={isSubmitting}></textarea>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <SpinnerIcon className="h-5 w-5 mr-3" />
                        <span>Sending Request...</span>
                    </>
                ) : (
                    <span>Send Request</span>
                )}
              </button>
              {formStatus.message && (
                <p className={`mt-4 text-center font-semibold ${formStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                    {formStatus.message}
                </p>
              )}
            </form>
          </div>

          {/* Location Info */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-dark-secondary p-8 rounded-xl shadow-lg h-full flex flex-col">
              <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">Ajman Branch</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">37 41 St, Al Jurf Industrial 1, Ajman, UAE</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Phone:</strong> +971 50 836 1799 / +971 55 587 2704</p>
              <div className="text-gray-700 dark:text-gray-300 mb-6">
                <p className="font-bold">Hours:</p>
                <p>Saturday - Thursday: 8AM - 1PM, 3PM - 9PM</p>
                <p>Friday: 3PM - 9PM</p>
              </div>
               <div className="mt-auto">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.832966579044!2d55.480837!3d25.3768139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f583568911075%3A0x6a2333b21b016259!2sAWLAD%20MESHREKY%20AUTO%20MAINT%20%26%20REP%20GARAGE!5e0!3m2!1sen!2sae!4v1721216000000!5m2!1sen!2sae"
                    width="100%" 
                    height="250" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy"
                    title="Garage Location"
                    className="rounded-xl shadow-md filter dark:invert"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
