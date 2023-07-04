import { RefObject, useEffect } from "react";

interface UseClickOutsideParams {
  ref: RefObject<HTMLDivElement>;
  cb: () => void;
  active: boolean;
}

function useOutsideClick({ ref, cb, active }: UseClickOutsideParams) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target) && active) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb, active]);
}

export { useOutsideClick };
