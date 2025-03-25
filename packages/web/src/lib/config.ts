import fs from "fs";
import path from "path";

import yaml from "js-yaml";

import type { Config } from "@/types/config";

const defaultConfig = {
  name: "DeGov1",
};

export const getDaoConfigServer = (): Config => {
  try {
    const configPaths = [
      path.join(process.cwd(), "degov.yml"),
      path.join(process.cwd(), "public", "degov.yml"),
      path.join(process.cwd(), "..", "degov.yml"),
      path.join(process.cwd(), "..", "..", "degov.yml"),
      path.join(process.cwd(), "..", "..", "public", "degov.yml"),
      "/var/task/degov.yml",
      path.join(process.env.VERCEL_ROOT_DIR || "", "degov.yml"),
      path.join(process.env.VERCEL_PROJECT_PATH || "", "degov.yml"),
      path.join(process.cwd(), "..", "..", "..", "degov.yml"),
    ];

    console.log("configPaths", configPaths);
    console.log("process.cwd()", process.cwd());

    let yamlText: string | undefined;

    for (const configPath of configPaths) {
      try {
        yamlText = fs.readFileSync(configPath, "utf8");
        console.log(`[Config] Loaded from ${configPath}`);
        break;
      } catch {
        continue;
      }
    }

    if (!yamlText) {
      console.log("[Config] Using default config");
      return defaultConfig as Config;
    }

    const config = yaml.load(yamlText) as Config;

    if (
      config &&
      typeof config === "object" &&
      typeof config.name === "string"
    ) {
      return config;
    }

    return defaultConfig as Config;
  } catch {
    console.log("[Config] Error occurred, using default config");
    return defaultConfig as Config;
  }
};
