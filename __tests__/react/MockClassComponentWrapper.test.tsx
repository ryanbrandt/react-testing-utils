import { render, screen } from "@testing-library/react";

import MockClassComponent from "@lib/MockClassComponent";

import MockedClassComponent from "@mocks/class/MockedClassComponent";
import MockedChildClassComponent from "@mocks/class/MockedChildClassComponent";

jest.mock("@mocks/class/MockedChildClassComponent");
const mockedChildComponent = new MockClassComponent(MockedChildClassComponent);

describe("MockClassComponentWrapper", () => {
  describe("constructor", () => {
    it("provides a default stub with the generated test id", () => {
      render(<MockedClassComponent />);

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
      render(<MockedClassComponent />);

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

      render(<MockedClassComponent />);

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

      render(<MockedClassComponent />);

      expect(
        screen.getByTestId(mockedChildComponent.DATA_TEST_ID).firstChild
          .textContent,
      ).toEqual("World");
    });
  });
});
