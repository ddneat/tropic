export interface Test {
  (description: string, fn: Function): void
  only: Test
  skip: Test
}
declare const test: Test;
export default test;
