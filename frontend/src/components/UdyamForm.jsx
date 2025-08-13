import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3000/registration";

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
          <div className="flex space-x-4 text-sm">
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
    <div className="bg-gray-900 text-white mt-8">
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

function ProgressBar({ step }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-center space-x-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'
          }`}>1</div>
        <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'
          }`}>2</div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className={step >= 1 ? 'text-blue-500 font-semibold' : 'text-gray-500'}>
          Aadhaar Verification
        </span>
        <span className={step >= 2 ? 'text-blue-500 font-semibold' : 'text-gray-500'}>
          PAN Validation
        </span>
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
  const [schema, setSchema] = useState(null);

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

  useEffect(() => {
    fetch(`${API_BASE}/schema`)
      .then((res) => res.json())
      .then(setSchema)
      .catch((err) => {
        console.error("Failed to fetch schema:", err);
        // Fallback schema if backend is not running
        setSchema({
          step1: {
            fields: [
              {
                name: "aadhaarNumber",
                label: "Aadhaar Number",
                type: "text",
                validation: { regex: "^[0-9]{12}$", required: true, message: "Aadhaar number must be 12 digits." }
              },
              {
                name: "entrepreneurName",
                label: "Name of Entrepreneur",
                type: "text",
                validation: { required: true, message: "Entrepreneur name is required." }
              },
              {
                name: "consentGiven",
                label: "Consent",
                type: "checkbox",
                validation: { required: true, message: "Consent must be given." }
              }
            ]
          },
          step2: {
            fields: [
              {
                name: "panNumber",
                label: "PAN Number",
                type: "text",
                validation: { regex: "^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$", required: true, message: "PAN number format is invalid." }
              }
            ]
          }
        });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));

    // Auto-fill city/state based on PIN code
    if (name === "pinCode" && value.length === 6) {
      fetchLocationByPin(value);
    }
  };

  const fetchLocationByPin = async (pinCode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
      const data = await response.json();
      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
        const location = data[0].PostOffice[0];
        setForm((f) => ({
          ...f,
          city: location.District,
          state: location.State,
          country: location.Country
        }));
      }
    } catch (error) {
      console.error("Failed to fetch location:", error);
    }
  };

  if (!schema) return <div className="p-8 text-center">Loading form...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <ProgressBar step={step} />
      {step === 1 && (
        <form onSubmit={handleSubmitStep1} className="space-y-4">
          <h2 className="text-lg font-bold mb-2 text-blue-700">Aadhaar Verification With OTP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schema.step1.fields.map((field) => (
              <div key={field.name}>
                <label className="block font-semibold mb-1">
                  {field.label}
                </label>
                {field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={!!form[field.name]}
                    onChange={handleChange}
                    className="mr-2"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder={field.label}
                  />
                )}
                {errors[field.name] && (
                  <div className="text-red-500 text-xs mt-1">{errors[field.name]}</div>
                )}
              </div>
            ))}
          </div>
          <ul className="text-sm text-gray-700 mt-2 mb-2 list-disc pl-5">
            <li>Aadhaar number shall be required for Udyam Registration.</li>
            <li>The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).</li>
            <li>In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN and PAN along with its Aadhaar number.</li>
          </ul>
          <div className="text-xs text-gray-600 mb-2">
            I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared.
          </div>
          {errors.general && <div className="text-red-500 mb-2">{errors.general}</div>}
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold" disabled={loading}>
            {loading ? "Validating..." : "Validate & Generate OTP"}
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmitStep2} className="space-y-4">
          <h2 className="text-lg font-bold mb-2 text-blue-700">PAN Validation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schema.step2.fields.map((field) => (
              <div key={field.name}>
                <label className="block font-semibold mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder={field.label}
                />
                {errors[field.name] && (
                  <div className="text-red-500 text-xs mt-1">{errors[field.name]}</div>
                )}
              </div>
            ))}
          </div>
          {errors.general && <div className="text-red-500 mb-2">{errors.general}</div>}
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold" disabled={loading}>
            {loading ? "Validating..." : "Validate PAN"}
          </button>
          {success && <div className="text-green-600 font-bold mt-2">{success}</div>}
        </form>
      )}
    </div>
  );
}
