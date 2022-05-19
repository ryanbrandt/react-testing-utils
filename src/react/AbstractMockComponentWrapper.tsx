import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

/**
 * Abstract base mock component wrapper class
 */
abstract class AbstractMockComponentWrapper<T> {
  protected _mock: jest.Mocked<unknown>;

  receivedProps: T;

  /**
   * The data-testid applied to the component mocks
   */
  DATA_TEST_ID: string;

  constructor() {
    this.DATA_TEST_ID = Math.random().toString(36).slice(2);
  }

  // eslint-disable-next-line class-methods-use-this
  private _buildPropsExpectation = (props: Partial<T>) => [
    expect.objectContaining({
      ...props,
    }),
    expect.anything(),
  ];

  /**
   * Retrieves the root element of the mocked component, which will
   * always be a div with the component data-testid applied
   *
   * Should only be used when one instance of the mock component is on the screen
   */
  get mockRoot() {
    return screen.getByTestId(this.DATA_TEST_ID);
  }

  /**
   * Retrieves the root elements of all of the mocked component instances, which will
   * always be a div with the component data-testid applied
   *
   * Can be used when multiple instances of the mock component are on the screen
   */
  get mockRoots() {
    return screen.getAllByTestId(this.DATA_TEST_ID);
  }

  /**
   * Asserts that the mock component was called with the provided subset of props
   * @param props The subset of props to match against
   */
  assertCalledWith = (props: Partial<T>): void => {
    expect(this._mock).toHaveBeenCalledWith(
      ...this._buildPropsExpectation(props),
    );
  };

  /**
   * Asserts that the mock component was last called with the provided subset of props
   * @param props The subset of props to match against
   */
  assertLastCalledWith = (props: Partial<T>): void => {
    expect(this._mock).toHaveBeenLastCalledWith(
      ...this._buildPropsExpectation(props),
    );
  };

  /**
   * Asserts that the mock component was nth called with the provided subset of props
   * @param props The subset of props to match against
   * @param n The render number to check against
   */
  assertNthCalledWith = (props: Partial<T>, n: number): void => {
    expect(this._mock).toHaveBeenNthCalledWith(
      n,
      ...this._buildPropsExpectation(props),
    );
  };

  /**
   * Asserts that an instance of the component exists within the document
   * @param allowMultiple Optional boolean to allow for multiple instances
   * of the component to exist. When set false, if more than 1 instance
   * of the component is on the screen this assertion will fail.
   * @default true
   */
  assertOnScreen = (allowMultiple = true): void => {
    if (allowMultiple) {
      expect(this.mockRoots.length).toBeGreaterThanOrEqual(1);
    } else {
      expect(this.mockRoot).toBeInTheDocument();
    }
  };

  /**
   * Asserts that the component is not currently rendered within the document
   */
  assertNotOnScreen = (): void => {
    expect(() => this.mockRoot).toThrow();
  };
}

export default AbstractMockComponentWrapper;
