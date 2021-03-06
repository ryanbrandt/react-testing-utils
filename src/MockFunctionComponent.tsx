import "@testing-library/jest-dom";

import AbstractMockComponent from "@lib/AbstractMockComponent";

type ReactFunctionComponentWithProps<T> = React.FunctionComponent<T>;

/**
 * A standard mock function component instance
 *
 * @example
 * jest.mock("path/to/my/function/component");
 * const mockMyFunctionComponent = new MockFunctionComponent(MyFunctionComponent);
 */
class MockFunctionComponent<T> extends AbstractMockComponent<T> {
  protected declare _mock: jest.MockedFunction<
    ReactFunctionComponentWithProps<T>
  >;

  constructor(actual: ReactFunctionComponentWithProps<T>) {
    super();
    this._mock = jest.mocked(actual);

    this._configureMockImplementation();
  }

  protected _configureMockImplementation = (
    valueGenerator?: (props: T) => JSX.Element | null,
  ): void => {
    this._mock.mockImplementation((props) => {
      this.receivedProps = props;

      return (
        <div data-testid={this.DATA_TEST_ID}>
          {valueGenerator && valueGenerator(props)}
        </div>
      );
    });
  };

  /**
   * Not recommended, retrieves the actual mocked component instance
   *
   * Only should be used when truly necessary
   */
  get __OVERRIDE__mock() {
    return this._mock;
  }

  /**
   * Mocks the return value of the function component
   * @param value The value the mocked function component should return
   */
  mockReturnValue = (value: JSX.Element | null): void => {
    this._configureMockImplementation(() => value);
  };

  /**
   * Mocks the implementation of the function component
   * @param implementation The implementation to apply to the mock function component
   */
  mockImplementation = (
    implementation: (props: T) => JSX.Element | null,
  ): void => {
    this._configureMockImplementation((props) => implementation(props));
  };
}

export default MockFunctionComponent;
