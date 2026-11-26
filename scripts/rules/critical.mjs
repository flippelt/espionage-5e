/**
 * Ranged-only critical hits.
 *
 * dnd5e's own flags don't split by attack type: `weaponCriticalThreshold` covers melee and ranged weapons alike, and
 * `meleeCriticalDamageDice` is melee only. Some espionage features improve only ranged attacks (a 19–20 or 18–20
 * critical range, extra weapon dice on a ranged critical), so this adds two character flags and applies them to
 * ranged weapon attacks (`rwak`, including thrown attacks):
 *
 * - `flags.dnd5e.rangedCriticalThreshold` (number): lowest d20 roll that is a critical hit with a ranged weapon attack.
 * - `flags.dnd5e.rangedCriticalDamageDice` (number or roll-data formula, e.g. `@scale.sharpshooter.headshot`): extra
 *   weapon damage dice rolled on a ranged weapon critical hit.
 *
 * Both appear under Special Traits on the actor sheet and can be set by Active Effects.
 */

const RANGED = "rwak";

export function configureCritical() {
  CONFIG.DND5E.characterFlags.rangedCriticalThreshold = {
    name: "ESPIONAGE5E.Flags.RangedCritThreshold",
    hint: "ESPIONAGE5E.Flags.RangedCritThresholdHint",
    section: "DND5E.Feats",
    type: Number,
    placeholder: 20
  };
  CONFIG.DND5E.characterFlags.rangedCriticalDamageDice = {
    name: "ESPIONAGE5E.Flags.RangedCritDice",
    hint: "ESPIONAGE5E.Flags.RangedCritDiceHint",
    section: "DND5E.Feats",
    type: String,
    placeholder: "0"
  };

  // Runs for every attack roll config, with or without the dialog, and again whenever the dialog rebuilds it
  // (so switching a knife between melee and thrown updates the threshold).
  Hooks.on("dnd5e.postBuildAttackRollConfig", (process, config) => {
    const activity = process.subject;
    const actor = activity?.actor;
    const threshold = Number(actor?.getFlag("dnd5e", "rangedCriticalThreshold"));
    if ( !threshold || (threshold >= 20) ) return;
    const mode = config.options?.attackMode ?? process.attackMode;
    if ( activity.getActionType?.(mode) !== RANGED ) return;
    config.options ??= {};
    config.options.criticalSuccess = Math.min(config.options.criticalSuccess ?? 20, threshold);
  });

  // Damage: add the bonus dice to the weapon's base damage roll (dnd5e applies `critical.bonusDice` to the first
  // die term of the first roll only, the same way it handles melee critical dice).
  Hooks.on("dnd5e.preRollDamageV2", config => {
    const activity = config.subject;
    const actor = activity?.actor;
    const raw = actor?.getFlag("dnd5e", "rangedCriticalDamageDice");
    if ( !raw || (activity.getActionType?.(config.attackMode) !== RANGED) ) return;
    const dice = dnd5e.utils.simplifyBonus(raw, actor.getRollData());
    if ( !(dice > 0) ) return;
    const roll = config.rolls?.find(r => r.base) ?? config.rolls?.[0];
    if ( !roll ) return;
    const current = Number(foundry.utils.getProperty(roll, "options.critical.bonusDice")) || 0;
    foundry.utils.setProperty(roll, "options.critical.bonusDice", current + dice);
  });
}
