// import dotenv from "dotenv";
// dotenv.config();

export let SERVER_URL: string | undefined, ENV: string;

switch (import.meta.env.MODE) {
  case "development":
    // server url
    SERVER_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3000}`;
    // Environment
    ENV = "development";
    break;
  case "production":
    // server url
    SERVER_URL = process.env.VITE_SERVER_DEPLOY;
    // environment
    ENV = "production";
    break;
}
export const GEMINI_API_KEY: string | undefined = import.meta.env
  .VITE_GEMINI_API_KEY;
