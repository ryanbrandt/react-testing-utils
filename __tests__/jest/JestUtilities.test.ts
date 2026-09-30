import JestUtilities from "@lib/JestUtilities";

describe("JestUtilities", () => {
  describe("assertAsMockFunction", () => {
    it("returns the same function, typed as a mock function", () => {
      const mockFunction = jest.fn((value: number) => value * 2);

      const mocked = JestUtilities.assertAsMockFunction(mockFunction);
      mocked.mockReturnValue(0);

      expect(mocked).toBe(mockFunction);
      expect(mockFunction(2)).toBe(0);
    });
  });

  describe("assertAsMockClass", () => {
    it("returns the same class, typed as a mock class", () => {
      const MockClass = jest.fn();

      const mocked = JestUtilities.assertAsMockClass(MockClass);

      expect(mocked).toBe(MockClass);
      expect(mocked.mock.instances).toHaveLength(0);
    });
  });
});
