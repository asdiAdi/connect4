import { intToString } from "./string";

describe("intToString test cases", () => {
  it("should return proper lower case string", () => {
    expect(intToString(1)).toBe("a");
    expect(intToString(26)).toBe("z");
  });
  it("should return proper upper case string", () => {
    expect(intToString(1, "u")).toBe("A");
    expect(intToString(26, "u")).toBe("Z");
  });

  it("should throw error on Invalid number", () => {
    expect(() => intToString(0)).toThrow();
    expect(() => intToString(27)).toThrow();
  });
});
