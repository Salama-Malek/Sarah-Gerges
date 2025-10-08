import { useCallback, type MouseEvent } from "react";
import { useRouter } from "./useRouter";

const normalizeHash = (hash: string) => (hash.startsWith("#") ? hash : `#${hash}`);

export const useSectionNavigation = () => {
  const { navigate } = useRouter();

  const goToSection = useCallback(
    (hash: string) => {
      const targetHash = normalizeHash(hash);
      navigate("/", { hash: targetHash });
    },
    [navigate]
  );

  const createClickHandler = useCallback(
    (hash: string, callback?: () => void) =>
      (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        callback?.();
        goToSection(hash);
      },
    [goToSection]
  );

  return { goToSection, createClickHandler };
};
