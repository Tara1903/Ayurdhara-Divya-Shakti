import os
from PIL import Image

# Setup directories
input_dir = r"C:\Users\taras\OneDrive\Pictures\ads"
output_dir = r"C:\Users\taras\OneDrive\Documents\Ayurdhara Divya Shakti\public\images\products"

os.makedirs(output_dir, exist_ok=True)

# Image mapping based on manual inspection
images_to_process = [
    {
        "filename": "WhatsApp Image 2026-07-18 at 9.53.58 PM.jpeg",
        "rows": 1,
        "cols": 4,
        "names": [
            "feet-kids-soft-steps-150ml",
            "feet-men-active-steps-150ml",
            "feet-women-comfort-steps-150ml",
            "feet-senior-relax-steps-150ml"
        ]
    },
    {
        "filename": "WhatsApp Image 2026-07-18 at 9.53.59 PM (1).jpeg",
        "rows": 4,
        "cols": 4,
        "names": [
            "nabhi-kids-smart-15ml", "nabhi-kids-gentle-15ml", "nabhi-kids-daily-15ml", "nabhi-kids-pure-15ml",
            "nabhi-men-strength-15ml", "nabhi-men-vital-15ml", "nabhi-men-balance-15ml", "nabhi-men-pure-15ml",
            "nabhi-women-harmony-15ml", "nabhi-women-care-15ml", "nabhi-women-glow-15ml", "nabhi-women-pure-15ml",
            "nabhi-senior-comfort-15ml", "nabhi-senior-vital-15ml", "nabhi-senior-balance-15ml", "nabhi-senior-pure-15ml"
        ]
    },
    {
        "filename": "WhatsApp Image 2026-07-18 at 9.53.59 PM.jpeg",
        "rows": 1,
        "cols": 4,
        "names": [
            "feet-kids-soft-steps-30ml",
            "feet-men-active-steps-30ml",
            "feet-women-comfort-steps-30ml",
            "feet-senior-relax-steps-30ml"
        ]
    },
    {
        "filename": "WhatsApp Image 2026-07-18 at 9.57.55 PM.jpeg",
        "rows": 4,
        "cols": 4,
        "names": [
            "nabhi-kids-smart-10ml", "nabhi-kids-gentle-10ml", "nabhi-kids-daily-10ml", "nabhi-kids-pure-10ml",
            "nabhi-men-strength-10ml", "nabhi-men-vital-10ml", "nabhi-men-balance-10ml", "nabhi-men-pure-10ml",
            "nabhi-women-harmony-10ml", "nabhi-women-care-10ml", "nabhi-women-glow-10ml", "nabhi-women-pure-10ml",
            "nabhi-senior-comfort-10ml", "nabhi-senior-vital-10ml", "nabhi-senior-balance-10ml", "nabhi-senior-pure-10ml"
        ]
    },
    {
        "filename": "WhatsApp Image 2026-07-18 at 9.59.07 PM.jpeg",
        "rows": 5,
        "cols": 1,
        "names": [
            "combo-individual-trial",
            "combo-family-trial",
            "combo-individual-gold",
            "combo-family-gold",
            "combo-individual-premium"
        ]
    }
]

def process_image(img_info):
    img_path = os.path.join(input_dir, img_info["filename"])
    if not os.path.exists(img_path):
        print(f"File not found: {img_path}")
        return

    try:
        img = Image.open(img_path)
        width, height = img.size
        
        # Calculate cell dimensions
        cell_w = width / img_info["cols"]
        cell_h = height / img_info["rows"]
        
        count = 0
        for r in range(img_info["rows"]):
            for c in range(img_info["cols"]):
                if count >= len(img_info["names"]):
                    break
                    
                # Calculate bounding box
                left = int(c * cell_w)
                top = int(r * cell_h)
                right = int((c + 1) * cell_w)
                bottom = int((r + 1) * cell_h)
                
                # Ensure we don't go out of bounds
                right = min(right, width)
                bottom = min(bottom, height)
                
                # Crop and save
                cropped = img.crop((left, top, right, bottom))
                
                # Minor cleanup: crop 5 pixels from edges to remove grid lines if any
                cropped = cropped.crop((5, 5, cropped.width - 5, cropped.height - 5))
                
                output_name = f"{img_info['names'][count]}.jpg"
                output_path = os.path.join(output_dir, output_name)
                
                # Save with high quality
                cropped.save(output_path, "JPEG", quality=95)
                print(f"Saved {output_name}")
                count += 1
                
    except Exception as e:
        print(f"Error processing {img_info['filename']}: {str(e)}")

for info in images_to_process:
    print(f"Processing {info['filename']}...")
    process_image(info)

print("Done cropping images.")
