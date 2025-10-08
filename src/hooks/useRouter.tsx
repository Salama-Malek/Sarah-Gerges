import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEventHandler, type ReactNode } from "react";

interface RouterContextValue {
  path: string;
  hash: string;
  navigate: (path: string, options?: { hash?: string; replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

const ALLOWED_PATHS = new Set(["/", "/policy"]);

const normalizePath = (pathname: string) => (ALLOWED_PATHS.has(pathname) ? pathname : "/");

const getInitialLocation = () => {
  if (typeof window === "undefined") {
    return { path: "/", hash: "" };
  }
  const hash = window.location.hash;
  const normalizedPath = normalizePath(window.location.pathname);
  if (normalizedPath !== window.location.pathname) {
    window.history.replaceState({}, "", `${normalizedPath}${hash}`);
  }
  return { path: normalizedPath, hash };
};

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [{ path, hash }, setLocation] = useState(getInitialLocation);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handlePopState = () => {
      const nextPath = normalizePath(window.location.pathname);
      const hash = window.location.hash;
      if (nextPath !== window.location.pathname) {
        window.history.replaceState({}, "", `${nextPath}${hash}`);
      }
      setLocation({ path: nextPath, hash });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetHash = hash.startsWith("#") ? hash : `#${hash}`;
    let attempts = 0;
    const maxAttempts = 10;

    const tryScroll = () => {
      const element = document.querySelector<HTMLElement>(targetHash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        requestAnimationFrame(tryScroll);
      }
    };

    requestAnimationFrame(tryScroll);
  }, [path, hash]);

  const navigate = (nextPath: string, options?: { hash?: string; replace?: boolean }) => {
    if (typeof window === "undefined") return;

    const safePath = normalizePath(nextPath);
    const nextHash = options?.hash ?? "";
    const normalizedHash = nextHash && nextHash.startsWith("#") ? nextHash : nextHash ? `#${nextHash}` : "";
    const url = `${safePath}${normalizedHash}`;

    const isSameLocation = path === safePath && hash === normalizedHash;
    if (isSameLocation) return;

    const method = options?.replace ? "replaceState" : "pushState";
    window.history[method]({}, "", url);
    setLocation({ path: safePath, hash: normalizedHash });
  };

  return <RouterContext.Provider value={{ path, hash, navigate }}>{children}</RouterContext.Provider>;
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};

interface RouterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  hash?: string;
  replace?: boolean;
}

export const RouterLink = ({ to, hash, replace, onClick, ...props }: RouterLinkProps) => {
  const { navigate } = useRouter();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    onClick?.(event);
    navigate(to, { hash, replace });
  };

  const href = hash ? `${to}${hash.startsWith("#") ? hash : `#${hash}`}` : to;

  return <a href={href} onClick={handleClick} {...props} />;
};
