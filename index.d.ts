export type SyncTestFn = () => void;
export type CallbackTestFn = (done: () => void) => void;
export type AsyncTestFn = () => Promise<any>;
export interface Test {
  (description: string, fn: SyncTestFn | CallbackTestFn | AsyncTestFn): void;
  only: Test;
  skip: Test;
}
declare const test: Test;
export default test;
