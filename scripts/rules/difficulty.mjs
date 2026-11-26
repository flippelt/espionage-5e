/**
 * NPC difficulty ratings.
 *
 * An NPC's difficulty is comparable to an agent's level (a difficulty 1 NPC is as dangerous as a 1st-level agent),
 * and it uses dnd5e's challenge rating field. Experience follows the Experience Points by Difficulty Rating table
 * (difficulty 1–30) instead of the much larger 5e CR values; the sheet labels say "Difficulty".
 *
 * Index 0 keeps dnd5e's value (the table has no difficulty 0); fractional ratings keep dnd5e's formula.
 */
const XP_BY_DIFFICULTY = [
  10,
  50, 100, 175, 275, 450, 575, 725, 975, 1250, 1475,
  1800, 2100, 2500, 2875, 3250, 3750, 4500, 5000, 5500, 6250,
  8250, 10250, 12500, 15500, 18750, 22500, 26250, 30000, 33750, 38750
];

export function configureDifficulty() {
  CONFIG.DND5E.CR_EXP_LEVELS = XP_BY_DIFFICULTY;
}
