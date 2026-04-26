import { useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, LogOut, Menu, Recycle, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/services/use-auth";
import { getInitials } from "@/utils/get-initials";
import { scrollToSection } from "@/utils/scroll-to-section";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { ProfileDropdown } from "./profile-dropdown";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signOut, user, isAuthenticated } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 right-0 left-0 z-50 bg-white dark:bg-primary-dark shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Button
            className="no-underline! cursor-pointer px-0! font-bold text-2xl text-primary-green-dark dark:text-white"
            onClick={
              location.pathname === "/"
                ? () => scrollToSection("intro")
                : () => navigate({ to: "/" })
            }
            variant="link"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-green">
              <Recycle className="size-6 text-white" />
            </div>
            Recycly
          </Button>

          <nav className="hidden items-center md:flex">
            <Button
              className="cursor-pointer text-lg text-primary-green-dark dark:text-white transition-colors hover:font-bold hover:text-primary-green-dark dark:hover:text-white/80"
              onClick={
                location.pathname === "/"
                  ? () => scrollToSection("intro")
                  : () => navigate({ to: "/" })
              }
              variant="link"
            >
              Início
            </Button>

            <Button
              className="cursor-pointer text-lg text-primary-green-dark dark:text-white transition-colors hover:font-bold hover:text-primary-green-dark dark:hover:text-white/80"
              onClick={
                location.pathname === "/"
                  ? () => scrollToSection("how-it-works")
                  : () => navigate({ to: "/", hash: "how-it-works" })
              }
              variant="link"
            >
              Como funciona
            </Button>

            <Button
              className="cursor-pointer text-lg text-primary-green-dark dark:text-white transition-colors hover:font-bold hover:text-primary-green-dark dark:hover:text-white/80"
              onClick={
                location.pathname === "/"
                  ? () => scrollToSection("features")
                  : () => navigate({ to: "/", hash: "features" })
              }
              variant="link"
            >
              Funcionalidades
            </Button>

            <Button
              className="cursor-pointer text-lg text-primary-green-dark dark:text-white transition-colors hover:font-bold hover:text-primary-green-dark dark:hover:text-white/80"
              onClick={
                location.pathname === "/"
                  ? () => scrollToSection("impacts")
                  : () => navigate({ to: "/", hash: "impacts" })
              }
              variant="link"
            >
              Impactos
            </Button>
          </nav>

          <div className="hidden md:flex md:items-center md:gap-5">
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <>
                <Button
                  className="hidden cursor-pointer items-center gap-2 py-4! text-lg text-primary-green-dark dark:text-white transition-colors hover:text-primary-green-dark/80 dark:hover:text-whiite/80 md:flex"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate({ to: "/sign-in" });
                  }}
                  variant="outline"
                >
                  Entrar
                  <LogIn className="h-5 w-5" />
                </Button>

                <Button
                  className="hidden cursor-pointer items-center gap-2 bg-primary-green py-4! text-lg text-white transition-colors hover:bg-primary-green/90 md:flex"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate({ to: "/sign-up" });
                  }}
                >
                  Cadastrar
                </Button>
              </>
            )}

            <ThemeToggle />
          </div>

          <button
            className="text-primary-green-dark md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 cursor-pointer dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 cursor-pointer dark:text-white" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t py-4 md:hidden">
            <div className="flex flex-col items-start gap-4">
              <Button
                className="cursor-pointer text-primary-green-dark dark:text-white text-xl transition-colors hover:font-bold hover:text-primary-green-dark dark:hover:text-white/80"
                onClick={
                  location.pathname === "/"
                    ? () => scrollToSection("intro")
                    : () => navigate({ to: "/" })
                }
                variant="link"
              >
                Início
              </Button>

              <Button
                className="cursor-pointer text-primary-green-dark dark:text-white text-xl transition-colors hover:font-bold hover:text-primary-green-dark dark:hover:text-white/80"
                onClick={
                  location.pathname === "/"
                    ? () => scrollToSection("how-it-works")
                    : () => navigate({ to: "/", hash: "how-it-works" })
                }
                variant="link"
              >
                Como funciona
              </Button>

              <Button
                className="cursor-pointer text-primary-green-dark dark:text-white text-xl transition-colors hover:font-bold hover:text-primary-green-dark dark:hover:text-white/80"
                onClick={
                  location.pathname === "/"
                    ? () => scrollToSection("features")
                    : () => navigate({ to: "/", hash: "features" })
                }
                variant="link"
              >
                Funcionalidades
              </Button>

              <Button
                className="cursor-pointer text-primary-green-dark dark:text-white text-xl transition-colors hover:font-bold hover:text-primary-green-dark dark:hover:text-white/80"
                onClick={
                  location.pathname === "/"
                    ? () => scrollToSection("impacts")
                    : () => navigate({ to: "/", hash: "impacts" })
                }
                variant="link"
              >
                Impactos
              </Button>

              {isAuthenticated ? (
                <>
                  <Button
                    className="flex w-full cursor-pointer items-center gap-2 py-4! text-base"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate({ to: "/admin/dashboard" });
                    }}
                    variant="secondary"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Painel administrativo
                  </Button>

                  <Button
                    className="flex w-full cursor-pointer items-center gap-2 bg-primary-green py-4! text-lg text-white transition-colors hover:bg-primary-green/90"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="flex w-full cursor-pointer items-center gap-2 py-4! text-lg text-primary-green-dark dark:text-white transition-colors hover:text-primary-green-dark/80 dark:hover:text-white/80"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate({ to: "/sign-in" });
                    }}
                    variant="outline"
                  >
                    Entrar
                    <LogIn className="h-5 w-5" />
                  </Button>

                  <Button
                    className="flex w-full cursor-pointer items-center gap-2 bg-primary-green py-4! text-lg text-white transition-colors hover:bg-primary-green/90"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate({ to: "/sign-up" });
                    }}
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
