"use client";

import { env } from "@/env";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl = env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
	throw new Error("Missing NEXT_PUBLIC_CONVEX_URL environment variable.");
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
