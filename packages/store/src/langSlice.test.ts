import { describe, expect, it } from "vitest";
import { langReducer, selectLanguage, setLanguage } from "./langSlice";

describe("langSlice", () => {
  it("idioma inicial é pt", () => {
    const state = langReducer(undefined, { type: "@@INIT" });
    expect(state.current).toBe("pt");
    expect(selectLanguage({ lang: state })).toBe("pt");
  });

  it("muda idioma para en", () => {
    const state = langReducer(undefined, setLanguage("en"));
    expect(state.current).toBe("en");
  });

  it("alterna entre pt e en", () => {
    let state = langReducer(undefined, setLanguage("en"));
    state = langReducer(state, setLanguage("pt"));
    expect(state.current).toBe("pt");
  });
});
