import { useEffect } from "react";
import { SITE_TITLE } from "../constants";

export function useTypingTitle() {
  useEffect(() => {
    const text = SITE_TITLE;
    const typeSpeed = 220;
    const deleteSpeed = 220;
    const pauseAfterType = 500;
    const pauseAfterDelete = 500;

    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (!deleting) {
        i++;
        document.title = text.slice(0, i);
        if (i === text.length) {
          deleting = true;
          timer = setTimeout(tick, pauseAfterType);
        } else {
          timer = setTimeout(tick, typeSpeed);
        }
      } else {
        i--;
        document.title = text.slice(0, i) || "\u200B";
        if (i === 0) {
          deleting = false;
          timer = setTimeout(tick, pauseAfterDelete);
        } else {
          timer = setTimeout(tick, deleteSpeed);
        }
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, []);
}
