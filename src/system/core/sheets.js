import { FabulaUltimaCharacterSheet } from "@actor/character/sheet.js";
// import { FabulaUltimaMonsterSheet } from "@actor/monster/monster-sheet.js";
// import { FabulaUltimaStrongholdSheet } from "@actor/stronghold/stronghold-sheet.js";
// import { FabulaUltimaPartySheet } from "@actor/party/party-sheet.js";
// import { FabulaUltimaWeaponSheet } from "@item/weapon/weapon-sheet.js";
// import { FabulaUltimaArmorSheet } from "@item/armor/armor-sheet.js";
// import { FabulaUltimaGearSheet } from "@item/gear/gear-sheet.js";
// import { FabulaUltimaRawMaterialSheet } from "@item/raw-material/raw-material-sheet.js";
// import { FabulaUltimaSpellSheet } from "@item/spell/spell-sheet.js";
// import { FabulaUltimaTalentSheet } from "@item/talent/talent-sheet.js";
// import { FabulaUltimaCriticalInjurySheet } from "@item/critical-injury/critical-injury-sheet.js";
// import { FabulaUltimaMonsterAttackSheet } from "@item/monster-attack/monster-attack-sheet.js";
// import { FabulaUltimaBuildingSheet } from "@item/building/building-sheet.js";
// import { FabulaUltimaHirelingSheet } from "@item/hireling/hireling-sheet.js";
// import { AdventureSitesSheet } from "@journal/adventure-sites/adventure-site-sheet.js";

export function registerSheets() {
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("fabula-ultima", FabulaUltimaCharacterSheet, { types: ["character"], makeDefault: true });
}
// 	Actors.registerSheet("fabula-ultima", FabulaUltimaMonsterSheet, { types: ["monster"], makeDefault: true });
// 	Actors.registerSheet("fabula-ultima", FabulaUltimaStrongholdSheet, {
// 		types: ["stronghold"],
// 		makeDefault: true,
// 	});
// 	Actors.registerSheet("fabula-ultima", FabulaUltimaPartySheet, { types: ["party"], makeDefault: true });
// 	Items.unregisterSheet("core", ItemSheet);
// 	Items.registerSheet("fabula-ultima", FabulaUltimaWeaponSheet, { types: ["weapon"], makeDefault: true });
// 	Items.registerSheet("fabula-ultima", FabulaUltimaArmorSheet, { types: ["armor"], makeDefault: true });
// 	Items.registerSheet("fabula-ultima", FabulaUltimaGearSheet, { types: ["gear"], makeDefault: true });
// 	Items.registerSheet("fabula-ultima", FabulaUltimaRawMaterialSheet, {
// 		types: ["rawMaterial"],
// 		makeDefault: true,
// 	});
// 	Items.registerSheet("fabula-ultima", FabulaUltimaSpellSheet, { types: ["spell"], makeDefault: true });
// 	Items.registerSheet("fabula-ultima", FabulaUltimaTalentSheet, { types: ["talent"], makeDefault: true });
// 	Items.registerSheet("fabula-ultima", FabulaUltimaCriticalInjurySheet, {
// 		types: ["criticalInjury"],
// 		makeDefault: true,
// 	});
// 	Items.registerSheet("fabula-ultima", FabulaUltimaMonsterAttackSheet, {
// 		types: ["monsterAttack"],
// 		makeDefault: true,
// 	});
// 	Items.registerSheet("fabula-ultima", FabulaUltimaBuildingSheet, { types: ["building"], makeDefault: true });
// 	Items.registerSheet("fabula-ultima", FabulaUltimaHirelingSheet, { types: ["hireling"], makeDefault: true });
// 	CONFIG.fbl.adventureSites.sheetClass = AdventureSitesSheet;
// }
