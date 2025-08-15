import fs from "fs";
import path from "path";
export const getSchema = (req, res) => {
  const schemaPath = path.resolve("./udyamSchema.json");
  fs.readFile(schemaPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Could not read schema file" });
    }
    res.json(JSON.parse(data));
  });
};
export const registerStep2 = async (req, res) => {
  const { registrationStep1Id, panNumber } = req.body;
  try {
    // Check if Step 1 registration exists
    const step1 = await prisma.registrationStep1.findUnique({
      where: { id: registrationStep1Id },
    });
    if (!step1) {
      return res.status(404).json({ error: "Step 1 registration not found" });
    }
    // Create Step 2 registration
    const registration = await prisma.registrationStep2.create({
      data: {
        registrationStep1Id,
        panNumber,
        validated: true,
      },
    });
    res
      .status(201)
      .json({ message: "Step 2 registration successful", registration });
  } catch (error) {
    if (error.code === "P2002") {
      // Unique constraint failed
      return res.status(409).json({ error: "PAN number already registered" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
import prisma from "../db.js";

export const registerStep1 = async (req, res) => {
  const { aadhaarNumber, entrepreneurName, consentGiven } = req.body;
  try {
    const registration = await prisma.registrationStep1.create({
      data: {
        aadhaarNumber,
        entrepreneurName,
        consentGiven,
      },
    });
    res
      .status(201)
      .json({ message: "Step 1 registration successful", registration });
  } catch (error) {
    if (error.code === "P2002") {
      // Unique constraint failed
      return res
        .status(409)
        .json({ error: "Aadhaar number already registered" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
