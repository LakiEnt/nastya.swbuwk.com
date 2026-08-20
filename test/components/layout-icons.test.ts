import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const componentPath = (name: string) => new URL(`../../app/components/${name}.vue`, import.meta.url);

const normalizeMarkup = (markup: string) => markup.replace(/\s+/g, " ").trim();

const svgForLabel = (component: string, label: string) => {
  const anchorPattern = new RegExp(
    `<a\\b(?=[\\s\\S]*?aria-label="${label}")[\\s\\S]*?<\\/a>`,
  );
  const anchor = component.match(anchorPattern)?.[0];
  assert.ok(anchor, `Expected ${label} link to exist`);

  const svg = anchor.match(/<svg\b[\s\S]*?<\/svg>/)?.[0];
  assert.ok(svg, `Expected ${label} link to include an SVG icon`);

  return normalizeMarkup(svg);
};

describe("layout social icons", () => {
  it("uses the same Telegram and e-mail SVG icons in the header and footer", async () => {
    const [header, footer] = await Promise.all([
      readFile(componentPath("LayoutHeader"), "utf8"),
      readFile(componentPath("LayoutFooter"), "utf8"),
    ]);

    assert.equal(svgForLabel(footer, "Telegram"), svgForLabel(header, "Telegram"));
    assert.equal(svgForLabel(footer, "E-mail"), svgForLabel(header, "E-mail"));
  });
});
