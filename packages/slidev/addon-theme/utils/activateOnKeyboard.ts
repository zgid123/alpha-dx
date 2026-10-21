/** Dispatch the same click event for Enter and Space on a focused control. */
export function activateOnKeyboard(event: KeyboardEvent): void {
  if (
    event.target !== event.currentTarget ||
    (event.key !== 'Enter' && event.key !== ' ')
  ) {
    return;
  }

  event.preventDefault();
  event.currentTarget?.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true }),
  );
}
