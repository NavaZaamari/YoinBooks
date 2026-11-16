import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ComingSoon } from "@/components/yoin/ComingSoon";
import { COMING_SOON_ENABLED } from "@/lib/coming-soon";
import { LangProvider } from "@/lib/i18n";

const renderLock = (enabled: boolean, onClick = vi.fn()) => {
  render(
    <LangProvider>
      <ComingSoon enabled={enabled} layoutClassName="mt-8">
        <button type="button" onClick={onClick}>
          ثبت‌نام
        </button>
      </ComingSoon>
    </LangProvider>,
  );
  return {
    onClick,
    button: screen.getByRole("button", { name: /ثبت‌نام/ }),
    wrapper: document.querySelector("[data-coming-soon]") as HTMLElement,
  };
};

describe("coming soon lock", () => {
  it("is switched on until the features launch", () => {
    expect(COMING_SOON_ENABLED).toBe(true);
  });

  it("disables the locked button: no click, no keyboard focus, aria-disabled", () => {
    const { onClick, button } = renderLock(true);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
    expect(button).toHaveClass("coming-soon-locked");
  });

  it("renders the 'به زودی' badge as a body-level overlay, outside the blurred element", () => {
    const { button, wrapper } = renderLock(true);
    const badge = screen.getByText("به زودی");
    // Never a child of the blurred button, nor of the wrapper that holds it: a blur on either
    // (or on a section around them) would soften the sticker.
    expect(button.contains(badge)).toBe(false);
    expect(wrapper.contains(badge)).toBe(false);
    expect(badge.parentElement).toBe(document.body);
    // Pinned to the button's corner in viewport space.
    expect(badge.getAttribute("style")).toMatch(/top:/);
    expect(badge).toHaveAttribute("lang", "fa");
  });

  it("leaves the button untouched when the flag is off", () => {
    const { onClick, button } = renderLock(false);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).toHaveClass("mt-8");
    expect(screen.queryByText("به زودی")).toBeNull();
  });
});
