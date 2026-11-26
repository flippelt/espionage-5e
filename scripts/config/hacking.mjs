/**
 * Hacking replaces spellcasting.
 *
 * Rather than registering a second spellcasting method next to the dnd5e
 * "spell" method, the "spell" method itself is repurposed: there is no other
 * kind of casting in the game, and every part of dnd5e that special-cases
 * "spell" (the sheet's spell tab, slot preparation, rest recovery, multiclass
 * progression) then keeps working unchanged.
 *
 *   spell item           → program (hacking tool or firewall)
 *   spell level 1–5      → program caliber 1–5
 *   spell level 0        → hacking action (Attack, Bypass, Modify, Patch)
 *   spell slot           → executable slot of the personal OS
 *   spell school         → program type (brute-force attack, scanner, …)
 *   spellcasting ability → hacking ability (Intelligence)
 */

export const MODULE_ID = "espionage-5e";

/** Highest caliber any program, OS, firewall, or gadget can have. */
export const MAX_CALIBER = 5;

/**
 * Executable slots per Hacker level (index 0 = 1st level). Each inner array
 * lists the number of slots of caliber 1, 2, 3, … at that level.
 */
export const EXECUTABLE_SLOT_TABLE = [
  [2],
  [2],
  [2, 1],
  [3, 1],
  [3, 2],
  [3, 2],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1, 1],
  [3, 2, 1, 1],
  [3, 2, 2, 1],
  [3, 2, 2, 1],
  [4, 2, 2, 1, 1],
  [4, 2, 2, 1, 1],
  [4, 3, 2, 1, 1],
  [4, 3, 2, 1, 1]
];

/**
 * Operating system statistics by caliber, used for target devices. The
 * hacker's own personal OS derives AC and HP from Intelligence instead
 * (see os.mjs).
 */
export const OPERATING_SYSTEMS = {
  1: { ac: 11, hp: 5, formula: "1d8+1", slots: 1 },
  2: { ac: 13, hp: 12, formula: "2d8+4", slots: 2 },
  3: { ac: 15, hp: 18, formula: "3d8+6", slots: 3 },
  4: { ac: 17, hp: 30, formula: "4d8+12", slots: 4 },
  5: { ac: 21, hp: 38, formula: "5d8+15", slots: 5 }
};

/** Hacker level at which the personal OS reaches each caliber. */
export const PERSONAL_OS_CALIBER_LEVELS = { 1: 1, 2: 4, 3: 8, 4: 13, 5: 17 };

/** Program types, replacing the eight schools of magic. */
export const PROGRAM_TYPES = {
  bfa: { label: "ESPIONAGE5E.ProgramType.BruteForce", fullKey: "bruteForceAttack" },
  enc: { label: "ESPIONAGE5E.ProgramType.Encryption", fullKey: "encryption" },
  key: { label: "ESPIONAGE5E.ProgramType.Keylogger", fullKey: "keylogger" },
  rkt: { label: "ESPIONAGE5E.ProgramType.Rootkit", fullKey: "rootkit" },
  scn: { label: "ESPIONAGE5E.ProgramType.Scanner", fullKey: "scanner" },
  spy: { label: "ESPIONAGE5E.ProgramType.Spyware", fullKey: "spyware" },
  mal: { label: "ESPIONAGE5E.ProgramType.Malware", fullKey: "malware" },
  fwl: { label: "ESPIONAGE5E.ProgramType.Firewall", fullKey: "firewall" },
  hka: { label: "ESPIONAGE5E.ProgramType.HackingAction", fullKey: "hackingAction" }
};

/**
 * Apply the hacking configuration to CONFIG.DND5E. Runs during `init`, after
 * the dnd5e system's own init and before its `i18nInit` turns
 * CONFIG.DND5E.spellcasting into data models.
 */
export function configureHacking() {
  const cfg = CONFIG.DND5E;

  // The repurposed "spell" method. Its other progressions (half, third,
  // artificer) and the pact/ritual methods stay registered even though no
  // class uses them: dnd5e code reads them directly (legacy rules adjust
  // `progression.half`, the favorites bar falls back to `pact.img`).
  const spell = cfg.spellcasting.spell;
  spell.label = "ESPIONAGE5E.Hacking.Label";
  spell.img = `modules/${MODULE_ID}/icons/program.svg`;
  spell.table = EXECUTABLE_SLOT_TABLE;
  spell.cantrips = true;
  spell.prepares = true;
  spell.progression.full.label = "ESPIONAGE5E.Hacking.Progression";

  // Program calibers. dnd5e keeps levels 6–9 in its schemas, so they stay
  // registered (no table ever grants slots for them) but are labelled as
  // unused rather than deleted.
  cfg.spellLevels = {
    0: "ESPIONAGE5E.Caliber.Action",
    1: "ESPIONAGE5E.Caliber.1",
    2: "ESPIONAGE5E.Caliber.2",
    3: "ESPIONAGE5E.Caliber.3",
    4: "ESPIONAGE5E.Caliber.4",
    5: "ESPIONAGE5E.Caliber.5",
    6: "ESPIONAGE5E.Caliber.Unused",
    7: "ESPIONAGE5E.Caliber.Unused",
    8: "ESPIONAGE5E.Caliber.Unused",
    9: "ESPIONAGE5E.Caliber.Unused"
  };

  const icon = `modules/${MODULE_ID}/icons/program.svg`;
  cfg.spellSchools = Object.fromEntries(
    Object.entries(PROGRAM_TYPES).map(([k, v]) => [k, { ...v, icon }])
  );

  // Programs have no verbal/somatic/material components; keep only the
  // properties that still make sense for software.
  for (const key of ["vocal", "somatic", "material", "ritual"]) {
    cfg.validProperties.spell?.delete(key);
  }

  // Executable slots are occupied while a program runs, not spent. Closing a
  // program frees its slot; a short rest is long enough to close everything.
  const shortRecovers = game.settings.get(MODULE_ID, "slotsRecoverOnShortRest");
  if (shortRecovers) cfg.restTypes.short.recoverSpellSlotTypes = new Set(["spell"]);
  cfg.restTypes.long.recoverSpellSlotTypes = new Set(["spell"]);
}
