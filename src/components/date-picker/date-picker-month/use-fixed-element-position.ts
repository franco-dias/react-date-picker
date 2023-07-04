import { RefObject, useEffect, useLayoutEffect, useState } from "react";

interface Position {
  left: number;
  top: number;
}

interface UseFixedElementPositionParams {
  elementRef: RefObject<HTMLElement>;
  triggerRef: RefObject<HTMLElement>;
  isDisplayed: boolean;
}

export function useFixedElementPosition({
  elementRef,
  triggerRef,
}: UseFixedElementPositionParams) {
  const position = { left: 0, top: 0 };
  const adjustment = {
    left: 0,
    top: 0,
  };

  if (elementRef.current) {
    const elementRect = elementRef.current?.getBoundingClientRect();
    const overflowX =
      elementRect.left + elementRect.width - window.innerWidth + 16;
    const overflowY =
      elementRect.top + elementRect.height - window.innerHeight + 16;
    adjustment.left = Math.max(overflowX, 0);
    adjustment.top = Math.max(overflowY, 0);
  }

  const inputRect = triggerRef.current?.getBoundingClientRect();

  if (!inputRect) return position;

  position.left = inputRect.left + 16 - adjustment.left;
  position.top = inputRect.top + inputRect.height + 16 - adjustment.top;

  return position;
}
