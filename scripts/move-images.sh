#!/bin/bash
set -e

# Define the new locations
new_md_location="./data/blog"
new_image_location="./public/static/images"

# Remove empty directories
find $new_image_location -type d -empty -exec rm -r {} \; 

# Loop through each directory
for dir in content/posts/*/ ; do
    # Move the *.md file to the new location
    git mv "$dir"*.md "$new_md_location"

    # Move the directory with the images to the new location
    git mv "$dir" "$new_image_location"

    # Get the directory name
    dir_name=$(basename "$dir")

    # Update the *.md file with the new image paths
    for file in "$new_md_location"/*.md ; do
        # Loop through each image in the new image location
        for image in "$new_image_location/$dir_name"/*.* ; do
            # Get the image name
            image_name=$(basename "$image")

            # Replace the image reference with the new path
            # echo "Replacing ./$image_name with /static/images/$dir_name/$image_name in $file"
            sed -i -e "s|./$image_name|/static/images/$dir_name/$image_name|g" "$file"
        done
    done
done