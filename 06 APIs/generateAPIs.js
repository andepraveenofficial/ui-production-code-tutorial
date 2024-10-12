import fs from "fs";
import path from "path";
import { generateApi } from "swagger-typescript-api";

// Configuration for generating API
const config = {
  name: "MyApi.ts",
  output: path.resolve(process.cwd(), "./src/__generated__"),
  input: path.resolve(process.cwd(), "./swagger.json"), // Path to your swagger.json
  httpClientType: "axios", // or "fetch"
  defaultResponseAsSuccess: true,
  generateClient: true,
  generateResponses: true,
  unwrapResponseData: true,
  cleanOutput: true, // Clean output folder before generation
  prettier: {
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
  },
};

// Generate API
generateApi(config)
  .then(({ files }) => {
    // console.log("Generated files:", files); // Debugging line to check generated files

    files.forEach(({ content, name }) => {
      if (!name) {
        console.error("Generated file has no name, content:", content); // Debugging line
        return; // Skip if name is undefined
      }
      const filePath = path.resolve(config.output, name);
      fs.writeFileSync(filePath, content);
      console.log(`Generated: ${filePath}`);
    });
  })
  .catch((e) => console.error("Error generating API:", e));
