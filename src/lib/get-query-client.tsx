import { convex } from "@/app/providers/convex-client-provider";
import { ConvexQueryClient } from "@convex-dev/react-query";
import {
	QueryClient,
	defaultShouldDehydrateQuery,
	isServer,
} from "@tanstack/react-query";

// Create a ConvexQueryClient instance to connect Convex to TanStack Query
const convexQueryClient = new ConvexQueryClient(convex);

function makeQueryClient() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
			dehydrate: {
				// include pending queries in dehydration
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
		},
	});

	// Connect the convexQueryClient to the queryClient
	if (!isServer) {
		convexQueryClient.connect(queryClient);
	}

	return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	}

	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}
