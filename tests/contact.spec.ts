import { test, expect } from "@playwright/test";

// Smoke test for docs/TEST-CASES.md TC-05-01 / TC-05-02 (F-05 Contact).
test.describe("Contact section", () => {
  test("mailto CTA opens with the correct prefilled address", async ({
    page,
  }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: "Email me" });
    await expect(cta).toHaveAttribute(
      "href",
      /^mailto:vickyir300401@gmail\.com\?subject=/,
    );
  });

  test("email address is visible as selectable text, independent of the CTA", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("vickyir300401@gmail.com")).toBeVisible();
  });
});
