/* eslint-env jest */
// @jest-environment jsdom
import {
  validateAadhaar,
  validatePAN,
  validateEntrepreneurName,
  validateConsent,
  validateForm,
} from "../src/utils/validation.js";

describe("Aadhaar Validation", () => {
  test("should pass valid 12-digit Aadhaar", () => {
    expect(validateAadhaar("123456789012")).toBeNull();
  });

  test("should fail empty Aadhaar", () => {
    expect(validateAadhaar("")).toBe("Aadhaar number is required");
    expect(validateAadhaar(null)).toBe("Aadhaar number is required");
    expect(validateAadhaar(undefined)).toBe("Aadhaar number is required");
  });

  test("should fail invalid Aadhaar format", () => {
    expect(validateAadhaar("1234")).toBe("Aadhaar number must be 12 digits");
    expect(validateAadhaar("12345678901234")).toBe(
      "Aadhaar number must be 12 digits"
    );
    expect(validateAadhaar("12345678901a")).toBe(
      "Aadhaar number must be 12 digits"
    );
    expect(validateAadhaar("abcd56789012")).toBe(
      "Aadhaar number must be 12 digits"
    );
  });
});

describe("PAN Validation", () => {
  test("should pass valid PAN format", () => {
    expect(validatePAN("ABCDE1234F")).toBeNull();
    expect(validatePAN("XYZAB9876C")).toBeNull();
  });

  test("should fail empty PAN", () => {
    expect(validatePAN("")).toBe("PAN number is required");
    expect(validatePAN(null)).toBe("PAN number is required");
    expect(validatePAN(undefined)).toBe("PAN number is required");
  });

  test("should fail invalid PAN format", () => {
    expect(validatePAN("ABCD1234F")).toBe("Invalid PAN number format"); // 4 letters instead of 5
    expect(validatePAN("ABCDE123F")).toBe("Invalid PAN number format"); // 3 digits instead of 4
    expect(validatePAN("ABCDE1234")).toBe("Invalid PAN number format"); // Missing last letter
    expect(validatePAN("12CDE1234F")).toBe("Invalid PAN number format"); // Numbers in first 5
    expect(validatePAN("ABCDE1234FG")).toBe("Invalid PAN number format"); // Too long
  });
});

describe("Entrepreneur Name Validation", () => {
  test("should pass valid names", () => {
    expect(validateEntrepreneurName("Rahul Sharma")).toBeNull();
    expect(validateEntrepreneurName("A B")).toBeNull();
    expect(validateEntrepreneurName("John")).toBeNull();
  });

  test("should fail empty or invalid names", () => {
    expect(validateEntrepreneurName("")).toBe("Entrepreneur name is required");
    expect(validateEntrepreneurName("   ")).toBe(
      "Entrepreneur name is required"
    );
    expect(validateEntrepreneurName(null)).toBe(
      "Entrepreneur name is required"
    );
    expect(validateEntrepreneurName(undefined)).toBe(
      "Entrepreneur name is required"
    );
    expect(validateEntrepreneurName("A")).toBe(
      "Name must be at least 2 characters"
    );
  });
});

describe("Consent Validation", () => {
  test("should pass when consent is true", () => {
    expect(validateConsent(true)).toBeNull();
  });

  test("should fail when consent is not given", () => {
    expect(validateConsent(false)).toBe("Consent must be given");
    expect(validateConsent(null)).toBe("Consent must be given");
    expect(validateConsent(undefined)).toBe("Consent must be given");
    expect(validateConsent("")).toBe("Consent must be given");
    expect(validateConsent(0)).toBe("Consent must be given");
  });
});

describe("Form Validation Integration", () => {
  test("should validate complete Step 1 form", () => {
    const validForm = {
      aadhaarNumber: "123456789012",
      entrepreneurName: "Rahul Sharma",
      consentGiven: true,
    };

    const result = validateForm(validForm, 1);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test("should catch multiple Step 1 errors", () => {
    const invalidForm = {
      aadhaarNumber: "1234",
      entrepreneurName: "",
      consentGiven: false,
    };

    const result = validateForm(invalidForm, 1);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty("aadhaarNumber");
    expect(result.errors).toHaveProperty("entrepreneurName");
    expect(result.errors).toHaveProperty("consentGiven");
  });

  test("should validate complete Step 2 form", () => {
    const validForm = {
      panNumber: "ABCDE1234F",
    };

    const result = validateForm(validForm, 2);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test("should catch Step 2 errors", () => {
    const invalidForm = {
      panNumber: "invalid",
    };

    const result = validateForm(invalidForm, 2);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty("panNumber");
  });
});

// Edge cases
describe("Edge Cases", () => {
  test("should handle edge case Aadhaar numbers", () => {
    expect(validateAadhaar("000000000000")).toBeNull(); // All zeros (valid format)
    expect(validateAadhaar("999999999999")).toBeNull(); // All nines (valid format)
  });

  test("should handle case insensitive PAN", () => {
    expect(validatePAN("abcde1234f")).toBeNull(); // lowercase
    expect(validatePAN("ABCDE1234f")).toBeNull(); // mixed case
  });

  test("should handle names with special characters", () => {
    expect(validateEntrepreneurName("O'Connor")).toBeNull();
    expect(validateEntrepreneurName("Mary-Jane")).toBeNull();
    expect(validateEntrepreneurName("José")).toBeNull();
  });
});
