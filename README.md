# react-testing-utils

Wrappers and utilities for unit testing React components with Jest and React Testing Library.

## Usage

```tsx
yarn add @ryanbrandt/react-testing-utils

// or

npm install @ryanbrandt/react-testing-utils
```

**Required Peer Dependencies**

```json
"peerDependencies": {
  "@testing-library/dom": ">=8.13.0",
  "@testing-library/jest-dom": ">=5.14.1",
  "@testing-library/react": ">=12.1.2",
  "@testing-library/user-event": ">=14.1.0",
  "jest": ">=28.1.0",
  "jest-environment-jsdom": ">=28.1.0",
  "react": ">=17.0.2",
  "react-dom": ">=17.0.2",
}
```

## API

### Mocking Function Components

```tsx
jest.mock("path/to/component");
const mockFunctionComponent = new MockFunctionComponent(MyFunctionComponent);
```

### Mocking Class Components

```tsx
jest.mock("path/to/component");
const mockClassComponent = new MockClassComponent(MyClassComponent);
```

### Methods

**Setup**

A setup is provided by default as `<div data-testid={MockComponent.DATA_TEST_ID} />` when instantiated.

However, if a specific setup is needed, you can define your own. Each mock provided mock setup
will be wrapped in a div as follows: `<div data-testid={MockComponent.DATA_TEST_ID}>{MockSetup}</div>`

```tsx
// Function

mockFunctionComponent.mockReturnValue(<div />);
mockFunctionComponent.mockImplementation((props) => <div>{children}</div>);

// Class

mockClassComponent.mockRenderReturnValue(<div />);
mockClassComponent.mockRenderImplementation((props) => (
  <div>{props.children}</div>
));
```

**Getters**

```tsx
it("renders one instance", () => {
  ...
  expect(mockComponent.mockRoot).toBeInTheDocument();
});

it("renders many instances", () => {
  expect(mockComponent.mockRoots.length).toBeGreaterThan(1);
});

```

**Click Interactions**

```tsx

it("does something when clicked", async () => {
  ...
  await mockComponent.click();
});

it("does something when an instance is clicked", async () => {
  ...
  await mockComponent.clickInstance(1);
});

```

**Typing Interactions**

```tsx

it("does something when typed into", async () => {
  ...
  await mockComponent.type("Foo");
});

it("does something when an instance is typed into", async () => {
  ...
  await mockComponent.typeInstance("Foo", 1);
});

```

**Screen Assertions**

```tsx
it("is on the screen", () => {
  ...
  mockComponent.assertOnScreen();
});

it("is not on the screen", () => {
  ...
  mockComponent.assertNotOnScreen();
});

```

**Invocation Assertions**

```tsx
it("is called with what I expect", () => {
  ...
  mockComponent.assertCalledWith({
    foo: "bar",
  });
});

it("is called with what I expect when I expect it", () => {
  ...
  mockComponent.assertNthCalledWith({
    foo: "bar",
  }, 1);
});

it("is last called with what I expect", () => {
  ...
  mockComponent.assertLastCalledWith({
    foo: "bar"
  });
});

```
