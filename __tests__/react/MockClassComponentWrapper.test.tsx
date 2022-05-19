import { render, screen } from "@testing-library/react";

import MockClassComponentWrapper from "@lib/react/MockClassComponentWrapper";

import MockClassComponent from "@mocks/class/MockClassComponent";
import MockChildClassComponent from "@mocks/class/MockChildClassComponent";

jest.mock("@mocks/class/MockChildClassComponent");
const mockedChildComponent = new MockClassComponentWrapper(
  MockChildClassComponent,
);

describe("MockClassComponentWrapper", () => {
  describe("constructor", () => {
    it("provides a default stub with the generated test id", () => {
      render(<MockClassComponent />);

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
      render(<MockClassComponent />);

      expect(
        mockedChildComponent.__OVERRIDE__mock.mockReturnValue,
      ).toBeDefined();
    });
  });

  describe("mockRenderReturnValue", () => {
    it("mocks the return value of the class component render method", () => {
      const mockContent = "Content";
      const mockValue = <div>{mockContent}</div>;
      mockedChildComponent.mockRenderReturnValue(mockValue);

      render(<MockClassComponent />);

      expect(
        screen.getByTestId(mockedChildComponent.DATA_TEST_ID).firstChild
          .textContent,
      ).toEqual(mockContent);
    });
  });

  describe("mockRenderImplementation", () => {
    it("mocks the implementation of the class component render method", () => {
      mockedChildComponent.mockRenderImplementation((props) => {
        const { message } = props;

        return <div>{message}</div>;
      });

      render(<MockClassComponent />);

      expect(
        screen.getByTestId(mockedChildComponent.DATA_TEST_ID).firstChild
          .textContent,
      ).toEqual("World");
    });
  });
});
