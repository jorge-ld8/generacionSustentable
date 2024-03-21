import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "./uploadthing/core";
 
export default createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});