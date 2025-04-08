"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react"; // Import ReactNode

// biome-ignore lint/nursery/noProcessEnv: <explanation>
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
	throw new Error(
		"Missing NEXT_PUBLIC_CONVEX_URL environment variable. \n" +
			"Add it to your .env.local file, or list it in the Vercel environment variables settings.",
	);
}

// Export the convex client for use in other files
export const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({
	children,
}: {
	children: ReactNode;
}) {
	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
