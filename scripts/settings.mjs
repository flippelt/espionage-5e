import { MODULE_ID } from "./config/hacking.mjs";

export function registerSettings() {
  game.settings.register(MODULE_ID, "slotsRecoverOnShortRest", {
    name: "ESPIONAGE5E.Settings.SlotsShortRest.Name",
    hint: "ESPIONAGE5E.Settings.SlotsShortRest.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });

  game.settings.register(MODULE_ID, "enforceLegacyRules", {
    name: "ESPIONAGE5E.Settings.EnforceLegacy.Name",
    hint: "ESPIONAGE5E.Settings.EnforceLegacy.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
}

/**
 * The game is built on the 2014 rules. dnd5e defaults new worlds to the 2024
 * ("modern") rules, so switch a world to "legacy" once, on the GM's client.
 */
export async function enforceLegacyRules() {
  if (!game.user.isActiveGM) return;
  if (!game.settings.get(MODULE_ID, "enforceLegacyRules")) return;
  if (game.settings.get("dnd5e", "rulesVersion") === "legacy") return;
  await game.settings.set("dnd5e", "rulesVersion", "legacy");
  ui.notifications.info("ESPIONAGE5E.Notifications.LegacyRules", { localize: true, permanent: true });
}
