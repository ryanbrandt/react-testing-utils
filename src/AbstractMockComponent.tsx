import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Abstract base mock component class
 */
abstract class AbstractMockComponent<T> {
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
   * always be a div with this.DATA_TEST_ID applied
   *
   * If more than one instance of the component or no instances of the component
   * are on the screen this method will throw
   *
   * @see mockRoots
   */
  get mockRoot() {
    return screen.getByTestId(this.DATA_TEST_ID);
  }

  /**
   * Retrieves the root elements of all of the mocked component instances, which will
   * always be a div with this.DATA_TEST_ID applied
   *
   * Can be used when one or many instances of the mock component exist on the screen.
   * If no instances exist this method will throw
   *
   * @see mockRoot
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

  /**
   * Clicks the root element defined in the mock component's return value/implementation
   * This method will throw if no or more than a single instance of the mock component
   * exists on the screen
   *
   * @param root The root element to click
   * @default this.mockRoot.firstChild
   *
   * @see clickInstance
   *
   */
  click = async (
    root = this.mockRoot.firstChild as HTMLElement,
  ): Promise<void> => {
    await userEvent.click(root);
  };

  /**
   * Clicks the root element of a specific instance of the mock component as defined in the
   * mock return value/implementation.This method will throw if the provided index is not found.
   *
   * @param instanceIndex The index of the instance which should be clicked
   *
   * @see click
   *
   */
  clickInstance = async (instanceIndex: number): Promise<void> => {
    await this.click(this.mockRoots[instanceIndex].firstChild as HTMLElement);
  };

  /**
   * Types into the root element of your mock. This method will throw if the root element
   * does not support typing or if there are none or mulitple instances of the mock on the
   * screen.
   *
   * @param value The value to type
   * @param root The root element to type into
   * @default this.mockRoot.firstChild
   *
   * @see typeInstance
   */
  type = async (
    value: string,
    root = this.mockRoot.firstChild as HTMLElement,
  ): Promise<void> => {
    await userEvent.type(root, value);
  };

  /**
   * Types into the root element of a specific instance of the mock component. This method will throw
   * if the root element does not support typing or if the provided instance index is not found.
   *
   * @param value The value to type
   * @param instanceIndex The index of the instance to type into
   */
  typeInstance = async (
    value: string,
    instanceIndex: number,
  ): Promise<void> => {
    await this.type(
      value,
      this.mockRoots[instanceIndex].firstChild as HTMLElement,
    );
  };
}

export default AbstractMockComponent;
