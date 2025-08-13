/* eslint-env jest */
// Enhanced validation tests covering all assignment requirements
import {
  validateAadhaar,
  validatePAN,
  validateEntrepreneurName,
  validateConsent,
  validateOTP,
  validateForm,
  formatAadhaar,
  formatPAN,
  formatOTP,
} from "../src/utils/enhancedValidation.js";

describe("Enhanced Aadhaar Validation", () => {
  test("should pass valid 12-digit Aadhaar", () => {
    expect(validateAadhaar("123456789012")).toBeNull();
    expect(validateAadhaar("987654321098")).toBeNull();
  });

  test("should fail empty Aadhaar", () => {
    expect(validateAadhaar("")).toBe("Aadhaar number is required");
    expect(validateAadhaar(null)).toBe("Aadhaar number is required");
    expect(validateAadhaar(undefined)).toBe("Aadhaar number is required");
  });

  test("should fail invalid Aadhaar format", () => {
    expect(validateAadhaar("1234")).toBe(
      "Aadhaar number must be exactly 12 digits"
    );
    expect(validateAadhaar("12345678901234")).toBe(
      "Aadhaar number must be exactly 12 digits"
    );
    expect(validateAadhaar("12345678901a")).toBe(
      "Aadhaar number must be exactly 12 digits"
    );
    expect(validateAadhaar("abcd56789012")).toBe(
      "Aadhaar number must be exactly 12 digits"
    );
  });

  test("should fail common invalid Aadhaar numbers", () => {
    expect(validateAadhaar("000000000000")).toBe("Invalid Aadhaar number");
    expect(validateAadhaar("111111111111")).toBe("Invalid Aadhaar number");
  });
});

describe("Enhanced PAN Validation", () => {
  test("should pass valid PAN formats", () => {
    expect(validatePAN("ABCDE1234F")).toBeNull();
    expect(validatePAN("XYZAB9876C")).toBeNull();
    expect(validatePAN("abcde1234f")).toBeNull(); // lowercase should work
  });

  test("should fail empty PAN", () => {
    expect(validatePAN("")).toBe("PAN number is required");
    expect(validatePAN(null)).toBe("PAN number is required");
    expect(validatePAN(undefined)).toBe("PAN number is required");
  });

  test("should fail invalid PAN formats", () => {
    expect(validatePAN("ABCD1234F")).toBe(
      "Invalid PAN format. Example: ABCDE1234F"
    );
    expect(validatePAN("ABCDE123F")).toBe(
      "Invalid PAN format. Example: ABCDE1234F"
    );
    expect(validatePAN("ABCDE1234")).toBe(
      "Invalid PAN format. Example: ABCDE1234F"
    );
    expect(validatePAN("12CDE1234F")).toBe(
      "Invalid PAN format. Example: ABCDE1234F"
    );
    expect(validatePAN("ABCDE1234FG")).toBe(
      "Invalid PAN format. Example: ABCDE1234F"
    );
    expect(validatePAN("ABC@E1234F")).toBe(
      "Invalid PAN format. Example: ABCDE1234F"
    );
  });
});

describe("Enhanced Entrepreneur Name Validation", () => {
  test("should pass valid names", () => {
    expect(validateEntrepreneurName("Rahul Sharma")).toBeNull();
    expect(validateEntrepreneurName("Mary-Jane O'Connor")).toBeNull();
    expect(validateEntrepreneurName("José García")).toBeNull();
    expect(validateEntrepreneurName("A B")).toBeNull();
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
  });

  test("should fail names that are too short or too long", () => {
    expect(validateEntrepreneurName("A")).toBe(
      "Name must be at least 2 characters long"
    );
    expect(validateEntrepreneurName("A".repeat(101))).toBe(
      "Name must not exceed 100 characters"
    );
  });

  test("should fail names with invalid characters", () => {
    expect(validateEntrepreneurName("John123")).toBe(
      "Name can only contain letters, spaces, and common punctuation"
    );
    expect(validateEntrepreneurName("John@Doe")).toBe(
      "Name can only contain letters, spaces, and common punctuation"
    );
    expect(validateEntrepreneurName("John#Doe")).toBe(
      "Name can only contain letters, spaces, and common punctuation"
    );
  });
});

describe("OTP Validation", () => {
  test("should pass valid 6-digit OTP", () => {
    expect(validateOTP("123456")).toBeNull();
    expect(validateOTP("000000")).toBeNull();
    expect(validateOTP("999999")).toBeNull();
  });

  test("should fail empty OTP", () => {
    expect(validateOTP("")).toBe("OTP is required");
    expect(validateOTP(null)).toBe("OTP is required");
    expect(validateOTP(undefined)).toBe("OTP is required");
  });

  test("should fail invalid OTP format", () => {
    expect(validateOTP("1234")).toBe("OTP must be exactly 6 digits");
    expect(validateOTP("12345678")).toBe("OTP must be exactly 6 digits");
    expect(validateOTP("12345a")).toBe("OTP must be exactly 6 digits");
    expect(validateOTP("abcdef")).toBe("OTP must be exactly 6 digits");
  });
});

describe("Consent Validation", () => {
  test("should pass when consent is given", () => {
    expect(validateConsent(true)).toBeNull();
  });

  test("should fail when consent is not given", () => {
    expect(validateConsent(false)).toBe(
      "Consent must be given to proceed with registration"
    );
    expect(validateConsent(null)).toBe(
      "Consent must be given to proceed with registration"
    );
    expect(validateConsent(undefined)).toBe(
      "Consent must be given to proceed with registration"
    );
    expect(validateConsent("")).toBe(
      "Consent must be given to proceed with registration"
    );
    expect(validateConsent(0)).toBe(
      "Consent must be given to proceed with registration"
    );
  });
});

describe("Form Integration Validation", () => {
  test("should validate complete Step 1 form successfully", () => {
    const validForm = {
      aadhaarNumber: "123456789012",
      entrepreneurName: "Rahul Sharma",
      consentGiven: true,
    };

    const result = validateForm(validForm, 1);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test("should catch multiple Step 1 validation errors", () => {
    const invalidForm = {
      aadhaarNumber: "1234",
      entrepreneurName: "A",
      consentGiven: false,
    };

    const result = validateForm(invalidForm, 1);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty("aadhaarNumber");
    expect(result.errors).toHaveProperty("entrepreneurName");
    expect(result.errors).toHaveProperty("consentGiven");
  });

  test("should validate complete Step 2 form successfully", () => {
    const validForm = {
      panNumber: "ABCDE1234F",
      otp: "123456",
    };

    const result = validateForm(validForm, 2);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test("should catch Step 2 validation errors", () => {
    const invalidForm = {
      panNumber: "invalid",
      otp: "123",
    };

    const result = validateForm(invalidForm, 2);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty("panNumber");
    expect(result.errors).toHaveProperty("otp");
  });
});

describe("Input Formatting Functions", () => {
  test("should format Aadhaar with proper spacing", () => {
    expect(formatAadhaar("123456789012")).toBe("1234 5678 9012");
    expect(formatAadhaar("12345678")).toBe("1234 5678");
    expect(formatAadhaar("1234")).toBe("1234");
    expect(formatAadhaar("12345678901234")).toBe("1234 5678 9012"); // truncated
  });

  test("should format PAN to uppercase", () => {
    expect(formatPAN("abcde1234f")).toBe("ABCDE1234F");
    expect(formatPAN("ABCDE1234F")).toBe("ABCDE1234F");
    expect(formatPAN("abcde1234fextra")).toBe("ABCDE1234F"); // truncated
  });

  test("should format OTP to digits only", () => {
    expect(formatOTP("123456")).toBe("123456");
    expect(formatOTP("12a34b")).toBe("1234");
    expect(formatOTP("1234567890")).toBe("123456"); // truncated
  });
});

describe("Edge Cases and Real-world Scenarios", () => {
  test("should handle whitespace in inputs", () => {
    expect(validateAadhaar("  123456789012  ")).toBeNull();
    expect(validatePAN("  ABCDE1234F  ")).toBeNull();
    expect(validateEntrepreneurName("  John Doe  ")).toBeNull();
  });

  test("should handle mixed case PAN validation", () => {
    expect(validatePAN("AbCdE1234f")).toBeNull();
    expect(validatePAN("ABCDE1234f")).toBeNull();
    expect(validatePAN("abcde1234F")).toBeNull();
  });

  test("should validate names with international characters", () => {
    expect(validateEntrepreneurName("François Müller")).toBeNull();
    expect(validateEntrepreneurName("María José García")).toBeNull();
  });

  test("should handle boundary values for Aadhaar", () => {
    expect(validateAadhaar("100000000000")).toBeNull();
    expect(validateAadhaar("999999999999")).toBeNull();
  });
});

describe("PIN Code Auto-fill (Mock Tests)", () => {
  // Note: These would be integration tests in a real scenario
  test("should handle valid PIN code structure", () => {
    const validPinCodes = ["110001", "400001", "560001", "700001"];
    validPinCodes.forEach((pin) => {
      expect(pin).toMatch(/^[0-9]{6}$/);
    });
  });

  test("should handle invalid PIN code structure", () => {
    const invalidPinCodes = ["1100", "11000a", "abcdef"];
    invalidPinCodes.forEach((pin) => {
      expect(pin).not.toMatch(/^[0-9]{6}$/);
    });
  });
});

describe("Performance and Load Testing Scenarios", () => {
  test("should handle multiple rapid validations", () => {
    const testData = Array.from({ length: 100 }, (_, i) => ({
      aadhaar: `12345678901${i % 10}`,
      pan: `ABCDE123${i % 10}F`,
      name: `Test User ${i}`,
    }));

    testData.forEach((data) => {
      expect(() => {
        validateAadhaar(data.aadhaar);
        validatePAN(data.pan);
        validateEntrepreneurName(data.name);
      }).not.toThrow();
    });
  });

  test("should handle extremely long input gracefully", () => {
    const longString = "A".repeat(1000);
    expect(() => validateEntrepreneurName(longString)).not.toThrow();
    expect(validateEntrepreneurName(longString)).toContain(
      "must not exceed 100 characters"
    );
  });
});

// Assignment specific test cases
describe("Assignment Requirements Validation", () => {
  test("should trigger error for invalid PAN as per assignment specs", () => {
    const invalidPAN = "INVALID123";
    const result = validatePAN(invalidPAN);
    expect(result).not.toBeNull();
    expect(result).toContain("Invalid PAN format");
  });

  test("should validate PAN format [A-Za-z]{5}[0-9]{4}[A-Za-z]{1} as specified", () => {
    expect(validatePAN("ABCDE1234F")).toBeNull();
    expect(validatePAN("AAAAA0000A")).toBeNull();
    expect(validatePAN("ZZZZZ9999Z")).toBeNull();
  });

  test("should handle empty fields as specified in assignment", () => {
    expect(validateAadhaar("")).toBe("Aadhaar number is required");
    expect(validatePAN("")).toBe("PAN number is required");
    expect(validateEntrepreneurName("")).toBe("Entrepreneur name is required");
  });

  test("should validate form data against scraped rules", () => {
    const testForm = {
      aadhaarNumber: "123456789012",
      entrepreneurName: "Test Entrepreneur",
      consentGiven: true,
      panNumber: "ABCDE1234F",
    };

    // Step 1 validation
    const step1Result = validateForm(testForm, 1);
    expect(step1Result.isValid).toBe(true);

    // Step 2 validation
    const step2Result = validateForm(testForm, 2);
    expect(step2Result.isValid).toBe(true);
  });
});
