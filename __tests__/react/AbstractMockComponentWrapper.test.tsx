import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockFunctionComponent from "@lib/MockFunctionComponent";

import MockChildFunctionComponent from "@mocks/function/MockedChildFunctionComponent";
import MockReactiveFunctionComponent from "@mocks/function/MockedReactiveFunctionComponent";

jest.mock("@mocks/function/MockedChildFunctionComponent");
const mockedChildComponent = new MockFunctionComponent(
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

  describe("click", () => {
    it("clicks the component", async () => {
      const mockOnClick = jest.fn();
      mockedChildComponent.mockReturnValue(<div onClick={mockOnClick} />);

      render(<MockReactiveFunctionComponent />);

      await mockedChildComponent.click();

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("clickInstance", () => {
    it("clicks the specified instance of the component", async () => {
      const mockOnClick = jest.fn();
      mockedChildComponent.mockReturnValue(<div onClick={mockOnClick} />);

      render(<MockReactiveFunctionComponent />);

      await mockedChildComponent.clickInstance(0);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("type", () => {
    it("types into the component", async () => {
      const mockTypeValue = "F";

      const mockOnChange = jest.fn();
      mockedChildComponent.mockReturnValue(
        <input onChange={(e) => mockOnChange(e.target.value)} />,
      );

      render(<MockReactiveFunctionComponent />);

      await mockedChildComponent.type(mockTypeValue);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(mockTypeValue);
    });
  });

  describe("typeInstance", () => {
    it("types into the specified instance of the component", async () => {
      const mockTypeValue = "F";

      const mockOnChange = jest.fn();
      mockedChildComponent.mockReturnValue(
        <input onChange={(e) => mockOnChange(e.target.value)} />,
      );

      render(<MockReactiveFunctionComponent />);

      await mockedChildComponent.typeInstance(mockTypeValue, 0);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(mockTypeValue);
    });
  });
});
