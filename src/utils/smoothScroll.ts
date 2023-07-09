import { SMOOTH_SCROLL_DURATION } from "../constants/scroll";

let currentAnimationId: number | null = null;

export const smoothScrollToItem = (element: HTMLDivElement) => {
  if (isInView(element)) return;

  if (currentAnimationId) {
    window.cancelAnimationFrame(currentAnimationId);
  }

  let start: number | null = null;
  let diffY: number;
  let diffX: number;
  let scrollPositionY: number;
  let scrollPositionX: number;

  const step = (timestamp: number) => {
    if (!start) {
      start = timestamp;
      const parentNode = element.parentNode as HTMLElement;
      scrollPositionY = parentNode.scrollTop;
      scrollPositionX = parentNode.scrollLeft;
      const { top: elementOffsetTop, left: elementOffsetLeft } =
        element.getBoundingClientRect();
      const {
        top: scrollOffsetTop,
        left: scrollOffsetLeft,
        height: containerHeight,
        width: containerWidth,
      } = parentNode.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const elementWidth = element.offsetWidth;

      // Y-axis calculations
      if (elementOffsetTop < scrollOffsetTop) {
        // Element is above the visible area
        diffY = elementOffsetTop - scrollOffsetTop;
      } else if (
        elementOffsetTop + elementHeight >
        scrollOffsetTop + containerHeight
      ) {
        // Element is below the visible area
        diffY =
          elementOffsetTop +
          elementHeight -
          (scrollOffsetTop + containerHeight);
      } else {
        // Element is in the visible area
        diffY = 0;
      }

      // X-axis calculations
      if (elementOffsetLeft < scrollOffsetLeft) {
        // Element is to the left of the visible area
        diffX = elementOffsetLeft - scrollOffsetLeft;
      } else if (
        elementOffsetLeft + elementWidth >
        scrollOffsetLeft + containerWidth
      ) {
        // Element is to the right of the visible area
        diffX =
          elementOffsetLeft +
          elementWidth -
          (scrollOffsetLeft + containerWidth);
      } else {
        // Element is in the visible area
        diffX = 0;
      }
    }

    const progress = timestamp - start;
    const percent = Math.min(progress / SMOOTH_SCROLL_DURATION, 1);
    const parentNode = element.parentNode as HTMLElement;
    parentNode.scrollTop = scrollPositionY + diffY * percent;
    parentNode.scrollLeft = scrollPositionX + diffX * percent;

    if (progress < SMOOTH_SCROLL_DURATION) {
      currentAnimationId = window.requestAnimationFrame(step);
    } else {
      currentAnimationId = null;
    }
  };

  currentAnimationId = window.requestAnimationFrame(step);
};

export const isInView = (element: HTMLDivElement): boolean => {
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top;
  const elementBottom = elementRect.bottom;
  const elementLeft = elementRect.left;
  const elementRight = elementRect.right;

  const container = element.parentNode as HTMLElement;
  const containerRect = container.getBoundingClientRect();
  const containerTop = containerRect.top;
  const containerBottom = containerRect.bottom;
  const containerLeft = containerRect.left;
  const containerRight = containerRect.right;

  return (
    elementTop >= containerTop &&
    elementBottom <= containerBottom &&
    elementLeft >= containerLeft &&
    elementRight <= containerRight
  );
};
