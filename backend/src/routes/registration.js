import express from "express";
import {
  registerStep1,
  getSchema,
  registerStep2,
} from "../controllers/registrationController.js";
import { validateStep1, validateStep2 } from "../validators/formValidators.js";

const router = express.Router();

// Step 1: Aadhaar registration
router.post("/step1", validateStep1, registerStep1);

// Step 2: PAN registration
router.post("/step2", validateStep2, registerStep2);

// Get form schema
router.get("/schema", getSchema);

export default router;
