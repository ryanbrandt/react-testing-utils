import { render } from "@testing-library/react";

import MockFunctionComponent from "@lib/MockFunctionComponent";

import MockedChildFunctionComponent from "@mocks/function/MockedChildFunctionComponent";
import MockedFunctionComponent from "@mocks/function/MockedFunctionComponent";

jest.mock("@mocks/function/MockedChildFunctionComponent");
const mockedChildComponent = new MockFunctionComponent(
  MockedChildFunctionComponent,
);

// React 18 calls a function component as Component(props, secondArg) where
// secondArg is a legacy context or ref object; React 19 passes `undefined`.
// The call assertions must match the props argument only.
const callMock = (message: string, secondArg: unknown) =>
  // Typed as jest.Mock: @types/react 19 components take a single argument.
  (mockedChildComponent.__OVERRIDE__mock as jest.Mock)({ message }, secondArg);

describe("function component call assertions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when rendered by React", () => {
    it("match the rendered props", () => {
      render(<MockedFunctionComponent />);

      mockedChildComponent.assertCalledWith({ message: "World" });
      mockedChildComponent.assertLastCalledWith({ message: "World" });
      mockedChildComponent.assertNthCalledWith({ message: "World" }, 1);
    });
  });

  describe.each([
    ["undefined (React 19)", undefined],
    ["an object (React 18)", {}],
  ])("when the second argument is %s", (_, secondArg) => {
    it("match only the props argument", () => {
      callMock("First", secondArg);
      callMock("Last", secondArg);

      mockedChildComponent.assertCalledWith({ message: "First" });
      mockedChildComponent.assertLastCalledWith({ message: "Last" });
      mockedChildComponent.assertNthCalledWith({ message: "First" }, 1);
    });
  });

  it("fail when no call has the props", () => {
    callMock("First", undefined);
    callMock("Last", undefined);

    expect(() =>
      mockedChildComponent.assertCalledWith({ message: "Other" }),
    ).toThrow();
    expect(() =>
      mockedChildComponent.assertLastCalledWith({ message: "First" }),
    ).toThrow();
    expect(() =>
      mockedChildComponent.assertNthCalledWith({ message: "Last" }, 1),
    ).toThrow();
    expect(() =>
      mockedChildComponent.assertNthCalledWith({ message: "First" }, 3),
    ).toThrow();
  });

  // Before Jest 30, expect(undefined).toEqual(objectContaining({})) passes,
  // so a missing call must fail explicitly even with empty expected props.
  it("fail for a call that never happened, even with empty props", () => {
    expect(() => mockedChildComponent.assertLastCalledWith({})).toThrow(
      "called 0 time(s)",
    );

    callMock("First", undefined);

    expect(() => mockedChildComponent.assertNthCalledWith({}, 0)).toThrow(
      "Expected a call #0",
    );
    expect(() => mockedChildComponent.assertNthCalledWith({}, 2)).toThrow(
      "called 1 time(s)",
    );
  });
});
