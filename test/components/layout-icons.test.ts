import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const componentPath = (name: string) => new URL(`../../app/components/${name}.vue`, import.meta.url);

const normalizeMarkup = (markup: string) => markup.replace(/\s+/g, " ").trim();

const anchorForLabel = (component: string, label: string) => {
  const anchorPattern = new RegExp(
    `<a\\b(?=[^>]*aria-label="${label}")[\\s\\S]*?<\\/a>`,
  );
  const anchor = component.match(anchorPattern)?.[0];
  assert.ok(anchor, `Expected ${label} link to exist`);

  return anchor;
};

const svgForLabel = (component: string, label: string) => {
  const anchor = anchorForLabel(component, label);

  const svg = anchor.match(/<svg\b[\s\S]*?<\/svg>/)?.[0];
  assert.ok(svg, `Expected ${label} link to include an SVG icon`);

  return normalizeMarkup(svg);
};

const hrefForLabel = (component: string, label: string) => {
  const anchor = anchorForLabel(component, label);

  const href = anchor.match(/\bhref="([^"]+)"/)?.[1];
  assert.ok(href, `Expected ${label} link to include href`);

  return href;
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

  it("routes Telegram-labeled icons to e-mail and e-mail-labeled icons to Telegram", async () => {
    const [header, footer] = await Promise.all([
      readFile(componentPath("LayoutHeader"), "utf8"),
      readFile(componentPath("LayoutFooter"), "utf8"),
    ]);

    for (const component of [header, footer]) {
      assert.equal(hrefForLabel(component, "Telegram"), "mailto:sergbeu18@gmail.com");
      assert.equal(hrefForLabel(component, "E-mail"), "https://t.me/sergeeva_anastasiiia");
    }
  });
});
