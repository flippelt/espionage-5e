/**
 * Mission rest: the recovery agents get between missions, back at headquarters.
 *
 * Adds a "Mission" rest type (a button next to Short/Long Rest on character, NPC and group sheets; the group button
 * sends a rest request to every member) and a "Per Mission" recovery period for item uses. A mission rest recovers
 * everything a long rest does, plus all hit dice, all actor resources, and every use that recovers per mission.
 */

export const MISSION = "mission";

export function configureMissionRest() {
  const cfg = CONFIG.DND5E;

  cfg.limitedUsePeriods[MISSION] = {
    label: "ESPIONAGE5E.Rest.Period.Label",
    abbreviation: "ESPIONAGE5E.Rest.Period.Abbreviation"
  };

  const long = cfg.restTypes.long;
  cfg.restTypes[MISSION] = {
    duration: { normal: 480, gritty: 10_080, epic: 60 },
    exhaustionDelta: long.exhaustionDelta,
    label: "ESPIONAGE5E.Rest.Label",
    icon: "fa-solid fa-briefcase",
    dialogClass: dnd5e.applications.actor.BaseRestDialog,
    chat: "ESPIONAGE5E.Rest.Result",
    newDay: true,
    activationPeriods: ["longRest", "shortRest"],
    expiryEvents: ["longRest", "shortRest"],
    recoverHitDice: true,
    recoverHitPoints: true,
    recoverPeriods: [MISSION, "lr", "sr"],
    // Whatever the long and short rests restore (the hacking config may change these after this runs).
    get recoverSpellSlotTypes() {
      return new Set([...(cfg.restTypes.long.recoverSpellSlotTypes ?? []), ...(cfg.restTypes.short.recoverSpellSlotTypes ?? [])]);
    },
    recoverTemp: true,
    recoverTempMax: true
  };

  // Defaults that dnd5e only applies to "long" rests by name: full hit dice, and actor resources.
  Hooks.on(`dnd5e.pre${MISSION.capitalize()}Rest`, (actor, config) => {
    config.fraction ??= 1;
    config.recoverShortRestResources ??= true;
    config.recoverLongRestResources ??= true;
  });
}
