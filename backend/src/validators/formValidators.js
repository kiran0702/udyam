export const validateStep2 = (req, res, next) => {
  const { registrationStep1Id, panNumber } = req.body;
  // PAN: [A-Za-z]{5}[0-9]{4}[A-Za-z]{1}
  if (!registrationStep1Id || typeof registrationStep1Id !== "number") {
    return res
      .status(400)
      .json({ error: "registrationStep1Id is required and must be a number." });
  }
  if (!panNumber || !/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(panNumber)) {
    return res.status(400).json({ error: "Invalid PAN number format." });
  }
  next();
};
export const validateStep1 = (req, res, next) => {
  const { aadhaarNumber, entrepreneurName, consentGiven } = req.body;
  // Aadhaar: 12 digits
  if (!aadhaarNumber || !/^[0-9]{12}$/.test(aadhaarNumber)) {
    return res
      .status(400)
      .json({ error: "Invalid Aadhaar number. Must be 12 digits." });
  }
  if (!entrepreneurName || entrepreneurName.trim().length === 0) {
    return res.status(400).json({ error: "Entrepreneur name is required." });
  }
  if (consentGiven !== true) {
    return res.status(400).json({ error: "Consent must be given." });
  }
  next();
};
