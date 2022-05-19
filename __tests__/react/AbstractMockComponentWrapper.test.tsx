import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockFunctionComponentWrapper from "@lib/react/MockFunctionComponentWrapper";

import MockChildFunctionComponent from "@mocks/function/MockChildFunctionComponent";
import MockReactiveFunctionComponent from "@mocks/function/MockReactiveFunctionComponent";

jest.mock("@mocks/function/MockChildFunctionComponent");
const mockedChildComponent = new MockFunctionComponentWrapper(
  MockChildFunctionComponent,
);

describe("AbstractMockComponentWrapper", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const clickCountIncrementBtn = (): void => {
    userEvent.click(screen.getByText("Click Me"));
  };

  const clickToggleShowCountBtn = (): void => {
    userEvent.click(screen.getByText("Toggle Show Count"));
  };

  describe("mockRoot getter", () => {
    it("returns the root of the mocked component", () => {
      render(<MockReactiveFunctionComponent />);

      expect(mockedChildComponent.mockRoot).toBeDefined();
      expect(mockedChildComponent.mockRoot.querySelector).toBeDefined();
    });
  });

  describe("mockRoots getter", () => {
    it("returns the roots of the mocked component", () => {
      render(<MockReactiveFunctionComponent />);

      expect(mockedChildComponent.mockRoots).toHaveLength(1);
      expect(mockedChildComponent.mockRoots[0].querySelector).toBeDefined();
    });
  });

  describe("assertCalledWith", () => {
    it("asserts that the component was called with the provided subset of props", () => {
      render(<MockReactiveFunctionComponent />);

      mockedChildComponent.assertCalledWith({ message: "The count is 1" });
    });
  });

  describe("assertLastCalledWith", () => {
    it("asserts that the component was last called with the provided subset of props", () => {
      render(<MockReactiveFunctionComponent />);

      mockedChildComponent.assertLastCalledWith({ message: "The count is 1" });

      clickCountIncrementBtn();

      waitFor(() =>
        mockedChildComponent.assertLastCalledWith({
          message: "The count is 2",
        }),
      );
    });
  });

  describe("assertNthCalledWith", () => {
    it("asserts that the component was nth called with the provided subset of props", () => {
      render(<MockReactiveFunctionComponent />);
      const clicks = [1, 2, 3];

      clicks.forEach(() => clickCountIncrementBtn());
      clicks.forEach((_, i) =>
        waitFor(() =>
          mockedChildComponent.assertNthCalledWith(
            { message: `The count is ${i + 1}` },
            i + 1,
          ),
        ),
      );
    });
  });

  describe("assertOnScreen", () => {
    describe("when allowMultiple is true", () => {
      it("asserts that any number of instances of the component are on the screen", () => {
        render(<MockReactiveFunctionComponent />);

        mockedChildComponent.assertOnScreen();
      });
    });

    describe("when allowMultiple is false", () => {
      it("asserts that only a single instance of the component is on the screen", () => {
        render(<MockReactiveFunctionComponent />);

        mockedChildComponent.assertOnScreen(false);
      });
    });
  });

  describe("assertNotOnScreen", () => {
    it("asserts that the component is not on the screen", () => {
      render(<MockReactiveFunctionComponent />);

      clickToggleShowCountBtn();

      waitFor(() => mockedChildComponent.assertNotOnScreen());
    });
  });
});
