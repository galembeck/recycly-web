import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/providers/auth-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/providers/theme-provider";
import { AdminSidebar } from "./~components/sidebar/-admin-sidebar";
import { SearchSection } from "./~components/sidebar/content-elements/-search-section";

export const Route = createFileRoute("/admin")({
	component: AdminLayout,
});

function AdminLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { isAuthenticated, isLoading, user } = useAuth();

	useEffect(() => {
		if (!isLoading && (!isAuthenticated || user?.profileType !== 1)) {
			navigate({ to: "/sign-in" });
		}
	}, [isLoading, isAuthenticated, user, navigate]);

	const pageLabels: Record<string, string> = {
		"/admin/dashboard": "Dashboard (overview)",
	};

	const currentPageLabel =
		pageLabels[location.pathname] || "Página não reconhecida...";

	return (
		<ThemeProvider defaultTheme="light" storageKey="recycly-theme">
			<SidebarProvider>
				<AdminSidebar />

				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center justify-between gap-2 pr-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator
								className="mr-2 data-[orientation=vertical]:h-4"
								orientation="vertical"
							/>
							<Breadcrumb>
								<BreadcrumbList>
									{location.pathname !== "/app" && (
										<>
											<BreadcrumbItem>
												<BreadcrumbLink href="/app/dashboard">
													Painel Administrativo
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
										</>
									)}
									<BreadcrumbItem>
										<BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>

						<div className="flex items-center gap-2">
							<div className="hidden lg:block">
								<SearchSection />
							</div>

							<ThemeToggle />
						</div>
					</header>

					<main className="container mx-auto space-y-8 p-4">
						<Outlet />
					</main>
				</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	);
}
