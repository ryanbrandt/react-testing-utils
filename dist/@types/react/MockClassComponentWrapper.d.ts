/// <reference types="jest" />
import "@testing-library/jest-dom";
import AbstractMockComponentWrapper from "./AbstractMockComponentWrapper";
declare type ReactClassComponentWithProps<T> = React.ComponentClass<T>;
/**
 * A standard mock class component wrapper
 *
 * @example
 * jest.mock("path/to/my/class/component");
 * const mockMyClassComponent = new MockClassComponentWrapper(MyClassComponent);
 */
declare class MockClassComponentWrapper<T> extends AbstractMockComponentWrapper<T> {
    protected _mock: jest.MockedClass<ReactClassComponentWithProps<T>>;
    constructor(actual: ReactClassComponentWithProps<T>);
    protected _configureMockImplementation: (valueGenerator?: (props: T) => JSX.Element | null) => void;
    /**
     * Not recommended, retrieves the actual mocked component instance
     *
     * Only should be used when truly necessary
     */
    get __OVERRIDE__mock(): jest.MockedClass<ReactClassComponentWithProps<T>>;
    /**
     * Mocks the return value of the render method
     * @param value The value render should return
     */
    mockRenderReturnValue: (value: JSX.Element | null) => void;
    /**
     * Mocks the implementation of the render method
     * @param implementation The implementation to apply to render
     */
    mockRenderImplementation: (implementation: (props: T) => JSX.Element | null) => void;
}
export default MockClassComponentWrapper;
