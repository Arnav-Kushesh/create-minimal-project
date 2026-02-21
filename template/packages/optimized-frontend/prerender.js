import { doPrerendering } from "simple-site-optimizer";
import config from "./config.js";

// Start the SSR service
doPrerendering(config).catch((err) => {
  console.error("Failed to do prerendering:", err);
  process.exit(1);
});
