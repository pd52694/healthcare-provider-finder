const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // Limit each IP to 30 requests per hour
  message: { error: "Rate limit exceeded. Please try again in an hour." },
});

app.use(cors());
app.use(express.json());
app.use(limiter);

app.post("/providers", async (req, res) => {
  const { zip, condition } = req.body;

  if (!zip || !condition) {
    return res.status(400).json({ error: "ZIP and condition are required" });
  }

  const taxonomy = mapConditionToTaxonomy(condition.toLowerCase());

  let url = `https://npiregistry.cms.hhs.gov/api/?version=2.1&postal_code=${zip}&limit=5`;

  if (taxonomy != "Family Medicine") {
    url += `&taxonomy_description=${encodeURIComponent(taxonomy)}`;
  } else {
    url += `&taxonomy_description=${encodeURIComponent("Family Medicine")}`;
  }

  try {
    let response = await fetch(url);
    let data = await response.json();

    // If no results, try fallback to Family Medicine
    if (!data.results || data.results.length === 0) {
      const fallbackUrl = `https://npiregistry.cms.hhs.gov/api/?version=2.1&postal_code=${zip}&limit=5&taxonomy_description=${encodeURIComponent("Family Medicine")}`;
      response = await fetch(fallbackUrl);
      data = await response.json();
    }

    const providers = (data.results || []).map((entry) => {
      const address1 =
        (entry.addresses &&
          entry.addresses[0] &&
          entry.addresses[0].address_1) ||
        "";
      const city =
        (entry.addresses && entry.addresses[0] && entry.addresses[0].city) ||
        "";
      const state =
        (entry.addresses && entry.addresses[0] && entry.addresses[0].state) ||
        "";
      const postalCode =
        (entry.addresses &&
          entry.addresses[0] &&
          entry.addresses[0].postal_code) ||
        "";
      const fullAddress = `${address1}, ${city}, ${state} ${postalCode.substring(0, 5) || ""}`;

      const firstName = (entry.basic && entry.basic.first_name) || "";
      const lastName = (entry.basic && entry.basic.last_name) || "";
      const name =
        entry.basic && entry.basic.name
          ? entry.basic.name
          : `${firstName} ${lastName}`.trim();

      const specialty =
        (entry.taxonomies && entry.taxonomies[0] && entry.taxonomies[0].desc) ||
        condition;

      return {
        name: name,
        address: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
        displayAddress: fullAddress,
        city: city,
        state: state,
        zip: postalCode.substring(0, 5) || "",
        specialty: specialty,
      };
    });

    res.json({ providers });
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function mapConditionToTaxonomy(condition) {
  condition = condition.toLowerCase();

  if (condition.includes("back")) return "Chiropractor";
  if (condition.includes("knee")) return "Physical Therapist";
  if (condition.includes("head") || condition.includes("migraine"))
    return "Neurology";
  if (condition.includes("diabetes")) return "Endocrinology";
  if (condition.includes("vision") || condition.includes("eye"))
    return "Optometrist";
  if (
    condition.includes("mental") ||
    condition.includes("depression") ||
    condition.includes("anxiety")
  )
    return "Psychiatry";
  if (condition.includes("appendicitis") || condition.includes("surgery"))
    return "Surgery";
  if (condition.includes("skin") || condition.includes("rash"))
    return "Dermatology";
  if (
    condition.includes("tooth") ||
    condition.includes("teeth") ||
    condition.includes("dental")
  )
    return "Dentist";
  if (
    condition.includes("heart") ||
    condition.includes("chest pain") ||
    condition.includes("cardio")
  )
    return "Internal Medicine - Cardiovascular Disease";
  if (
    condition.includes("lungs") ||
    condition.includes("asthma") ||
    condition.includes("breathing")
  )
    return "Internal Medicine - Pulmonary Disease";

  if (
    condition.includes("stomach") ||
    condition.includes("abdomen") ||
    condition.includes("nausea")
  )
    return "Gastroenterology";
  if (
    condition.includes("infection") ||
    condition.includes("fever") ||
    condition.includes("flu") ||
    condition.includes("cold")
  )
    return "Internal Medicine";
  if (
    condition.includes("pregnancy") ||
    condition.includes("obgyn") ||
    condition.includes("gynecology")
  )
    return "Obstetrics & Gynecology";
  if (
    condition.includes("allergy") ||
    condition.includes("sneezing") ||
    condition.includes("pollen")
  )
    return "Allergy & Immunology";
  if (
    condition.includes("ear") ||
    condition.includes("nose") ||
    condition.includes("throat") ||
    condition.includes("sinus")
  )
    return "Otolaryngology";
  if (
    condition.includes("bone") ||
    condition.includes("fracture") ||
    condition.includes("ortho") ||
    condition.includes("broke")
  )
    return "Orthopedic Surgery";
  if (
    condition.includes("cancer") ||
    condition.includes("tumor") ||
    condition.includes("oncology")
  )
    return "Oncology";
  if (
    condition.includes("neck") ||
    condition.includes("shoulder") ||
    condition.includes("elbow") ||
    condition.includes("wrist") ||
    condition.includes("hand") ||
    condition.includes("finger")
  )
    return "Orthopedic Surgery";
  if (condition.includes("blood") || condition.includes("hematology"))
    return "Hematology";
  if (condition.includes("kidney") || condition.includes("renal"))
    return "Nephrology";
  if (condition.includes("liver") || condition.includes("hepatology"))
    return "Hepatology";
  if (condition.includes("rheumatology") || condition.includes("arthritis"))
    return "Rheumatology";
  if (
    condition.includes("neurology") ||
    condition.includes("brain") ||
    condition.includes("stroke")
  )
    return "Neurology";
  if (
    condition.includes("urology") ||
    condition.includes("bladder") ||
    condition.includes("prostate")
  )
    return "Urology";
  if (condition.includes("podiatry") || condition.includes("foot"))
    return "Podiatry";
  if (condition.includes("orthopedics") || condition.includes("joint"))
    return "Orthopedic Surgery";
  if (condition.includes("pediatrics") || condition.includes("child"))
    return "Pediatrics";
  if (condition.includes("geriatrics") || condition.includes("elderly"))
    return "Geriatrics";
  if (condition.includes("infectious") || condition.includes("infection"))
    return "Infectious Disease";
  if (
    condition.includes("hair") ||
    condition.includes("scalp") ||
    condition.includes("hair loss") ||
    condition.includes("alopecia")
  )
    return "Dermatology";
  if (
    condition.includes("lip filler") ||
    condition.includes("botox") ||
    condition.includes("dermatology")
  )
    return "Dermatology";

  // fallback to general practice if no match
  return "Family Medicine";
}

app.get("/", (req, res) => {
  res.send("👋 Provider Finder API is live!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
