import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "../../../../lib/auth";

// App Router handler for Better Auth
export const { GET, POST } = toNextJsHandler(auth);
