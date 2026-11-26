/**
 * Currency, damage types, languages, and gadget caliber.
 */

/**
 * Dollars. dnd5e hard-codes `gp` as the default price denomination, so the
 * `gp` key is kept and relabelled as the dollar; the other coins are removed.
 */
const CURRENCIES = {
  gp: {
    label: "ESPIONAGE5E.Currency.Dollar",
    abbreviation: "ESPIONAGE5E.Currency.DollarAbbr",
    conversion: 1,
    icon: "systems/dnd5e/icons/currency/gold.webp"
  }
};

/**
 * Damage types. dnd5e keys are kept where the meaning survives (`lightning`
 * becomes Electrical, `poison` becomes Toxic) so resistances, immunities, and
 * other modules keep working. Necrotic, psychic, radiant, and thunder do not
 * exist in the game; coding and radiation are new.
 */
const REMOVED_DAMAGE = ["necrotic", "psychic", "radiant", "thunder"];
const DAMAGE_RELABEL = {
  lightning: "ESPIONAGE5E.Damage.Electrical",
  poison: "ESPIONAGE5E.Damage.Toxic"
};
const NEW_DAMAGE = {
  coding: {
    label: "ESPIONAGE5E.Damage.Coding",
    icon: "modules/espionage-5e/icons/program.svg",
    color: 0x3fa7d6
  },
  radiation: {
    label: "ESPIONAGE5E.Damage.Radiation",
    icon: "systems/dnd5e/icons/svg/damage/radiant.svg",
    color: 0x9acd32
  }
};

/** Real-world languages: the book lists the most spoken first and second languages, and allows any other. */
const LANGUAGES = {
  world: {
    label: "ESPIONAGE5E.Language.Category.World",
    selectable: false,
    children: {
      arabic: "ESPIONAGE5E.Language.Arabic",
      bengali: "ESPIONAGE5E.Language.Bengali",
      english: "ESPIONAGE5E.Language.English",
      french: "ESPIONAGE5E.Language.French",
      german: "ESPIONAGE5E.Language.German",
      hausa: "ESPIONAGE5E.Language.Hausa",
      hindi: "ESPIONAGE5E.Language.Hindi",
      japanese: "ESPIONAGE5E.Language.Japanese",
      javanese: "ESPIONAGE5E.Language.Javanese",
      korean: "ESPIONAGE5E.Language.Korean",
      malay: "ESPIONAGE5E.Language.Malay",
      mandarin: "ESPIONAGE5E.Language.Mandarin",
      marathi: "ESPIONAGE5E.Language.Marathi",
      portuguese: "ESPIONAGE5E.Language.Portuguese",
      punjabi: "ESPIONAGE5E.Language.Punjabi",
      russian: "ESPIONAGE5E.Language.Russian",
      spanish: "ESPIONAGE5E.Language.Spanish",
      swahili: "ESPIONAGE5E.Language.Swahili",
      tamil: "ESPIONAGE5E.Language.Tamil",
      telugu: "ESPIONAGE5E.Language.Telugu",
      vietnamese: "ESPIONAGE5E.Language.Vietnamese",
      wu: "ESPIONAGE5E.Language.Wu"
    }
  },
  sign: {
    label: "ESPIONAGE5E.Language.Category.Sign",
    selectable: false,
    children: {
      asl: "ESPIONAGE5E.Language.ASL",
      bsl: "ESPIONAGE5E.Language.BSL",
      libras: "ESPIONAGE5E.Language.Libras"
    }
  }
};

/**
 * Gadget caliber 1–5 reuses dnd5e's item rarity (so compendium filters and
 * sorting work): common = caliber 1 … legendary = caliber 5.
 */
const ITEM_RARITY = {
  common: "ESPIONAGE5E.Caliber.Gadget1",
  uncommon: "ESPIONAGE5E.Caliber.Gadget2",
  rare: "ESPIONAGE5E.Caliber.Gadget3",
  veryRare: "ESPIONAGE5E.Caliber.Gadget4",
  legendary: "ESPIONAGE5E.Caliber.Gadget5",
  artifact: "ESPIONAGE5E.Caliber.Prototype"
};

export function configureWorld() {
  const cfg = CONFIG.DND5E;

  cfg.currencies = CURRENCIES;
  cfg.defaultCurrency = "gp";

  for (const key of REMOVED_DAMAGE) delete cfg.damageTypes[key];
  for (const [key, label] of Object.entries(DAMAGE_RELABEL)) cfg.damageTypes[key].label = label;
  for (const [key, data] of Object.entries(NEW_DAMAGE)) {
    cfg.damageTypes[key] = { ...data, color: new foundry.utils.Color(data.color) };
  }

  cfg.languages = LANGUAGES;
  cfg.itemRarity = ITEM_RARITY;
}
