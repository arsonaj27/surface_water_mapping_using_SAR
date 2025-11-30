import rasterio
import numpy as np
import pandas as pd
import glob
import os

folder = "binary_maps/*.tif"  ## Place your download folder here

results = []

for f in sorted(glob.glob(folder)):
    with rasterio.open(f) as src:
        mask = src.read(1)
        transform = src.transform

        pixel_width = 10 # You can change the pixel size for JRC dataset
        pixel_height = 10 # Same as above
        pixel_area = pixel_width * pixel_height

        water_pixels = np.sum(mask == 1)
        water_area_m2 = water_pixels * pixel_area
        water_area_km2 = water_area_m2 / 1e6

        # Extract date from filename
        name = os.path.basename(f)
        date = name.replace("Kulekhani_Binary_", "").replace(".tif","")

        results.append([date, water_area_km2])

df = pd.DataFrame(results, columns=["Date", "Water_Area_km2"])

# Sort by date if needed
df = df.sort_values("Date")
df.reset_index(drop=True, inplace=True)

print(df)
df.to_csv("kulekhani_water_area_from_binary.csv", index=False)
