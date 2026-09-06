# Rippers — Stylish Shop (Slash Register, Guild)

A look-only register skin that dresses **Stylish Shop 2.0.0**'s **Guild layout** (the grid-family
ledger / notice-board) in the Rippers Unmasked *Slash* register. Personal-table module — **not for
redistribution**. Designed against Stylish Shop 2.0.0 + GlitchSmith Library 0.13.0, Foundry V13–V14.

## What it does

Guild is already an 1892 material world (parchment, ink, brass, seal-red, wood, leather, lantern,
serif), so this is a **light re-ink**, not a rebuild:

- **Palette** → parchment becomes bone `#e8dccb`, seal-red becomes register blood `#c8102a`, brass
  becomes gold `#efe0a0`, ink `#0b0607`. The wood board, leather straps/pins, brass frame + rivets,
  lantern glow, pennants, wax seal and the notice-board layout are **kept** — they read 1892 already.
- **Geometry** → radius-0 on the plate rims (round hardware stays round); a hard flat offset shadow on
  the two act-on plates (active category, focused row). Guild's carved-wood material depth is left alone.
- **Type** → Pirata One for the shop wordmark / board headers / category names, Grenze Gotisch for item
  names, IBM Plex Mono (tabular) for every number. Faces are bundled (OFL woff2).
- **Ink prices** → body-size numbers are ink data; **blood is reserved** for the focused/**WANTED**
  card, low / out-of-stock rows, and the active plate (never colour alone — the theme keeps its words).
- **Korean sublabels** hidden for a clean register ledger.

No mechanics, no transactions, no DOM rewrites. It only adds a CSS class; the bundled stylesheet
(scoped to `.ss-shop-app.theme-grid-guild.palette-rippers`) does the rest.

## The toggle & per-shop opt-out

- **Master switch:** module setting **“Auto-apply the register skin to Guild shops”** (world scope,
  **default ON**). Precedent: `rippers-calendaria-theme` applies globally when enabled.
- **Per-shop opt-out (no extra UI):** in **Shop Settings**, pick any **native Guild palette**
  (*Thieves / Sacred / Druid*) for that shop. The skin then stands aside and the native palette shows.
  Leaving a Guild shop on its **default** palette is what opts it *in*.
- Non-Guild layouts/themes are never touched.

## Copy (optional)

The skin handles the whole look. `presets/rippers-guild.json` is an **optional** config-side patch that
re-words the shop's DOM-bound flavour copy (`config.themeData`) to neutral 1892 register text —
`established: "Est. 1892"`, the purse label to **“On Account”** (the ruling frames zenit as the Lodge's
account), and clears the demo Korean/Japanese labels. It is deliberately minimal and invents no lore —
the remaining prose fields are listed for the GM to fill. Apply it by hand in Shop Settings.

## Currency — set once at the world level

Prices are quoted in the currency's own symbol, which comes from the **GlitchSmith Library currency
definition** (a world setting), *not* from a shop's config — so this theme module cannot reach it. The
ruling (`lodge-docs/CURRENCY-zenit-and-sterling.md`) is **1 zenit = 1 penny**. To make the shop quote
1892 sterling:

- **Simple (pence):** in the world's GlitchSmith currency config, set the **zenit symbol to `d`** — since
  1z = 1d, `10z` then reads `10d` with no value change.
- **Full £/s/d:** define zenit as a compound penny/shilling/pound currency (12d = 1s, 240d = £1) for a
  proper sterling breakdown.

The sheet stays in zenit either way — per the ruling, *the world quotes sterling, the sheet quotes
zenit.* This is the one step the module leaves to the GM (Austin sets it in the Forge world).

## Make shops visible to players

Shops are **GM-only by default** (`publicShop: false`) — a player's Shop Directory is empty until you
opt a shop in. To let players browse and buy a shop on their own, turn on that shop's **Public / show
in player directory** toggle in Shop Settings (config `publicShop: true`). It then appears in the
player-facing Shop Directory and the GlitchSmith shop browser. Two more things a player needs, both
standard: they must **own a character actor** (their PC) to buy with, and — because Stylish Shop runs
every transaction through the active GM — **a GM must be online** when a player makes a purchase
(browsing works with no GM connected). This is world/GM config, not something the skin sets.

`presets/rippers-guild.json` carries `publicShop: true`, so applying that preset to a shop flips it
public along with the register copy. That is safe to bundle because a preset only takes effect when a
GM deliberately applies it to a specific shop — it grants nothing automatically and changes no actor
permissions.

## Verify

Staged and paint-checked in the `e2e-harness` against Stylish Shop 2.0.0: computed palette
(`--parchment #e8dccb`, `--seal-red #c8102a`, `--brass #efe0a0`), fonts (title Pirata, amounts Plex),
radius-0 plates, hidden Korean, and coexistence with `rippers-guise` / `rippers-combat-dock` /
`rippers-calendaria-theme` (no token bleed either way; non-Guild shop themes unaffected).

## Licence

Module code © the author, personal-table use. Bundled faces (Pirata One, Grenze Gotisch, IBM Plex Mono,
Spectral) are SIL Open Font License — free to bundle.
