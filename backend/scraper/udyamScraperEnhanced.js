import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

async function scrapeUdyamForm() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    console.log("Navigating to Udyam registration portal...");
    await page.goto("https://udyamregistration.gov.in/UdyamRegistration.aspx", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for page to load
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("Scraping enhanced form data...");

    // Extract comprehensive form data
    const formData = await page.evaluate(() => {
      const scrapedData = {
        pageTitle: document.title,
        formStructure: {
          step1: {
            name: "aadhaar_verification",
            title: "Aadhaar Verification with OTP",
            fields: [],
          },
          step2: {
            name: "pan_verification",
            title: "PAN Verification",
            fields: [],
          },
        },
        validationRules: {
          aadhaar: {
            pattern: "^[0-9]{12}$",
            message: "Aadhaar number must be 12 digits",
          },
          pan: {
            pattern: "^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$",
            message: "Invalid PAN number format",
          },
          otp: {
            pattern: "^[0-9]{6}$",
            message: "OTP must be 6 digits",
          },
        },
        uiElements: {
          colors: {
            primary: "#4F46E5", // Blue
            secondary: "#7C3AED", // Purple
            success: "#10B981", // Green
            error: "#EF4444", // Red
            warning: "#F59E0B", // Yellow
          },
          typography: {
            fontFamily: "system-ui, -apple-system, sans-serif",
            headingSizes: ["text-3xl", "text-2xl", "text-xl", "text-lg"],
            textSizes: ["text-sm", "text-base"],
          },
        },
      };

      // Extract actual form fields
      const inputs = document.querySelectorAll("input, select, textarea");

      inputs.forEach((input, index) => {
        const parentText =
          input.closest("td")?.textContent ||
          input.closest("div")?.textContent ||
          input.parentElement?.textContent ||
          "";

        const labelText =
          input.labels?.[0]?.textContent ||
          input.getAttribute("placeholder") ||
          parentText.split("\n")[0]?.trim() ||
          `Field ${index}`;

        const fieldInfo = {
          name: input.name || input.id || `field_${index}`,
          label: labelText?.trim().substring(0, 100),
          type: input.type || input.tagName.toLowerCase(),
          placeholder: input.placeholder,
          required:
            input.required ||
            input.hasAttribute("required") ||
            labelText?.includes("*") ||
            false,
          pattern: input.pattern,
          maxLength: input.maxLength > 0 ? input.maxLength : null,
          className: input.className,
          value: input.value,
          id: input.id,
          validation: {
            required: input.required || labelText?.includes("*"),
            type: input.type,
            pattern: input.pattern,
          },
        };

        // Skip hidden and system fields
        if (
          input.type === "hidden" ||
          input.type === "submit" ||
          !labelText?.trim()
        ) {
          return;
        }

        // Categorize fields based on content
        if (
          labelText?.toLowerCase().includes("aadhaar") ||
          labelText?.toLowerCase().includes("आधार")
        ) {
          scrapedData.formStructure.step1.fields.push({
            ...fieldInfo,
            category: "aadhaar",
            step: 1,
          });
        } else if (
          labelText?.toLowerCase().includes("entrepreneur") ||
          labelText?.toLowerCase().includes("उद्यमी")
        ) {
          scrapedData.formStructure.step1.fields.push({
            ...fieldInfo,
            category: "entrepreneur_name",
            step: 1,
          });
        } else if (
          labelText?.toLowerCase().includes("consent") ||
          labelText?.toLowerCase().includes("agree") ||
          input.type === "checkbox"
        ) {
          scrapedData.formStructure.step1.fields.push({
            ...fieldInfo,
            category: "consent",
            step: 1,
          });
        } else if (labelText?.toLowerCase().includes("pan")) {
          scrapedData.formStructure.step2.fields.push({
            ...fieldInfo,
            category: "pan",
            step: 2,
          });
        } else if (labelText?.toLowerCase().includes("otp")) {
          scrapedData.formStructure.step2.fields.push({
            ...fieldInfo,
            category: "otp",
            step: 2,
          });
        }
      });

      // Extract page layout information
      const layoutInfo = {
        header: {
          title: document
            .querySelector("h1, .header-title, .page-title")
            ?.textContent?.trim(),
          subtitle: document
            .querySelector(".subtitle, .description")
            ?.textContent?.trim(),
        },
        sections: [],
      };

      // Get section headers
      const headings = document.querySelectorAll(
        "h1, h2, h3, h4, .section-title"
      );
      headings.forEach((heading) => {
        if (heading.textContent?.trim()) {
          layoutInfo.sections.push({
            title: heading.textContent.trim(),
            tagName: heading.tagName,
            className: heading.className,
          });
        }
      });

      scrapedData.layout = layoutInfo;
      return scrapedData;
    });

    console.log("Scraped data structure:", JSON.stringify(formData, null, 2));

    // Save to file
    const outputDir = path.dirname(new URL(import.meta.url).pathname);
    const outputPath = path.join(outputDir, "..", "udyamSchemaEnhanced.json");

    fs.writeFileSync(outputPath, JSON.stringify(formData, null, 2));
    console.log("Enhanced schema saved to:", outputPath);

    // Generate summary report
    const summary = {
      totalFields:
        formData.formStructure.step1.fields.length +
        formData.formStructure.step2.fields.length,
      step1Fields: formData.formStructure.step1.fields.length,
      step2Fields: formData.formStructure.step2.fields.length,
      validationRules: Object.keys(formData.validationRules).length,
      extractedCategories: [
        ...new Set([
          ...formData.formStructure.step1.fields.map((f) => f.category),
          ...formData.formStructure.step2.fields.map((f) => f.category),
        ]),
      ],
    };

    console.log("Scraping Summary:", summary);
    return formData;
  } catch (error) {
    console.error("Scraping failed:", error);
    return null;
  } finally {
    await browser.close();
  }
}

// Enhanced schema generation
async function generateEnhancedSchema() {
  console.log("Starting enhanced Udyam portal scraping...");
  const data = await scrapeUdyamForm();

  if (data) {
    console.log("✅ Enhanced scraping completed successfully!");
    console.log("📊 Summary:");
    console.log(
      `- Total fields extracted: ${
        data.formStructure.step1.fields.length +
        data.formStructure.step2.fields.length
      }`
    );
    console.log(`- Step 1 fields: ${data.formStructure.step1.fields.length}`);
    console.log(`- Step 2 fields: ${data.formStructure.step2.fields.length}`);
    console.log(
      `- Validation rules: ${Object.keys(data.validationRules).length}`
    );
  } else {
    console.log("❌ Scraping failed");
  }
}

// Run the enhanced scraper
generateEnhancedSchema().catch(console.error);
