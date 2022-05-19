/// <reference types="jest" />
import "@testing-library/jest-dom";
import AbstractMockComponentWrapper from "./AbstractMockComponentWrapper";
declare type ReactFunctionComponentWithProps<T> = React.FunctionComponent<T>;
/**
 * A standard mock function component wrapper
 *
 * @example
 * jest.mock("path/to/my/function/component");
 * const mockMyFunctionComponent = new MockFunctionComponentWrapper(MyFunctionComponent);
 */
declare class MockFunctionComponentWrapper<T> extends AbstractMockComponentWrapper<T> {
    protected _mock: jest.MockedFunction<ReactFunctionComponentWithProps<T>>;
    constructor(actual: ReactFunctionComponentWithProps<T>);
    protected _configureMockImplementation: (valueGenerator?: (props: T) => JSX.Element | null) => void;
    /**
     * Not recommended, retrieves the actual mocked component instance
     *
     * Only should be used when truly necessary
     */
    get __OVERRIDE__mock(): jest.MockedFunction<ReactFunctionComponentWithProps<T>>;
    /**
     * Mocks the return value of the function component
     * @param value The value the mocked function component should return
     */
    mockReturnValue: (value: JSX.Element | null) => void;
    /**
     * Mocks the implementation of the function component
     * @param implementation The implementation to apply to the mock function component
     */
    mockImplementation: (implementation: (props: T) => JSX.Element | null) => void;
}
export default MockFunctionComponentWrapper;
