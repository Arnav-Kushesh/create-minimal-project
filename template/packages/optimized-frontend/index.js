import config from "./config.js";
import { runServer } from "simple-site-optimizer";

// Start the SSR service
runServer(config).catch((err) => {
  console.error("Failed to start SSR service:", err);
  process.exit(1);
});
