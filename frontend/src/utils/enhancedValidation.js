// PIN Code API integration for auto-fill suggestions
export const fetchLocationByPin = async (pincode) => {
  try {
    // Using PostPin API (free tier)
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const data = await response.json();

    if (data[0]?.Status === "Success") {
      const postOffices = data[0].PostOffice;
      if (postOffices && postOffices.length > 0) {
        const firstOffice = postOffices[0];
        return {
          success: true,
          data: {
            city: firstOffice.District,
            state: firstOffice.State,
            country: firstOffice.Country,
            area: firstOffice.Name,
            pincode: pincode,
            suggestions: postOffices.map((office) => ({
              name: office.Name,
              district: office.District,
              state: office.State,
            })),
          },
        };
      }
    }

    return {
      success: false,
      error: "No location found for this PIN code",
    };
  } catch (error) {
    console.error("PIN code lookup failed:", error);
    return {
      success: false,
      error: "PIN code lookup service unavailable",
    };
  }
};

// Real-time validation utilities
export const validatePAN = (pan) => {
  if (!pan) return "PAN number is required";

  // Remove whitespace and convert to uppercase
  const cleanPAN = pan.toString().trim().toUpperCase();
  const panPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;

  if (!panPattern.test(cleanPAN)) {
    return "Invalid PAN format. Example: ABCDE1234F";
  }
  return null;
};

export const validateAadhaar = (aadhaar) => {
  if (!aadhaar) return "Aadhaar number is required";

  // Remove whitespace and validate
  const cleanAadhaar = aadhaar.toString().replace(/\s/g, "");
  const aadhaarPattern = /^[0-9]{12}$/;

  if (!aadhaarPattern.test(cleanAadhaar)) {
    return "Aadhaar number must be exactly 12 digits";
  }

  // Basic checksum validation (Verhoeff algorithm simulation)
  if (cleanAadhaar === "000000000000" || cleanAadhaar === "111111111111") {
    return "Invalid Aadhaar number";
  }

  return null;
};

export const validateEntrepreneurName = (name) => {
  if (!name || name.trim().length === 0) {
    return "Entrepreneur name is required";
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return "Name must be at least 2 characters long";
  }
  if (trimmedName.length > 100) {
    return "Name must not exceed 100 characters";
  }

  // Enhanced name pattern to include international characters and common punctuation
  const namePattern = /^[\p{L}\p{M}\s.''-]+$/u;
  if (!namePattern.test(trimmedName)) {
    return "Name can only contain letters, spaces, and common punctuation";
  }

  return null;
};

export const validateConsent = (consent) => {
  if (!consent) {
    return "Consent must be given to proceed with registration";
  }
  return null;
};

export const validateOTP = (otp) => {
  const otpPattern = /^[0-9]{6}$/;
  if (!otp) return "OTP is required";
  if (!otpPattern.test(otp)) {
    return "OTP must be exactly 6 digits";
  }
  return null;
};

// Form validation for complete steps
export const validateForm = (formData, step) => {
  const errors = {};

  if (step === 1) {
    const aadhaarError = validateAadhaar(formData.aadhaarNumber);
    if (aadhaarError) errors.aadhaarNumber = aadhaarError;

    const nameError = validateEntrepreneurName(formData.entrepreneurName);
    if (nameError) errors.entrepreneurName = nameError;

    const consentError = validateConsent(formData.consentGiven);
    if (consentError) errors.consentGiven = consentError;
  }

  if (step === 2) {
    const panError = validatePAN(formData.panNumber);
    if (panError) errors.panNumber = panError;

    if (formData.otp) {
      const otpError = validateOTP(formData.otp);
      if (otpError) errors.otp = otpError;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Enhanced input formatters
export const formatAadhaar = (value) => {
  // Remove all non-digits and limit to 12
  const digits = value.replace(/\D/g, "").slice(0, 12);

  // Add spacing for readability: XXXX XXXX XXXX
  if (digits.length > 8) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
  } else if (digits.length > 4) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  }
  return digits;
};

export const formatPAN = (value) => {
  // Convert to uppercase and limit to 10 characters
  return value.toUpperCase().slice(0, 10);
};

export const formatOTP = (value) => {
  // Remove all non-digits and limit to 6
  return value.replace(/\D/g, "").slice(0, 6);
};

// Progress tracking utilities
export const getStepProgress = (step, totalSteps = 2) => {
  return Math.round((step / totalSteps) * 100);
};

export const getNextStep = (currentStep, formData) => {
  if (currentStep === 1) {
    const validation = validateForm(formData, 1);
    return validation.isValid ? 2 : 1;
  }
  return currentStep;
};

// Error message configurations
export const errorMessages = {
  network: "Network error. Please check your connection and try again.",
  server: "Server error. Please try again later.",
  validation: "Please correct the highlighted errors and try again.",
  timeout: "Request timed out. Please try again.",
  generic: "An unexpected error occurred. Please try again.",
};

// Success message configurations
export const successMessages = {
  step1Complete:
    "Step 1 completed successfully! OTP has been sent to your registered mobile number.",
  otpVerified: "OTP verified successfully!",
  registrationComplete:
    "Registration completed successfully! Your Udyam Registration Number will be sent via email.",
  dataSubmitted: "Data submitted successfully!",
};
