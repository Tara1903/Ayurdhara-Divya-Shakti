const fs = require('fs');
const path = require('path');

const filePath = path.join('C:\\Web Apps\\Ayurdhara Divya Shakti\\AYURDHARA\\06_Brand_Bible', 'Production_SOP.md');

const newContent = `

---

# SECTION 10
# ASSET PRODUCTION

After successful concept validation, commercial asset production may begin.
The Creative System shall execute production according to the approved Creative Strategy.
Production shall not introduce new creative decisions that were not approved during planning.

All production outputs shall remain consistent with:
• Brand Bible
• Product Intelligence Database
• Packaging Design System
• Category Visual DNA
• Website Visual System
• Presentation Standards
• Copywriting Standards
• Quality Control Standards

Every production decision shall be traceable to official documentation.

---

# SECTION 11
# PACKAGING PRODUCTION

If the requested deliverable includes packaging, the following production sequence shall be followed.

Step 1: Determine packaging type.
Examples: Bottle, Carton, Gift Box, Trial Pack, Shipping Box, Combo Pack, Display Box, Retail Carton
Step 2: Retrieve approved dimensions.
Step 3: Retrieve approved material specifications.
Step 4: Retrieve approved typography hierarchy.
Step 5: Retrieve approved colour palette.
Step 6: Retrieve mandatory legal information.
Step 7: Construct layout.
Step 8: Review manufacturing feasibility.
Step 9: Review print feasibility.
Step 10: Approve packaging production.

No packaging shall be generated before all mandatory specifications have been verified.

---

# SECTION 12
# PHOTOGRAPHY PRODUCTION

Photography production shall communicate the product rather than decorate it.
Every photograph shall begin by identifying the intended objective.

Approved photography objectives include:
Hero Product
Lifestyle
Ingredient Story
Educational
Website Banner
Marketing Campaign
Premium Collection
Launch Campaign
Retail Display
Product Detail

Every photography asset shall define:
Subject
Primary Focus
Camera Angle
Lighting Direction
Surface Material
Supporting Props
Botanical Arrangement
Colour Temperature
Depth of Field
Background
Mood
Visual Story

Photography shall always reinforce wellness before luxury.
Photography shall never imitate perfume advertising.

---

# SECTION 13
# PRESENTATION BOARD PRODUCTION

Presentation Boards exist to communicate commercial readiness.
Every Presentation Board shall include only approved information.

Typical board components include:
Hero Product Render
Packaging
Bottle
Front Label
Back Label
Outer Carton
Ingredient Highlights
Material Specifications
Typography System
Colour Palette
Premium Finish
Brand Story
Marketing Position
Website Preview
Manufacturing Notes

Presentation Boards shall maintain a consistent layout across the entire product portfolio.

---

# SECTION 14
# WEBSITE ASSET PRODUCTION

Website assets shall be designed for integration rather than individual appearance.
Every asset shall be evaluated inside the website environment.

The Creative System shall consider:
Desktop Layout
Tablet Layout
Mobile Layout
Dark Mode (if applicable)
Responsive Cropping
Negative Space
Button Placement
Headline Visibility
Text Readability
CTA Visibility

No website asset shall compromise usability.
Visual quality shall never reduce user experience.

---

# SECTION 15
# COPY INTEGRATION

Copy shall be retrieved from approved documentation.
The Creative System shall not generate marketing claims independently.

Every headline,
subheadline,
benefit,
description,
usage instruction,
ingredient explanation,
and call-to-action
shall originate from approved documentation.

Medical claims shall not be invented.
Scientific claims shall not be exaggerated.
Every statement shall be verifiable.

---

# SECTION 16
# PRODUCTION VALIDATION

Before entering Quality Assurance, every completed asset shall pass Production Validation.

Validation shall include:
Visual Accuracy
Packaging Accuracy
Product Accuracy
Typography Accuracy
Colour Accuracy
Layout Accuracy
Photography Accuracy
Manufacturing Accuracy
Website Accuracy
Presentation Accuracy

Incomplete assets shall not proceed to Quality Assurance.

---

# SECTION 17
# VERSION CONTROL

Every commercial asset shall possess version information.

Version tracking shall include:
Project Name
Product Name
Category
Asset Type
Version Number
Creation Date
Revision Date
Approval Status
Creative Lead
Documentation Version

This ensures future revisions remain traceable.

---

# SECTION 18
# REVISION PROTOCOL

Revisions shall modify only the requested elements.
Unrequested changes are prohibited.

When revising an asset, the Creative System shall preserve:
Brand Consistency
Product Identity
Packaging Structure
Typography System
Colour Logic
Information Hierarchy
Unless explicit approval has been granted to modify them.

Every revision shall maintain backward compatibility with the existing brand system.

---

# SECTION 19
# FINAL PRODUCTION APPROVAL

No commercial asset shall be released until the following departments approve the final production.

Brand Compliance
Packaging
Photography
Marketing
Website
Production
Quality Assurance

Final approval shall be unanimous.
If one department rejects the asset, production returns to the appropriate revision stage.
No exceptions.

---

# SECTION 20
# EXPORT STANDARD

Only approved commercial assets may be exported.

Export-ready assets shall satisfy all applicable requirements for:
Commercial Printing
Digital Publishing
Website Deployment
Marketing Campaigns
Social Media
Product Launch
Distributor Distribution
Retail Display
Investor Presentation
International Expansion

Every exported asset shall represent the highest commercial quality achievable within the AYURDHARA DIVYA SHAKTI Creative Operating System.

---

## END OF DOCUMENT

**Document ID:** ADS-SOP-009
**Title:** Production Standard Operating Procedure
**Version:** 1.0
**Status:** ACTIVE
**Classification:** PERMANENT
**Next Document:** ADS-QA-010 — Quality Control & Brand Compliance Manual
`;

fs.appendFileSync(filePath, newContent);
console.log('Successfully appended Sections 10-20 to Production_SOP.md');
