import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "../providers/theme-provider";

export const Route = createRootRoute({
	component: RootComponent,
	// notFoundComponent: () => <NotFound />,
});

function RootComponent() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="recycly-theme">
			<HeadContent />
			<Outlet />
		</ThemeProvider>
	);
}
