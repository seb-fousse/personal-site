import * as postmark from "postmark";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import CONTACT_PLACEHOLDERS from "@/public/data/contact_placeholders.json";

const ContactForm = ({ setEmailSentSuccess }) => {
  const [placeholder, setPlaceholder] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(()=>{
    const placeholderData = CONTACT_PLACEHOLDERS;
    const randomIndex = Math.floor(Math.random() * placeholderData.length);
    setPlaceholder(placeholderData[randomIndex]);
  }, []);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = 'What should I call you?';
    }
    if (!formData.email) {
      errors.email = 'Where can I contact you?';
    }
    if (!formData.subject) {
      errors.subject = 'What are we chatting about?';
    }
    if (formData.message.length > 128) {
      errors.message = 'TLDR?';
    }
    if (!formData.message) {
      errors.message = 'Got nothing to say?';
    }
    if (formData.message.length > 1024) {
      errors.message = 'TLDR?';
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting to send email')

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      console.log('Contact form has validation errors')
      return;
    }

    // Can only submit email form every 10 seconds
    if(submitted) return;

    setFormErrors({});
    setSubmitError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
        setSubmitted(true);
        setEmailSentSuccess(true);
        setTimeout(() => {
          setSubmitted(false); 
          setEmailSentSuccess(false);
        }, 7000); // 7 seconds
        setTimeout(() => setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        }, 7000))
      } else {
        const data = await response.json();
        setSubmitError(data.message || 'Failed to send email');
        console.log('Error sending email: ', submitError);
      }
    } catch (error) {
      setSubmitError('Failed to send email');
      console.log('Error sending email: ', submitError, error);
    }
  }

  return (
    <div className="text-center">
      <form className="w-full max-w-xl inline-block p-4 text-left" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-neutral-800">First name</label>
            <div className="mt-1">
              <input 
                type="text" 
                name="first-name"
                id="first-name"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                autoComplete="given-name"
                className={`mt-1 block w-full px-3 py-2 border-2 ${formErrors.firstName ? 'border-red-500' : 'border-neutral-300'} rounded-sm focus:outline-none focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm bg-orange-100 autofill:!bg-orange-100`}
                placeholder={placeholder.firstName}
              />
              {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6  text-gray-900">Last name</label>
            <div className="mt-1">
              <input 
                type="text" 
                name="last-name" 
                id="last-name" 
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                autoComplete="family-name" 
                className="mt-1 block w-full px-3 py-2 border-2 border-neutral-300 rounded-sm focus:outline-none focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm bg-orange-100"
                placeholder={placeholder.lastName}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
            <div className="mt-1">
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                autoComplete="email" 
                className={`mt-1 block w-full px-3 py-2 border-2 ${formErrors.firstName ? 'border-red-500' : 'border-neutral-300'} rounded-sm focus:outline-none focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm bg-orange-100`}
                placeholder={placeholder.email}
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900">Subject</label>
            <div className="mt-1">
              <input 
                type="text"
                name="subject" 
                id="subject" 
                value={formData.subject} 
                onChange={(e) => handleChange('subject', e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border-2 ${formErrors.firstName ? 'border-red-500' : 'border-neutral-300'} rounded-sm focus:outline-none focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm bg-orange-100`}
                placeholder={placeholder.subject}
              />
              {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Message</label>
            <div className="mt-1">
              <textarea 
                name="message" 
                id="message" 
                rows="4" 
                value={formData.message} 
                onChange={(e) => handleChange('message', e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border-2 ${formErrors.firstName ? 'border-red-500' : 'border-neutral-300'} rounded-sm focus:outline-none focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm bg-orange-100`}
                placeholder={placeholder.message}>
              </textarea>
              {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <motion.button 
            type="submit" 
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgb(82, 82, 82)' }}
            whileTap={{ 
              scale: 0.95 
            }}
            transition={{
              duration: 0.2
            }}
            className="block w-full rounded-sm bg-neutral-800 px-3.5 py-2.5 text-center text-sm font-semibold text-orange-100 shadow-sm"
          >
            Let's talk
          </motion.button>
        </div>
      </form>
      {submitError && <p className="text-neutral-800 text-sm mt-3">
        <span className="font-bold">{submitError}</span>
        <span> - consider emailing directly at <a className="hover:underline hover:cursor-pointer" href="mailto:me@sebf.xyz">me@sebf.xyz</a></span>
      </p>}
    </div>
  );
};

export default ContactForm;