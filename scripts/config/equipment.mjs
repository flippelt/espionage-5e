/**
 * Weapons, armor, tools, vehicle proficiencies, and ammunition.
 *
 * Where dnd5e code hard-codes a key (weapon types `simpleM`, `natural`,
 * `improv`, `siege`; the `gp` price denomination; the vehicle actor's
 * air/land/space/water types) the key is kept and only relabelled.
 */
import { MODULE_ID } from "./hacking.mjs";

const PACK = `Compendium.${MODULE_ID}.core-items.Item`;

/** Weapon categories. `simpleM`/`martialM`/`simpleR`/`martialR` keep their dnd5e keys. */
const WEAPON_TYPES = {
  simpleM: "ESPIONAGE5E.Weapon.Type.SimpleMelee",
  martialM: "ESPIONAGE5E.Weapon.Type.TraditionalMelee",
  simpleR: "ESPIONAGE5E.Weapon.Type.SimpleRanged",
  martialR: "ESPIONAGE5E.Weapon.Type.MilitaryRanged",
  heavy: "ESPIONAGE5E.Weapon.Type.Heavy",
  explosive: "ESPIONAGE5E.Weapon.Type.Explosive",
  natural: "DND5E.WeaponNatural",
  improv: "DND5E.WeaponImprov",
  siege: "ESPIONAGE5E.Weapon.Type.VehicleMounted"
};

/**
 * Weapon proficiencies are granted per category (a class gets e.g. "simple
 * melee" and "military ranged"), so each type maps to its own proficiency.
 * Grenades are a proficiency of their own inside the explosives table.
 */
const WEAPON_PROFICIENCIES = {
  sim: "ESPIONAGE5E.Weapon.Prof.SimpleMelee",
  trd: "ESPIONAGE5E.Weapon.Prof.TraditionalMelee",
  sir: "ESPIONAGE5E.Weapon.Prof.SimpleRanged",
  mil: "ESPIONAGE5E.Weapon.Prof.MilitaryRanged",
  hvy: "ESPIONAGE5E.Weapon.Prof.Heavy",
  exp: "ESPIONAGE5E.Weapon.Prof.Explosive",
  grn: "ESPIONAGE5E.Weapon.Prof.Grenade"
};

const WEAPON_PROFICIENCIES_MAP = {
  simpleM: "sim",
  martialM: "trd",
  simpleR: "sir",
  martialR: "mil",
  heavy: "hvy",
  explosive: "exp"
};

const WEAPON_TYPE_MAP = {
  simpleM: "melee",
  martialM: "melee",
  simpleR: "ranged",
  martialR: "ranged",
  heavy: "ranged",
  explosive: "ranged",
  siege: "ranged"
};

/** Properties added to the dnd5e set. Standard ones (fin, lgt, rch, thr, two, ver, rel, spc, fir) are reused. */
const NEW_PROPERTIES = {
  ap: { label: "ESPIONAGE5E.Property.ArmorPiercing" },
  antiAir: { label: "ESPIONAGE5E.Property.AntiAir" },
  blast: { label: "ESPIONAGE5E.Property.Blast" },
  burst: { label: "ESPIONAGE5E.Property.BurstFire" },
  auto: { label: "ESPIONAGE5E.Property.FullAuto" },
  garrote: { label: "ESPIONAGE5E.Property.Garrote" },
  guided: { label: "ESPIONAGE5E.Property.Guided" },
  mounted: { label: "ESPIONAGE5E.Property.Mounted" },
  spread: { label: "ESPIONAGE5E.Property.Spread" },
  taser: { label: "ESPIONAGE5E.Property.Taser" },
  thrExp: { label: "ESPIONAGE5E.Property.ThrownExplosive" },
  suppressed: { label: "ESPIONAGE5E.Property.Suppressed" }
};

const WEAPON_PROPERTIES = [
  "fin", "lgt", "rch", "thr", "two", "ver", "rel", "spc", "fir",
  ...Object.keys(NEW_PROPERTIES)
];

/**
 * Tools. Each points at a base item in this module's core-items pack (dnd5e
 * reads tool names from the compendium index). Vehicle proficiencies are
 * tools of type "vehicle" (see configureEquipment for why).
 */
const TOOL_TYPES = {
  kit: "ESPIONAGE5E.Tool.Type.Kit",
  software: "ESPIONAGE5E.Tool.Type.Software",
  vehicle: "DND5E.ToolVehicle"
};

const TOOLS = {
  climbing: { ability: "str", id: `${PACK}.espToolClimbing0` },
  disguise: { ability: "cha", id: `${PACK}.espToolDisguise0` },
  electrician: { ability: "int", id: `${PACK}.espToolElectric0` },
  firstaid: { ability: "wis", id: `${PACK}.espToolFirstAid0` },
  fingerprint: { ability: "int", id: `${PACK}.espToolFingerpr0` },
  forensic: { ability: "int", id: `${PACK}.espToolForensic0` },
  forgery: { ability: "dex", id: `${PACK}.espToolForgery00` },
  guncleaning: { ability: "int", id: `${PACK}.espToolGunClean0` },
  hacking: { ability: "int", id: `${PACK}.espToolHacking00` },
  mechanic: { ability: "int", id: `${PACK}.espToolMechanic0` },
  surgeon: { ability: "wis", id: `${PACK}.espToolSurgeon00` },
  thief: { ability: "dex", id: `${PACK}.espToolThieves00` },
  motorbikes: { ability: "dex", id: `${PACK}.espVehMotorbike0` },
  cars: { ability: "dex", id: `${PACK}.espVehCars000000` },
  hgv: { ability: "dex", id: `${PACK}.espVehHGV0000000` },
  tanks: { ability: "dex", id: `${PACK}.espVehTanks00000` },
  helicopters: { ability: "dex", id: `${PACK}.espVehHelicopter` },
  planes: { ability: "dex", id: `${PACK}.espVehPlanes0000` },
  ships: { ability: "dex", id: `${PACK}.espVehShips00000` },
  unmanned: { ability: "int", id: `${PACK}.espVehUnmanned00` }
};

/** Clips are bought per weapon category. */
const AMMO_SUBTYPES = {
  simpleClip: "ESPIONAGE5E.Ammo.Simple",
  militaryClip: "ESPIONAGE5E.Ammo.Military",
  heavyClip: "ESPIONAGE5E.Ammo.Heavy",
  arrow: "DND5E.CONSUMABLE.Type.Ammunition.Arrow",
  crossbowBolt: "DND5E.CONSUMABLE.Type.Ammunition.Bolt"
};

export function configureEquipment() {
  const cfg = CONFIG.DND5E;

  // Weapons
  cfg.weaponTypes = WEAPON_TYPES;
  cfg.weaponProficiencies = WEAPON_PROFICIENCIES;
  cfg.weaponProficienciesMap = WEAPON_PROFICIENCIES_MAP;
  cfg.weaponTypeMap = WEAPON_TYPE_MAP;
  cfg.weaponIds = {};
  Object.assign(cfg.itemProperties, NEW_PROPERTIES);
  cfg.validProperties.weapon = new Set(WEAPON_PROPERTIES);

  // Armor: same light/medium/heavy/shield categories as 5e. No base-armor
  // proficiencies (Law Enforcement's "stab vests" is handled as medium).
  cfg.armorIds = {};
  cfg.shieldIds = {};
  cfg.validProperties.equipment = new Set(["stealthDisadvantage"]);

  // Tools and vehicle proficiencies. The vehicle actor's own type field keeps
  // dnd5e's air/land/space/water (travel pace code depends on them), so the
  // book's eight vehicle categories become tools of type "vehicle" instead of
  // vehicle types, and the vehicle actor types stop doubling as proficiencies.
  cfg.toolTypes = TOOL_TYPES;
  cfg.toolProficiencies = { ...TOOL_TYPES };
  cfg.tools = TOOLS;
  cfg.traits.tool.children = {};
  cfg.validProperties.tool = new Set();

  // Ammunition
  cfg.consumableTypes.ammo.subtypes = AMMO_SUBTYPES;
  cfg.ammoIds = {};
  for (const type of ["consumable", "container", "feat", "loot"]) cfg.validProperties[type]?.delete("mgc");
}
