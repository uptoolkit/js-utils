#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Run the build script
echo "Building the package..."
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

# Publish the package
echo "Publishing the package to npm..."
npm publish

# Check if publish was successful
if [ $? -ne 0 ]; then
  echo "Publish failed. Exiting."
  exit 1
fi

echo "Package published successfully!"