import { render, screen } from "@testing-library/react";

import MockFunctionComponent from "@lib/MockFunctionComponent";

import MockedChildFunctionComponent from "@mocks/function/MockedChildFunctionComponent";
import MockedFunctionComponent from "@mocks/function/MockedFunctionComponent";

jest.mock("@mocks/function/MockedChildFunctionComponent");
const mockedChildComponent = new MockFunctionComponent(
  MockedChildFunctionComponent,
);

describe("MockFunctionComponentWrapper", () => {
  describe("constructor", () => {
    it("provides a default stub with the generated test id", () => {
      render(<MockedFunctionComponent />);

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
      render(<MockedFunctionComponent />);

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

      render(<MockedFunctionComponent />);

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

      render(<MockedFunctionComponent />);

      expect(
        screen.getByTestId(mockedChildComponent.DATA_TEST_ID).firstChild
          .textContent,
      ).toEqual("World");
    });
  });
});
