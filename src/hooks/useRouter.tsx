import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEventHandler } from "react";

interface RouterContextValue {
  path: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState<string>(() => (typeof window !== "undefined" ? window.location.pathname : "/"));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath: string) => {
    if (nextPath === path || typeof window === "undefined") return;
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
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
}

export const RouterLink = ({ to, onClick, ...props }: RouterLinkProps) => {
  const { navigate } = useRouter();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    onClick?.(event);
    navigate(to);
  };

  return <a href={to} onClick={handleClick} {...props} />;
};
