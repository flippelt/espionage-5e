# Espionage 5e

Modern espionage rules for the [dnd5e](https://github.com/foundryvtt/dnd5e) system on Foundry VTT, built on the 2014 rules. The module reconfigures dnd5e. It adds no new sheets: characters, rolls, advancement and the rest of dnd5e work as usual.

**Mechanics only.** The module ships rules configuration and a small compendium of base tools. It contains no classes, gadgets, NPCs or setting material.

## What it changes

| Area | Change |
|---|---|
| Rules version | Switches the world to dnd5e **Legacy (2014)** rules on first load (setting, on by default). |
| Skills | 16 skills. Removes Arcana, Animal Handling, History, Investigation, Nature, Performance and Religion. Adds Espionage, Infotech, Mechanics and Tactics (Int) and Infiltration (Wis). |
| Hacking | Replaces spellcasting. Programs are spell items: caliber 1–5 is the spell level, caliber 0 is a hacking action, program types replace schools. Executable slots follow the hacker table, are occupied while a program runs, and free up on a short rest (setting). |
| Weapons | Categories: simple melee, traditional melee, simple ranged, military ranged, heavy, explosives (plus a grenades proficiency). New properties: Armor Piercing, Anti-Air, Blast, Burst Fire, Full Auto, Garrote, Guided, Mounted, Spread, Taser, Thrown (Explosive), Suppressed. |
| Armor | Light, medium, heavy and shields, with no fantasy base armors. |
| Tools | Climbing, disguise, electrician's, first aid, fingerprint, forensic, forgery, gun cleaning, hacking, mechanic's, surgeon's and thieves' tools. |
| Vehicles | Eight proficiency categories as tools: motorbikes, cars, heavy goods vehicles, tanks, helicopters, planes, ships, unmanned. |
| Damage | Adds Coding (software and operating systems only) and Radiation. Lightning becomes Electrical and poison becomes Toxic. Removes necrotic, psychic, radiant and thunder. |
| Currency | US dollars. The internal key stays `gp`, which dnd5e requires. |
| Languages | Real-world languages and sign languages. |
| Item rarity | Shown as caliber 1–5: common is caliber 1, legendary is caliber 5. |
| Ranged critical hits | Two character flags under Special Traits, settable by Active Effects: `flags.dnd5e.rangedCriticalThreshold` (crit range for ranged weapon attacks, thrown included) and `flags.dnd5e.rangedCriticalDamageDice` (extra weapon dice on a ranged critical; a number or a roll-data formula such as `@scale.sharpshooter.headshot`). dnd5e's own flags don't split melee from ranged. |

## Install

Manifest URL:

```
https://github.com/flippelt/espionage-5e/releases/download/latest/module.json
```

Requires Foundry VTT v14 and dnd5e 6.1 or later.

## Development

```sh
npm ci --ignore-scripts
npm run build      # validate YAML sources → compile packs → dist/espionage-5e.zip
```

Compendium sources are YAML under `src/packs/<pack>/`, kept flat because `compilePack` does not recurse into subfolders. Compiled packs are build output and are not committed.

## License

Game mechanics are Open Game Content under the [OGL 1.0a](LICENSE); see the designation at the top of that file. Code is also available under the [MIT License](LICENSE-CODE).
