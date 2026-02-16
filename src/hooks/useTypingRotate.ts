import { useState, useEffect } from "react";

export function useTypingRotate(words: string[]) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (words.length === 0) return;

    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 400;

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const word = words[wordIdx];

      if (!deleting) {
        charIdx++;
        setDisplay(word.slice(0, charIdx));
        if (charIdx === word.length) {
          deleting = true;
          timer = setTimeout(tick, pauseAfterType);
        } else {
          timer = setTimeout(tick, typeSpeed);
        }
      } else {
        charIdx--;
        setDisplay(word.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          timer = setTimeout(tick, pauseAfterDelete);
        } else {
          timer = setTimeout(tick, deleteSpeed);
        }
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, [words]);

  return display;
}
