import "@testing-library/jest-dom";

import AbstractMockComponent from "@lib/AbstractMockComponent";

type ReactClassComponentWithProps<T> = React.ComponentClass<T>;

/**
 * A standard mock class component
 *
 * @example
 * jest.mock("path/to/my/class/component");
 * const mockMyClassComponent = new MockClassComponent(MyClassComponent);
 */
class MockClassComponent<T> extends AbstractMockComponent<T> {
  protected declare _mock: jest.MockedObject<ReactClassComponentWithProps<T>>;

  constructor(actual: ReactClassComponentWithProps<T>) {
    super();
    this._mock = jest.mocked(actual);

    this._configureMockImplementation();
  }

  protected _configureMockImplementation = (
    valueGenerator?: (props: T) => JSX.Element | null,
  ): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._mock.mockImplementation((props) => {
      this.receivedProps = props;

      return {
        render: () => (
          <div data-testid={this.DATA_TEST_ID}>
            {valueGenerator && valueGenerator(props)}
          </div>
        ),
      };
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
   * Mocks the return value of the render method
   * @param value The value render should return
   */
  mockRenderReturnValue = (value: JSX.Element | null): void => {
    this._configureMockImplementation(() => value);
  };

  /**
   * Mocks the implementation of the render method
   * @param implementation The implementation to apply to render
   */
  mockRenderImplementation = (
    implementation: (props: T) => JSX.Element | null,
  ): void => {
    this._configureMockImplementation((props) => implementation(props));
  };
}

export default MockClassComponent;
