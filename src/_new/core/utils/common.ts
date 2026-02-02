export const delay = (time: number) =>
  new Promise<ReturnType<typeof setTimeout>>(resolve => {
    const id = setTimeout(() => resolve(id), time);
  });

export const nextFrame = () => new Promise(requestAnimationFrame);
