# react-testing-utils

Common wrappers and utilities for unit testing and mocking in React applications with Jest and RTL

## Usage

```tsx
yarn add react-testing-utils

// or

npm install react-testing-utils
```

**Warning:** This project has several required peer dependencies which must be installed in your consuming project

1. `@tesing-library/jest-dom`
2. `@testing-library/react`
3. `jest` (27+)
4. `react` (17+)
5. `react-dom` (17+)

### Example Usage of Key Utilities

```tsx
jest.mock("path/to/your/component");
const mockedMyComponent = new MockFunctionComponentWrapper(MyComponent);

jest.mock("path/to/some/hook");
// resolves to Jest.MockedFunction<typeof useMyHook>;
const mockUseMyHook = JestUtilities.assertAsMockFunction(useMyHook);

describe("SomeOtherComponent", () => {
  it("renders a MyComponent", () => {
    render(<SomeOtherComponent />);

    mockedMyComponent.assertOnScreen();
    mockedMyComponent.assertCalledWith({ someProps: "expected value" });
  });

  describe("when useMyHook does something", () => {
      mockUseMyHook.mockReturnValue("something done");

      render(<SomeOtherComponent />);

      ...
  })
});
```
