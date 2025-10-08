import { useEffect, useState } from "react";

export const useActiveSection = (ids: string[]) => {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleObserve: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      const observer = new IntersectionObserver(handleObserve, {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      });
      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [ids]);

  return activeId;
};
