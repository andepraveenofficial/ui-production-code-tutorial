# This script is a Bash script used to automate the generation of TypeScript interfaces and API clients from an OpenAPI specification. 

#!/bin/bash

DESIRED_BASE_URL="http://localhost:5000" # Backend Server Port

echo "ℹ️ Installing required codegen packages globally..."

# Install the required npm packages globally on the user's machine
npm install -g swagger-typescript-api
echo "✅ Successfully installed swagger-typescript-api globally"

npm install -g axios
echo "✅ Successfully installed axios globally"

# Define paths
current_dir=$(pwd) # present working directory
target_dir="$current_dir/src/api"

# Create the 'api' folder
if [ ! -d "$target_dir" ]
then
    echo "📂 'api' directory doesn't exist. Creating now..."
    mkdir -p "$target_dir"
    echo "📂 Created 'api' folder successfully in $current_dir/src"
else
    echo "📂 'api' Directory exists"
fi

response=$(curl -s -w "%{http_code}" http://localhost:5000/openapi.json -o "$target_dir/openapi.json")
http_code=${response: -3}

# Check if the curl command was successful and the file is not empty
if [ $http_code -ne 200 ] || [ ! -s "$target_dir/openapi.json" ]; then
    echo "❌ Failed to fetch data from the endpoint or received empty response. Exiting."
    rm -f "$target_dir/openapi.json"
    exit 1
fi

# Fetching the OpenAPI specification from the backend
curl -s http://localhost:5000/openapi.json -o "$target_dir/openapi.json"
echo "🌐 Fetched the openapi.json from the server"

# Generate TypeScript interfaces and API client using openapi-typescript-codegen
npx swagger-typescript-api -p "$target_dir/openapi.json" -o "$target_dir" -n myApi.ts
echo "🚀 Generated TypeScript interfaces and API client"

# Update the BASE URL in the generated OpenAPI.ts file
sed -i "s|BASE: '.*'|BASE: '$DESIRED_BASE_URL'|" "$target_dir/core/OpenAPI.ts"
echo "🔧 Updated BASE URL to $DESIRED_BASE_URL in OpenAPI.ts"

# Clean up by removing the downloaded openapi.json file
rm "$target_dir/openapi.json"
echo "🧹 Cleaned up temporary openapi.json file"

echo "✅ Successfully generated the required models and interfaces"
echo "🎉 Happy coding!"


