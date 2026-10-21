import { activateOnKeyboard } from '../../utils/activateOnKeyboard';

describe('activateOnKeyboard', () => {
  const OriginalMouseEvent = globalThis.MouseEvent;

  beforeAll(() => {
    globalThis.MouseEvent = Event as unknown as typeof MouseEvent;
  });

  afterAll(() => {
    globalThis.MouseEvent = OriginalMouseEvent;
  });

  it.each(['Enter', ' '])('dispatches a click for %s', (key) => {
    const target = new EventTarget();
    let clicks = 0;
    target.addEventListener('click', () => {
      clicks += 1;
    });
    const event = {
      key,
      target,
      currentTarget: target,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    activateOnKeyboard(event);

    expect(clicks).toBe(1);
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });

  it('ignores other keys and keyboard events from descendants', () => {
    const target = new EventTarget();
    const click = vi.fn();
    target.addEventListener('click', click);
    const event = {
      key: 'Escape',
      target,
      currentTarget: target,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    activateOnKeyboard(event);
    activateOnKeyboard({ ...event, key: 'Enter', target: new EventTarget() });

    expect(click).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
