import { render, screen } from "@testing-library/react";

import MockFunctionComponentWrapper from "@lib/react/MockFunctionComponentWrapper";

import MockChildFunctionComponent from "@mocks/function/MockChildFunctionComponent";
import MockFunctionComponent from "@mocks/function/MockFunctionComponent";

jest.mock("@mocks/function/MockChildFunctionComponent");
const mockedChildComponent = new MockFunctionComponentWrapper(
  MockChildFunctionComponent,
);

describe("MockFunctionComponentWrapper", () => {
  describe("constructor", () => {
    it("provides a default stub with the generated test id", () => {
      render(<MockFunctionComponent />);

      expect(
        screen.getByTestId(mockedChildComponent.DATA_TEST_ID),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(mockedChildComponent.DATA_TEST_ID).firstChild,
      ).toBeNull();
    });
  });

  describe("__OVERRIDE__mock getter", () => {
    it("returns the actual mock object for overriding behavior", () => {
      render(<MockFunctionComponent />);

      expect(
        mockedChildComponent.__OVERRIDE__mock.mockReturnValue,
      ).toBeDefined();
    });
  });

  describe("mockReturnValue", () => {
    it("mocks the return value of the functional component", () => {
      const mockContent = "Content";
      const mockReturnValue = <div>{mockContent}</div>;
      mockedChildComponent.mockReturnValue(mockReturnValue);

      render(<MockFunctionComponent />);

      expect(
        screen.getByTestId(mockedChildComponent.DATA_TEST_ID).firstChild
          .textContent,
      ).toEqual(mockContent);
    });
  });

  describe("mockImplementation", () => {
    it("mocks the implementation of the functional component", () => {
      mockedChildComponent.mockImplementation((props) => {
        const { message } = props;

        return <div>{message}</div>;
      });

      render(<MockFunctionComponent />);

      expect(
        screen.getByTestId(mockedChildComponent.DATA_TEST_ID).firstChild
          .textContent,
      ).toEqual("World");
    });
  });
});
