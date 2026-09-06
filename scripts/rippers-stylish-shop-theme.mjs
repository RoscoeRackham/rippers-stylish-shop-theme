/* rippers-stylish-shop-theme — auto-apply the Lodge register skin to Stylish
 * Shop's GUILD layout. Look-only: the module's ONLY behaviour is to add the
 * `palette-rippers` class to a Guild shop whose palette is "default", so the
 * bundled CSS (scoped to .theme-grid-guild.palette-rippers) takes effect.
 *
 * AUTO-APPLY (default on) with a per-shop OPT-OUT that needs no extra UI:
 *   - world setting `autoApply` is the master switch (GM, default true);
 *   - a GM opts a single shop out by picking any native Guild palette
 *     (thieves / sacred / druid) in Shop Settings — that puts a palette-* class
 *     on the root, and we then stand aside.
 * No config writes, no DOM rewrites, no mechanics. Enabling the module + leaving
 * a Guild shop on the default palette IS the toggle. */

const MODULE_ID = "rippers-stylish-shop-theme";

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "autoApply", {
    name: "Auto-apply the register skin to Guild shops",
    hint: "When on, any Stylish Shop using the Guild layout on its default palette is skinned in the Lodge register. To opt one shop out, pick a native Guild palette (Thieves / Sacred / Druid) for it in Shop Settings.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });
});

/** Resolve the app's root element across Foundry return shapes. */
function rootEl(element) {
  if (element instanceof HTMLElement) return element;
  if (element && element[0] instanceof HTMLElement) return element[0]; // jQuery
  return null;
}

function skin(el) {
  if (!el?.classList?.contains("theme-grid-guild")) return;        // Guild layout only
  const hasNativePalette = [...el.classList].some(c => c.startsWith("palette-") && c !== "palette-rippers");
  if (hasNativePalette) { el.classList.remove("palette-rippers"); return; } // opt-out: GM chose a native palette
  if (!game.settings.get(MODULE_ID, "autoApply")) { el.classList.remove("palette-rippers"); return; }
  el.classList.add("palette-rippers");
  // Guild pins its old seal-red as an inline --ss-accent-override on the root, which
  // the charter wordmark accent reads first; strip it so the accent falls to register blood.
  el.style.removeProperty("--ss-accent-override");
}

// Foundry V2 fires render<ClassName>; the Stylish Shop storefront is ShopApp.
Hooks.on("renderShopApp", (_app, element) => {
  const el = rootEl(element);
  if (el) skin(el);
});

Hooks.once("ready", () => {
  const mod = game.modules.get(MODULE_ID);
  if (mod) mod.api = { version: mod.version, skin, MODULE_ID };
  console.log(`${MODULE_ID} | ready — register skin ${game.settings.get(MODULE_ID, "autoApply") ? "auto-applying" : "off"} for Guild shops`);
});
