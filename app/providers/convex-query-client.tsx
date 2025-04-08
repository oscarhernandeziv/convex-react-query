"use client";

import { ConvexQueryClient } from "@convex-dev/react-query";
import { convex } from "./convex-client-provider";

// Create a ConvexQueryClient instance to connect Convex to TanStack Query
export const convexQueryClient = new ConvexQueryClient(convex);
