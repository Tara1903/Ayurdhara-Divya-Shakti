-- 00016_demo_images.sql
-- Sets the diamond trial pack image as a temporary demo placeholder for all products

UPDATE product_images 
SET image_url = '/images/products/diamond-trial.jpg';

UPDATE product_variants 
SET image_url = '/images/products/diamond-trial.jpg';
