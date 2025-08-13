import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/registration";

function Header() {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMCAxMEwyNCAyMEwyMCAzMEwxNiAyMFoiIGZpbGw9IiM2MzY2RjEiLz4KPC9zdmc+"
              alt="Government Logo"
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-lg font-bold">सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय</h1>
              <p className="text-sm opacity-90">Ministry of Micro Small and Medium Enterprises</p>
            </div>
          </div>
          <div className="hidden lg:flex space-x-4 text-sm">
            <button className="hover:underline">Home</button>
            <button className="hover:underline">NIC Code</button>
            <button className="hover:underline">Useful Documents ⌄</button>
            <button className="hover:underline">Print / Verify ⌄</button>
            <button className="hover:underline">Update Details ⌄</button>
            <button className="hover:underline">Login ⌄</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">UDYAM REGISTRATION</h3>
            <p className="text-sm mb-2">Ministry of MSME</p>
            <p className="text-sm mb-2">Udyog Bhawan – New Delhi</p>
            <p className="text-sm mb-4">Email: champion@gov.in</p>
            <p className="text-sm font-bold">Contact Us</p>
            <p className="text-sm">For Grievances / Problems</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="text-sm space-y-2">
              <li>▶ CHAMPIONS</li>
              <li>▶ MSME Samadhan</li>
              <li>▶ MSME Sampark</li>
              <li>▶ MSME Dashboard</li>
              <li>▶ Entrepreneurship Skill Development Programme (ESDP)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Video</h3>
            <div className="bg-gray-700 p-4 rounded">
              <div className="aspect-video bg-blue-600 rounded flex items-center justify-center">
                <div className="text-center">
                  <h4 className="font-bold">Udyam Registration</h4>
                  <p className="text-sm">www.udyamregistration.gov.in</p>
                  <div className="mt-2 flex justify-center items-center space-x-2">
                    <span>0:30 / 0:47</span>
                    <button className="bg-white text-black px-2 py-1 rounded text-xs">▶</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center">
          <p>© Copyright Udyam Registration. All Rights Reserved. Website Content Managed by Ministry of Micro Small and Medium Enterprises, Govt.</p>
          <p>Website hosted & managed by National Informatics Centre, Ministry of Communications and I.T, Government of India</p>
        </div>
      </div>
    </div>
  );
}

export default function UdyamForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    aadhaarNumber: '',
    entrepreneurName: '',
    consentGiven: false,
    panNumber: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Real-time validation patterns
  const validationPatterns = {
    aadhaar: /^[0-9]{12}$/,
    pan: /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
    otp: /^[0-9]{6}$/
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'aadhaarNumber':
        if (!value) {
          newErrors.aadhaarNumber = 'Aadhaar number is required';
        } else if (!validationPatterns.aadhaar.test(value)) {
          newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
        } else {
          delete newErrors.aadhaarNumber;
        }
        break;

      case 'entrepreneurName':
        if (!value || value.trim().length < 2) {
          newErrors.entrepreneurName = 'Name of Entrepreneur is required (minimum 2 characters)';
        } else {
          delete newErrors.entrepreneurName;
        }
        break;

      case 'panNumber':
        if (!value) {
          newErrors.panNumber = 'PAN number is required';
        } else if (!validationPatterns.pan.test(value.toUpperCase())) {
          newErrors.panNumber = 'Invalid PAN number format (e.g., ABCDE1234F)';
        } else {
          delete newErrors.panNumber;
        }
        break;

      case 'otp':
        if (!value) {
          newErrors.otp = 'OTP is required';
        } else if (!validationPatterns.otp.test(value)) {
          newErrors.otp = 'OTP must be 6 digits';
        } else {
          delete newErrors.otp;
        }
        break;

      case 'consentGiven':
        if (!value) {
          newErrors.consentGiven = 'Consent must be given to proceed';
        } else {
          delete newErrors.consentGiven;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();

    // Validate all fields
    const isAadhaarValid = validateField('aadhaarNumber', form.aadhaarNumber);
    const isNameValid = validateField('entrepreneurName', form.entrepreneurName);
    const isConsentValid = validateField('consentGiven', form.consentGiven);

    if (!isAadhaarValid || !isNameValid || !isConsentValid) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/step1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaarNumber: form.aadhaarNumber,
          entrepreneurName: form.entrepreneurName,
          consentGiven: form.consentGiven,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setForm(prev => ({ ...prev, registrationStep1Id: data.registration.id }));
        setSuccess("Step 1 completed successfully! OTP sent to your registered mobile number.");
        setTimeout(() => {
          setStep(2);
          setSuccess("");
        }, 2000);
      } else {
        setErrors({ general: data.error || "Registration failed" });
      }
    } catch {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateOtp = async () => {
    if (!validateField('otp', form.otp)) return;

    setLoading(true);
    try {
      // Simulate OTP validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("OTP verified successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch {
      setErrors({ otp: "Invalid OTP. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();

    if (!validateField('panNumber', form.panNumber)) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/step2`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationStep1Id: form.registrationStep1Id,
          panNumber: form.panNumber.toUpperCase(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration completed successfully! Your Udyam Registration Number will be sent via email.");
      } else {
        setErrors({ general: data.error || "Registration failed" });
      }
    } catch {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Form Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-bold">Aadhaar Verification with OTP</h2>
      </div>

      <form onSubmit={handleSubmitStep1} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Aadhaar Number */}
          <div>
            <label className="block text-sm font-bold mb-2">
              1. Aadhaar Number / आधार संख्या <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Your Aadhaar No."
              value={form.aadhaarNumber}
              onChange={(e) => handleInputChange('aadhaarNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
              maxLength="12"
            />
            {errors.aadhaarNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>
            )}
          </div>

          {/* Entrepreneur Name */}
          <div>
            <label className="block text-sm font-bold mb-2">
              2. Name of Entrepreneur / उद्यमी का नाम <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.entrepreneurName ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Name as per Aadhaar"
              value={form.entrepreneurName}
              onChange={(e) => handleInputChange('entrepreneurName', e.target.value)}
            />
            {errors.entrepreneurName && (
              <p className="text-red-500 text-sm mt-1">{errors.entrepreneurName}</p>
            )}
          </div>
        </div>

        {/* Information Text */}
        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <ul className="list-disc list-inside space-y-2">
            <li>Aadhaar number shall be required for Udyam Registration.</li>
            <li>The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).</li>
            <li>In case of a Company or a Limited Liability Partnership or a Co-operative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GST/NIC per applicability of GST Act 2017 and PAN along with its Aadhaar number.</li>
          </ul>
        </div>

        {/* Consent Checkbox */}
        <div className="mt-6">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={form.consentGiven}
              onChange={(e) => handleInputChange('consentGiven', e.target.checked)}
            />
            <span className={`text-sm ${errors.consentGiven ? 'text-red-500' : 'text-gray-700'}`}>
              I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as allotted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared / के. अगर सरकार, इस कार्यालय उद्यम पंजीकरण के लिए आधार ऑनलाइन सुविधा के आधार डेटा को संचीत/साझा नहीं करेगी। यहां नीचे दिया कारी। आधार संख्या का उपयोग किया जाना है।
            </span>
          </label>
          {errors.consentGiven && (
            <p className="text-red-500 text-sm mt-1">{errors.consentGiven}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Validating..." : "Validate & Generate OTP"}
          </button>
        </div>

        {/* Error/Success Messages */}
        {errors.general && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
      </form>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Form Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-bold">PAN Verification</h2>
      </div>

      <form onSubmit={handleSubmitStep2} className="p-6">
        {/* OTP Verification Section */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-bold mb-4">OTP Verification</h3>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className={`p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.otp ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter 6-digit OTP"
              value={form.otp}
              onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength="6"
            />
            <button
              type="button"
              onClick={handleValidateOtp}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
          )}
        </div>

        {/* PAN Number */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            PAN Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full md:w-1/2 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.panNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter PAN Number (e.g., ABCDE1234F)"
            value={form.panNumber}
            onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase().slice(0, 10))}
            maxLength="10"
          />
          {errors.panNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>
          )}
          <p className="text-sm text-gray-600 mt-2">
            Format: 5 letters + 4 numbers + 1 letter (e.g., ABCDE1234F)
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back to Step 1
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Complete Registration"}
          </button>
        </div>

        {/* Error/Success Messages */}
        {errors.general && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
          </h1>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mt-6 mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                1
              </div>
              <div className="mx-4 text-sm font-medium">Aadhaar Verification</div>
              <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ml-4 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                2
              </div>
              <div className="ml-4 text-sm font-medium">PAN Verification</div>
            </div>
          </div>
        </div>

        {step === 1 ? renderStep1() : renderStep2()}

        {/* Info Section */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-blue-800 mb-2">
              Activities (NIC codes) not covered under MSMED Act, 2006 for Udyam Registration
            </h3>
            <p className="text-sm text-blue-700">
              Please refer to the official documentation for activities not covered under MSMED Act.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
