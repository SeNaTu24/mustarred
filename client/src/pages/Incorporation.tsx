import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, Check, AlertCircle, Building, Users, FileText } from 'lucide-react';

interface FormData {
  proposedNames: string[];
  companyObjects: string;
  companyEmail: string;
  companyAddress: string;
  companyPhone: string;
  shareholders: Array<{
    name: string;
    email: string;
    address: string;
    phone: string;
    shareholding: string;
  }>;
  shareCapital: string;
  shareStructure: string;
  directors: Array<{
    name: string;
    address: string;
    email: string;
    phone: string;
  }>;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function Incorporation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    proposedNames: ['', ''],
    companyObjects: '',
    companyEmail: '',
    companyAddress: '',
    companyPhone: '',
    shareholders: [{ name: '', email: '', address: '', phone: '', shareholding: '' }],
    shareCapital: '',
    shareStructure: '',
    directors: [{ name: '', address: '', email: '', phone: '' }]
  });
  const [files, setFiles] = useState<{ [key: string]: File[] }>({
    signatures: [],
    identifications: []
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { id: 1, title: 'Company Details', icon: Building },
    { id: 2, title: 'Shareholders', icon: Users },
    { id: 3, title: 'Directors', icon: Users },
    { id: 4, title: 'Documents', icon: FileText }
  ];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (step === 1) {
      // Company names validation
      const validNames = formData.proposedNames.filter(name => name.trim().length > 0);
      if (validNames.length < 2) {
        newErrors.proposedNames = 'At least 2 company names are required';
      }

      // Company objects validation
      if (!formData.companyObjects.trim()) {
        newErrors.companyObjects = 'Company objects are required';
      } else if (formData.companyObjects.trim().length < 20) {
        newErrors.companyObjects = 'Please provide more detailed company objects (minimum 20 characters)';
      }

      // Email validation
      if (!formData.companyEmail.trim()) {
        newErrors.companyEmail = 'Company email is required';
      } else if (!validateEmail(formData.companyEmail)) {
        newErrors.companyEmail = 'Please enter a valid email address';
      }

      // Phone validation
      if (!formData.companyPhone.trim()) {
        newErrors.companyPhone = 'Company phone is required';
      } else if (!validatePhone(formData.companyPhone)) {
        newErrors.companyPhone = 'Please enter a valid phone number';
      }

      // Address validation
      if (!formData.companyAddress.trim()) {
        newErrors.companyAddress = 'Company address is required';
      } else if (formData.companyAddress.trim().length < 10) {
        newErrors.companyAddress = 'Please provide a complete address';
      }
    }

    if (step === 2) {
      // Shareholders validation
      formData.shareholders.forEach((shareholder, index) => {
        if (!shareholder.name.trim()) {
          newErrors[`shareholder_${index}_name`] = 'Shareholder name is required';
        }
        if (!shareholder.email.trim()) {
          newErrors[`shareholder_${index}_email`] = 'Shareholder email is required';
        } else if (!validateEmail(shareholder.email)) {
          newErrors[`shareholder_${index}_email`] = 'Invalid email address';
        }
        if (!shareholder.phone.trim()) {
          newErrors[`shareholder_${index}_phone`] = 'Phone number is required';
        } else if (!validatePhone(shareholder.phone)) {
          newErrors[`shareholder_${index}_phone`] = 'Invalid phone number';
        }
        if (!shareholder.address.trim()) {
          newErrors[`shareholder_${index}_address`] = 'Address is required';
        }
        if (!shareholder.shareholding.trim()) {
          newErrors[`shareholder_${index}_shareholding`] = 'Shareholding percentage is required';
        } else if (isNaN(Number(shareholder.shareholding)) || Number(shareholder.shareholding) <= 0 || Number(shareholder.shareholding) > 100) {
          newErrors[`shareholder_${index}_shareholding`] = 'Enter a valid percentage (1-100)';
        }
      });

      // Share capital validation
      if (!formData.shareCapital.trim()) {
        newErrors.shareCapital = 'Share capital is required';
      }

      if (!formData.shareStructure.trim()) {
        newErrors.shareStructure = 'Share structure is required';
      }
    }

    if (step === 3) {
      // Directors validation
      formData.directors.forEach((director, index) => {
        if (!director.name.trim()) {
          newErrors[`director_${index}_name`] = 'Director name is required';
        }
        if (!director.email.trim()) {
          newErrors[`director_${index}_email`] = 'Director email is required';
        } else if (!validateEmail(director.email)) {
          newErrors[`director_${index}_email`] = 'Invalid email address';
        }
        if (!director.phone.trim()) {
          newErrors[`director_${index}_phone`] = 'Phone number is required';
        } else if (!validatePhone(director.phone)) {
          newErrors[`director_${index}_phone`] = 'Invalid phone number';
        }
        if (!director.address.trim()) {
          newErrors[`director_${index}_address`] = 'Address is required';
        }
      });
    }

    if (step === 4) {
      if (files.signatures.length === 0) {
        newErrors.signatures = 'Signature photos are required';
      }
      if (files.identifications.length === 0) {
        newErrors.identifications = 'Identification documents are required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const addShareholder = () => {
    setFormData(prev => ({
      ...prev,
      shareholders: [...prev.shareholders, { name: '', email: '', address: '', phone: '', shareholding: '' }]
    }));
  };

  const addDirector = () => {
    setFormData(prev => ({
      ...prev,
      directors: [...prev.directors, { name: '', address: '', email: '', phone: '' }]
    }));
  };

  const handleFileUpload = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...uploadedFiles]
    }));
    // Clear file upload errors
    if (errors[type]) {
      setErrors(prev => ({ ...prev, [type]: '' }));
    }
  };

  const submitForm = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for file uploads
      const formDataWithFiles = new FormData();
      
      // Add all form fields
      formDataWithFiles.append('_subject', 'Company Incorporation Request');
      formDataWithFiles.append('_captcha', 'false');
      formDataWithFiles.append('Name', formData.proposedNames[0] || 'Not provided');
      formDataWithFiles.append('Company Names', formData.proposedNames.filter(name => name.trim()).join(', '));
      formDataWithFiles.append('Company Objects', formData.companyObjects);
      formDataWithFiles.append('Company Email', formData.companyEmail);
      formDataWithFiles.append('Company Phone', formData.companyPhone);
      formDataWithFiles.append('Company Address', formData.companyAddress);
      formDataWithFiles.append('Share Capital', formData.shareCapital);
      formDataWithFiles.append('Share Structure', formData.shareStructure);
      formDataWithFiles.append('Shareholders', formData.shareholders.map((s, i) => 
        `${i+1}. ${s.name} (${s.email}) - ${s.shareholding}% shares`
      ).join('\n'));
      formDataWithFiles.append('Directors', formData.directors.map((d, i) => 
        `${i+1}. ${d.name} (${d.email})`
      ).join('\n'));
      formDataWithFiles.append('Date', new Date().toLocaleDateString());
      
      // Add signature files
      files.signatures.forEach((file, index) => {
        formDataWithFiles.append(`signature_${index + 1}`, file);
      });
      
      // Add identification files
      files.identifications.forEach((file, index) => {
        formDataWithFiles.append(`identification_${index + 1}`, file);
      });

      const result = await fetch('https://formsubmit.co/olusesisamuel04@gmail.com', {
        method: 'POST',
        body: formDataWithFiles // Don't set Content-Type header, let browser set it
      });

      if (result.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error(`HTTP ${result.status}`);
      }
    } catch (error) {
      console.error('❌ FormSubmit failed:', error);
      alert('Failed to send email. Please try again or contact us directly.');
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your incorporation request has been sent to our team. We'll review your information and contact you within 24 hours.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Close Window
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Incorporation</h1>
          <p className="text-gray-600">
            Complete your company registration with our step-by-step process
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      Step {step.id}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">
              {steps.find(s => s.id === currentStep)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Step 1: Company Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                    Proposed Company Names (minimum 2) *
                  </label>
                  {formData.proposedNames.map((name, index) => (
                    <div key={index} className="mb-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          const newNames = [...formData.proposedNames];
                          newNames[index] = e.target.value;
                          setFormData(prev => ({ ...prev, proposedNames: newNames }));
                          if (errors.proposedNames) setErrors(prev => ({ ...prev, proposedNames: '' }));
                        }}
                        placeholder={`Company name ${index + 1}`}
                        className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.proposedNames ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      />
                    </div>
                  ))}
                  {errors.proposedNames && (
                    <div className="flex items-center text-red-600 text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.proposedNames}
                    </div>
                  )}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, proposedNames: [...prev.proposedNames, ''] }))}
                    className="mt-2"
                  >
                    Add Another Name
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                    Objects of the Company *
                  </label>
                  <textarea
                    value={formData.companyObjects}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, companyObjects: e.target.value }));
                      if (errors.companyObjects) setErrors(prev => ({ ...prev, companyObjects: '' }));
                    }}
                    placeholder="Describe what your company will do in detail..."
                    className={`w-full p-4 border-2 rounded-lg h-32 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.companyObjects ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                  {errors.companyObjects && (
                    <div className="flex items-center text-red-600 text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.companyObjects}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Company Email *</label>
                    <input
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, companyEmail: e.target.value }));
                        if (errors.companyEmail) setErrors(prev => ({ ...prev, companyEmail: '' }));
                      }}
                      placeholder="company@example.com"
                      className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.companyEmail ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    {errors.companyEmail && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.companyEmail}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Company Phone *</label>
                    <input
                      type="tel"
                      value={formData.companyPhone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, companyPhone: e.target.value }));
                        if (errors.companyPhone) setErrors(prev => ({ ...prev, companyPhone: '' }));
                      }}
                      placeholder="+234 xxx xxx xxxx"
                      className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.companyPhone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    {errors.companyPhone && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.companyPhone}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                    Company Physical Address *
                  </label>
                  <textarea
                    value={formData.companyAddress}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, companyAddress: e.target.value }));
                      if (errors.companyAddress) setErrors(prev => ({ ...prev, companyAddress: '' }));
                    }}
                    placeholder="House number, street name, local government area, city, state"
                    className={`w-full p-4 border-2 rounded-lg h-24 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.companyAddress ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                  {errors.companyAddress && (
                    <div className="flex items-center text-red-600 text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.companyAddress}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Shareholders */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-4 text-gray-700">Shareholders Information *</label>
                  {formData.shareholders.map((shareholder, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-xl p-6 mb-6 bg-gradient-to-r from-gray-50 to-white">
                      <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        Shareholder {index + 1}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            value={shareholder.name}
                            onChange={(e) => {
                              const newShareholders = [...formData.shareholders];
                              newShareholders[index].name = e.target.value;
                              setFormData(prev => ({ ...prev, shareholders: newShareholders }));
                              if (errors[`shareholder_${index}_name`]) {
                                setErrors(prev => ({ ...prev, [`shareholder_${index}_name`]: '' }));
                              }
                            }}
                            placeholder="Full Name"
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors[`shareholder_${index}_name`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors[`shareholder_${index}_name`] && (
                            <div className="flex items-center text-red-600 text-xs mt-1">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {errors[`shareholder_${index}_name`]}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="email"
                            value={shareholder.email}
                            onChange={(e) => {
                              const newShareholders = [...formData.shareholders];
                              newShareholders[index].email = e.target.value;
                              setFormData(prev => ({ ...prev, shareholders: newShareholders }));
                              if (errors[`shareholder_${index}_email`]) {
                                setErrors(prev => ({ ...prev, [`shareholder_${index}_email`]: '' }));
                              }
                            }}
                            placeholder="Email Address"
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors[`shareholder_${index}_email`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors[`shareholder_${index}_email`] && (
                            <div className="flex items-center text-red-600 text-xs mt-1">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {errors[`shareholder_${index}_email`]}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="tel"
                            value={shareholder.phone}
                            onChange={(e) => {
                              const newShareholders = [...formData.shareholders];
                              newShareholders[index].phone = e.target.value;
                              setFormData(prev => ({ ...prev, shareholders: newShareholders }));
                              if (errors[`shareholder_${index}_phone`]) {
                                setErrors(prev => ({ ...prev, [`shareholder_${index}_phone`]: '' }));
                              }
                            }}
                            placeholder="Phone Number"
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors[`shareholder_${index}_phone`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors[`shareholder_${index}_phone`] && (
                            <div className="flex items-center text-red-600 text-xs mt-1">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {errors[`shareholder_${index}_phone`]}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="number"
                            value={shareholder.shareholding}
                            onChange={(e) => {
                              const newShareholders = [...formData.shareholders];
                              newShareholders[index].shareholding = e.target.value;
                              setFormData(prev => ({ ...prev, shareholders: newShareholders }));
                              if (errors[`shareholder_${index}_shareholding`]) {
                                setErrors(prev => ({ ...prev, [`shareholder_${index}_shareholding`]: '' }));
                              }
                            }}
                            placeholder="Shareholding %"
                            min="1"
                            max="100"
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors[`shareholder_${index}_shareholding`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors[`shareholder_${index}_shareholding`] && (
                            <div className="flex items-center text-red-600 text-xs mt-1">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {errors[`shareholder_${index}_shareholding`]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <textarea
                          value={shareholder.address}
                          onChange={(e) => {
                            const newShareholders = [...formData.shareholders];
                            newShareholders[index].address = e.target.value;
                            setFormData(prev => ({ ...prev, shareholders: newShareholders }));
                            if (errors[`shareholder_${index}_address`]) {
                              setErrors(prev => ({ ...prev, [`shareholder_${index}_address`]: '' }));
                            }
                          }}
                          placeholder="Physical Address"
                          className={`w-full p-3 border-2 rounded-lg h-20 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors[`shareholder_${index}_address`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                        />
                        {errors[`shareholder_${index}_address`] && (
                          <div className="flex items-center text-red-600 text-xs mt-1">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors[`shareholder_${index}_address`]}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addShareholder} className="w-full">
                    Add Another Shareholder
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Share Capital *</label>
                    <input
                      type="text"
                      value={formData.shareCapital}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, shareCapital: e.target.value }));
                        if (errors.shareCapital) setErrors(prev => ({ ...prev, shareCapital: '' }));
                      }}
                      placeholder="e.g., ₦1,000,000"
                      className={`w-full p-4 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.shareCapital ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    {errors.shareCapital && (
                      <div className="flex items-center text-red-600 text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.shareCapital}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Share Structure *</label>
                  <textarea
                    value={formData.shareStructure}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, shareStructure: e.target.value }));
                      if (errors.shareStructure) setErrors(prev => ({ ...prev, shareStructure: '' }));
                    }}
                    placeholder="Describe the proposed share structure..."
                    className={`w-full p-4 border-2 rounded-lg h-24 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.shareStructure ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                  {errors.shareStructure && (
                    <div className="flex items-center text-red-600 text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.shareStructure}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Directors */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-4 text-gray-700">Directors Information *</label>
                  {formData.directors.map((director, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-xl p-6 mb-6 bg-gradient-to-r from-gray-50 to-white">
                      <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        Director {index + 1}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            value={director.name}
                            onChange={(e) => {
                              const newDirectors = [...formData.directors];
                              newDirectors[index].name = e.target.value;
                              setFormData(prev => ({ ...prev, directors: newDirectors }));
                              if (errors[`director_${index}_name`]) {
                                setErrors(prev => ({ ...prev, [`director_${index}_name`]: '' }));
                              }
                            }}
                            placeholder="Full Name"
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors[`director_${index}_name`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors[`director_${index}_name`] && (
                            <div className="flex items-center text-red-600 text-xs mt-1">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {errors[`director_${index}_name`]}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="email"
                            value={director.email}
                            onChange={(e) => {
                              const newDirectors = [...formData.directors];
                              newDirectors[index].email = e.target.value;
                              setFormData(prev => ({ ...prev, directors: newDirectors }));
                              if (errors[`director_${index}_email`]) {
                                setErrors(prev => ({ ...prev, [`director_${index}_email`]: '' }));
                              }
                            }}
                            placeholder="Email Address"
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors[`director_${index}_email`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors[`director_${index}_email`] && (
                            <div className="flex items-center text-red-600 text-xs mt-1">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {errors[`director_${index}_email`]}
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="tel"
                            value={director.phone}
                            onChange={(e) => {
                              const newDirectors = [...formData.directors];
                              newDirectors[index].phone = e.target.value;
                              setFormData(prev => ({ ...prev, directors: newDirectors }));
                              if (errors[`director_${index}_phone`]) {
                                setErrors(prev => ({ ...prev, [`director_${index}_phone`]: '' }));
                              }
                            }}
                            placeholder="Phone Number"
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors[`director_${index}_phone`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {errors[`director_${index}_phone`] && (
                            <div className="flex items-center text-red-600 text-xs mt-1">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {errors[`director_${index}_phone`]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <textarea
                          value={director.address}
                          onChange={(e) => {
                            const newDirectors = [...formData.directors];
                            newDirectors[index].address = e.target.value;
                            setFormData(prev => ({ ...prev, directors: newDirectors }));
                            if (errors[`director_${index}_address`]) {
                              setErrors(prev => ({ ...prev, [`director_${index}_address`]: '' }));
                            }
                          }}
                          placeholder="Physical Address"
                          className={`w-full p-3 border-2 rounded-lg h-20 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors[`director_${index}_address`] ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                        />
                        {errors[`director_${index}_address`] && (
                          <div className="flex items-center text-red-600 text-xs mt-1">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors[`director_${index}_address`]}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addDirector} className="w-full">
                    Add Another Director
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold mb-4 text-gray-700">
                    Signatures of Directors and Shareholders *
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 hover:border-blue-400 ${
                    errors.signatures ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:bg-blue-50'
                  }`}>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2 font-medium">
                      Upload photographs with white background
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Accepted formats: JPG, PNG, JPEG (Max 5MB each)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload('signatures', e)}
                      className="hidden"
                      id="signatures"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="hover:bg-blue-50"
                      onClick={() => document.getElementById('signatures')?.click()}
                    >
                      Choose Files
                    </Button>
                    {files.signatures.length > 0 && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ {files.signatures.length} file(s) selected
                        </p>
                        <div className="text-xs text-green-600 mt-1">
                          {files.signatures.map(file => file.name).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.signatures && (
                    <div className="flex items-center text-red-600 text-sm mt-2">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.signatures}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-4 text-gray-700">
                    Identification Documents *
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 hover:border-blue-400 ${
                    errors.identifications ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:bg-blue-50'
                  }`}>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2 font-medium">
                      International passport, National ID, or Driver's license
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Accepted formats: JPG, PNG, PDF (Max 5MB each)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('identifications', e)}
                      className="hidden"
                      id="identifications"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="hover:bg-blue-50"
                      onClick={() => document.getElementById('identifications')?.click()}
                    >
                      Choose Files
                    </Button>
                    {files.identifications.length > 0 && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ {files.identifications.length} file(s) selected
                        </p>
                        <div className="text-xs text-green-600 mt-1">
                          {files.identifications.map(file => file.name).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.identifications && (
                    <div className="flex items-center text-red-600 text-sm mt-2">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.identifications}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8"
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="px-8"
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  onClick={submitForm} 
                  className="px-8" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>

            {currentStep === 4 && (
              <p className="text-xs text-gray-500 mt-4 text-center">
                By submitting, you agree to our terms and conditions. Our team will contact you within 24 hours.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}