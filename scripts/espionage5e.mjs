/**
 * Espionage 5e — modern espionage rules for the dnd5e system.
 *
 * Everything here reconfigures CONFIG.DND5E during `init`. The dnd5e system's
 * own `init` has already run by then (system scripts load before module
 * scripts), and dnd5e only localizes its config and builds the spellcasting
 * models later, in `i18nInit` — so plain config edits here are picked up by
 * every sheet, roll, and data model.
 */
import { MODULE_ID, configureHacking } from "./config/hacking.mjs";
import { configureSkills } from "./config/skills.mjs";
import { configureEquipment } from "./config/equipment.mjs";
import { configureWorld } from "./config/world.mjs";
import { configureCritical } from "./rules/critical.mjs";
import { registerSettings, enforceLegacyRules } from "./settings.mjs";

Hooks.once("init", () => {
  if (game.system.id !== "dnd5e") {
    console.error(`${MODULE_ID} | requires the dnd5e system; not loading.`);
    return;
  }
  registerSettings();
  configureSkills();
  configureEquipment();
  configureWorld();
  configureHacking();
  configureCritical();
  console.log(`${MODULE_ID} | dnd5e configured for modern espionage`);
});

Hooks.once("ready", () => {
  if (game.system.id === "dnd5e") enforceLegacyRules();
});
