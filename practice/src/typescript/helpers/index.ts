export const bindEvent = (target: EventTarget | null, type: string, callback: EventListener): void => {
  target?.addEventListener(type, callback);
};
