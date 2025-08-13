// Validation utility functions
export const validateAadhaar = (aadhaarNumber) => {
  if (!aadhaarNumber) return "Aadhaar number is required";
  if (!/^[0-9]{12}$/.test(aadhaarNumber))
    return "Aadhaar number must be 12 digits";
  return null;
};

export const validatePAN = (panNumber) => {
  if (!panNumber) return "PAN number is required";
  if (!/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(panNumber))
    return "Invalid PAN number format";
  return null;
};

export const validateEntrepreneurName = (name) => {
  if (!name || name.trim().length === 0) return "Entrepreneur name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return null;
};

export const validateConsent = (consent) => {
  if (consent !== true) return "Consent must be given";
  return null;
};

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
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
