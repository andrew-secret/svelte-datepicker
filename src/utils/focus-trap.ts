export function handleFocusTrap(event: KeyboardEvent, {element, classNames, isFocusTrapDisabled}): void {
    if (!element || isFocusTrapDisabled) {
      return;
    }

    const focusableElements = element.querySelectorAll(classNames);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];
    const isTabPressed = event.key === "Tab";

    if (!isTabPressed) {
      return;
    }

    /*
      the focusElements.length !== -1 check is needed to ensure that the 
      focusable elements array contains all elements. The reason for 
      this behavior is DOM manipulation due to the year picker.
    */
    if (
      !event.shiftKey &&
      document.activeElement === lastFocusableElement &&
      focusableElements.length !== 1
    ) {
      (firstFocusableElement as HTMLButtonElement).focus();
      event.preventDefault();
    }

    if (
      event.shiftKey &&
      document.activeElement === firstFocusableElement &&
      focusableElements.length !== 1
    ) {
      (lastFocusableElement as HTMLButtonElement).focus();
      event.preventDefault();
    }
  }