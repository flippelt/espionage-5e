/**
 * The sixteen espionage skills.
 *
 * Skills shared with 5e keep their dnd5e keys so existing roll formulas,
 * enrichers (`[[/check skill=prc]]`), and passive Perception keep working.
 * Arcana, Animal Handling, History, Investigation, Nature, Performance, and
 * Religion are removed; Espionage, Infotech, Mechanics, Tactics, and
 * Infiltration are added.
 */
export const SKILLS = {
  acr: { label: "DND5E.SkillAcr", ability: "dex", fullKey: "acrobatics", icon: "icons/equipment/feet/shoes-simple-leaf-green.webp" },
  ath: { label: "DND5E.SkillAth", ability: "str", fullKey: "athletics", icon: "icons/magic/control/buff-strength-muscle-damage-orange.webp" },
  dec: { label: "DND5E.SkillDec", ability: "cha", fullKey: "deception", icon: "icons/magic/control/mouth-smile-deception-purple.webp" },
  esp: { label: "ESPIONAGE5E.Skill.Espionage", ability: "int", fullKey: "espionage", icon: "icons/skills/targeting/crosshair-scope-sniper-green.webp" },
  ifl: { label: "ESPIONAGE5E.Skill.Infiltration", ability: "wis", fullKey: "infiltration", icon: "icons/equipment/head/hood-purple-mask.webp" },
  ift: { label: "ESPIONAGE5E.Skill.Infotech", ability: "int", fullKey: "infotech", icon: "icons/commodities/tech/cog-steel.webp" },
  ins: { label: "DND5E.SkillIns", ability: "wis", fullKey: "insight", icon: "icons/magic/perception/orb-crystal-ball-scrying-blue.webp" },
  itm: { label: "DND5E.SkillItm", ability: "cha", fullKey: "intimidation", icon: "icons/skills/social/intimidation-impressing.webp" },
  mec: { label: "ESPIONAGE5E.Skill.Mechanics", ability: "int", fullKey: "mechanics", icon: "icons/tools/hand/pry-bar-hook-steel.webp" },
  med: { label: "DND5E.SkillMed", ability: "wis", fullKey: "medicine", icon: "icons/tools/cooking/mortar-herbs-yellow.webp" },
  prc: { label: "DND5E.SkillPrc", ability: "wis", fullKey: "perception", icon: "icons/magic/perception/eye-ringed-green.webp" },
  per: { label: "DND5E.SkillPer", ability: "cha", fullKey: "persuasion", icon: "icons/skills/social/diplomacy-handshake.webp" },
  slt: { label: "DND5E.SkillSlt", ability: "dex", fullKey: "sleightOfHand", icon: "icons/sundries/gaming/playing-cards.webp" },
  ste: { label: "DND5E.SkillSte", ability: "dex", fullKey: "stealth", icon: "icons/magic/perception/shadow-stealth-eyes-purple.webp" },
  sur: { label: "DND5E.SkillSur", ability: "wis", fullKey: "survival", icon: "icons/magic/fire/flame-burning-campfire-yellow-blue.webp" },
  tac: { label: "ESPIONAGE5E.Skill.Tactics", ability: "int", fullKey: "tactics", icon: "icons/tools/navigation/map-chart-tan.webp" }
};

export function configureSkills() {
  CONFIG.DND5E.skills = foundry.utils.deepClone(SKILLS);
}
