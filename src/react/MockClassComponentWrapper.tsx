import "@testing-library/jest-dom";

import JestUtilities from "@lib/jest";
import AbstractMockComponentWrapper from "@lib/react/AbstractMockComponentWrapper";

type ReactClassComponentWithProps<T> = React.ComponentClass<T>;

/**
 * A standard mock class component wrapper
 *
 * @example
 * jest.mock("path/to/my/class/component");
 * const mockMyClassComponent = new MockClassComponentWrapper(MyClassComponent);
 */
class MockClassComponentWrapper<T> extends AbstractMockComponentWrapper<T> {
  protected declare _mock: jest.MockedClass<ReactClassComponentWithProps<T>>;

  constructor(actual: ReactClassComponentWithProps<T>) {
    super();
    this._mock = JestUtilities.assertAsMockClass(actual);

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

export default MockClassComponentWrapper;
