/// <reference types="jest" />
import "@testing-library/jest-dom";
/**
 * Abstract base mock component wrapper class
 */
declare abstract class AbstractMockComponentWrapper<T> {
    protected _mock: jest.Mocked<unknown>;
    receivedProps: T;
    /**
     * The data-testid applied to the component mocks
     */
    DATA_TEST_ID: string;
    constructor();
    private _buildPropsExpectation;
    /**
     * Retrieves the root element of the mocked component, which will
     * always be a div with the component data-testid applied
     *
     * Should only be used when one instance of the mock component is on the screen
     */
    get mockRoot(): HTMLElement;
    /**
     * Retrieves the root elements of all of the mocked component instances, which will
     * always be a div with the component data-testid applied
     *
     * Can be used when multiple instances of the mock component are on the screen
     */
    get mockRoots(): HTMLElement[];
    /**
     * Asserts that the mock component was called with the provided subset of props
     * @param props The subset of props to match against
     */
    assertCalledWith: (props: Partial<T>) => void;
    /**
     * Asserts that the mock component was last called with the provided subset of props
     * @param props The subset of props to match against
     */
    assertLastCalledWith: (props: Partial<T>) => void;
    /**
     * Asserts that the mock component was nth called with the provided subset of props
     * @param props The subset of props to match against
     * @param n The render number to check against
     */
    assertNthCalledWith: (props: Partial<T>, n: number) => void;
    /**
     * Asserts that an instance of the component exists within the document
     * @param allowMultiple Optional boolean to allow for multiple instances
     * of the component to exist. When set false, if more than 1 instance
     * of the component is on the screen this assertion will fail.
     * @default true
     */
    assertOnScreen: (allowMultiple?: boolean) => void;
    /**
     * Asserts that the component is not currently rendered within the document
     */
    assertNotOnScreen: () => void;
}
export default AbstractMockComponentWrapper;
