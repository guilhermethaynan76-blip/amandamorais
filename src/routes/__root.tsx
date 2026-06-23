import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const TITLE = "Amanda Morais | Influenciadora & Estrategista Digital";
const DESC =
  "Influenciadora de lifestyle e estrategista digital. Publis, parcerias, gestão de redes sociais e consultoria de Instagram para marcas que querem crescer com estratégia.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--dark)] px-4 text-[var(--off-white)]">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-rosa">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm opacity-70">
          O conteúdo que você procura não existe ou foi movido.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--rosa)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--dark)] px-4 text-[var(--off-white)]">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Esta página não carregou</h1>
        <p className="mt-2 text-sm opacity-70">
          Algo deu errado. Tente novamente ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[var(--rosa)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--rosa)]/40 bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--off-white)] hover:bg-[var(--rosa)]/10 transition"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "author", content: "Amanda Morais" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { title: "Lovable App" },
      { property: "og:title", content: "Lovable App" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "description", content: "A website for influencers to showcase their work, attract brand partnerships, and sell digital services." },
      { property: "og:description", content: "A website for influencers to showcase their work, attract brand partnerships, and sell digital services." },
      { name: "twitter:description", content: "A website for influencers to showcase their work, attract brand partnerships, and sell digital services." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4d94f0b5-c575-4b28-9eb2-2ac9ed336033/id-preview-b29bd252--c5c1dc21-7e5c-4508-8a8b-b6ee699702f3.lovable.app-1782245570731.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4d94f0b5-c575-4b28-9eb2-2ac9ed336033/id-preview-b29bd252--c5c1dc21-7e5c-4508-8a8b-b6ee699702f3.lovable.app-1782245570731.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
