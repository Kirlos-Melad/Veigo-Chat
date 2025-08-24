// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Promisify<F extends (...args: any[]) => any> = (
    ...args: Parameters<F>
) => Promise<ReturnType<F>>;
