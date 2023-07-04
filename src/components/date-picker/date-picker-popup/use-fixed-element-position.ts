import { RefObject, useCallback, useState } from "react";

interface Position {
  left: number;
  top: number;
}

interface UseFixedElementPositionParams {
  anchorRef: RefObject<HTMLElement>;
  marginFromAnchor?: number;
}

export function useFixedElementPosition({
  anchorRef,
  marginFromAnchor = 16,
}: UseFixedElementPositionParams) {
  const [position, setPosition] = useState<Position>({ left: 0, top: 0 });

  const floatingElementRef = useCallback(
    (node: HTMLElement | null) => {
      const anchorRect = anchorRef.current?.getBoundingClientRect();
      if (!anchorRect) {
        setPosition({ left: 0, top: 0 });
        return;
      }
      const basePosition = {
        left: anchorRect.left + marginFromAnchor,
        top: anchorRect.top + anchorRect.height + marginFromAnchor,
      };
      const shift = { left: 0, top: 0 };

      if (node) {
        const elementRect = node.getBoundingClientRect();
        const overflowX =
          basePosition.left +
          marginFromAnchor +
          elementRect.width -
          window.innerWidth;
        const overflowY =
          basePosition.top +
          marginFromAnchor +
          elementRect.height -
          window.innerHeight;
        shift.left = Math.max(overflowX, 0);
        shift.top = Math.max(overflowY, 0);
      }

      setPosition({
        left: anchorRect.left + marginFromAnchor - shift.left,
        top: anchorRect.top + anchorRect.height + marginFromAnchor - shift.top,
      });
    },
    [anchorRef, marginFromAnchor]
  );

  return { position, floatingElementRef };
}
