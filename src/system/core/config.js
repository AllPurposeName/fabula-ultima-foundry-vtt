/**
 * @description This acts as a configuration utility for the system. Everything that doesn't need to go in template.json, but is still referenced throughout the system is gathered here.
 */

const FU = {};

// FU.activeEffects = {
// 	cold: {
// 		"flags.core.statusId": "cold",
// 		icon: "icons/svg/frozen.svg",
// 	},
// 	hungry: {
// 		"flags.core.statusId": "hungry",
// 		icon: "icons/svg/sun.svg",
// 	},
// 	sleepy: {
// 		"flags.core.statusId": "sleepy",
// 		icon: "icons/svg/unconscious.svg",
// 	},
// 	thirsty: {
// 		"flags.core.statusId": "thirsty",
// 		icon: "icons/svg/tankard.svg",
// 	},
// };

// FU.adventureSites = {
// 	tables: {},
// 	transformers: {},
// 	types: {},
// 	utilities: {},
// };

FU.attributes = ["dexterity", "insight", "might", "willpower"];

// FU.carriedStates = ["equipped", "carried"];

// FU.carriedItemTypes = ["armor", "gear", "rawMaterial", "weapon"];

FU.characterSubtype = { pc: "ACTOR.SUBTYPE.PC", npc: "ACTOR.SUBTYPE.NPC" };

FU.attributeDice = {
	1: "1d6",
	2: "1d8",
	3: "1d10",
	4: "1d12",
};

FU.conditions = ["dazed", "enraged", "poisoned", "shaken", "slow", "weak"];

FU.dataSetConfig = {
	en: "dataset-en",
};
// 	"pt-BR": "dataset-pt-br",
// 	es: "dataset-es",
// 	fr: "dataset-fr",
// 	de: "dataset-de",
// };


// FU.enrichedActorFields = ["note", "pride", "face", "body", "clothing", "darkSecret"];

// FU.enrichedItemFields = ["description", "effect", "drawback", "appearance", "tools", "features.others"];

// FU.i18n = {
// 	armor: "ITEM.TypeArmor",
// 	gear: "ITEM.TypeGear",
// 	weapon: "ITEM.TypeWeapon",
// 	rawMaterial: "ITEM.TypeRawmaterial",
// 	talent: "ITEM.TypeTalent",
// 	spell: "ITEM.TypeSpell",
// 	monsterAttack: "ITEM.TypeMonsterattack",
// 	criticalInjury: "ITEM.TypeCriticalinjury",
// 	building: "ITEM.TypeBuilding",
// 	hireling: "ITEM.TypeHireling",
// 	agility: "ATTRIBUTE.AGILITY",
// 	empathy: "ATTRIBUTE.EMPATHY",
// 	strength: "ATTRIBUTE.STRENGTH",
// 	wits: "ATTRIBUTE.WITS",
// 	"animal-handling": "SKILL.ANIMAL_HANDLING",
// 	crafting: "SKILL.CRAFTING",
// 	endurance: "SKILL.ENDURANCE",
// 	healing: "SKILL.HEALING",
// 	insight: "SKILL.INSIGHT",
// 	lore: "SKILL.LORE",
// 	manipulation: "SKILL.MANIPULATION",
// 	marksmanship: "SKILL.MARKSMANSHIP",
// 	melee: "SKILL.MELEE",
// 	might: "SKILL.MIGHT",
// 	move: "SKILL.MOVE",
// 	performance: "SKILL.PERFORMANCE",
// 	scouting: "SKILL.SCOUTING",
// 	"sleight-of-hand": "SKILL.SLEIGHT_OF_HAND",
// 	stealth: "SKILL.STEALTH",
// 	survival: "SKILL.SURVIVAL",
// 	slash: "ACTION.SLASH",
// 	stab: "ACTION.STAB",
// 	unarmed: "ACTION.UNARMED_STRIKE",
// 	grapple: "ACTION.GRAPPLE",
// 	"break-free": "ACTION.BREAK_FREE",
// 	ranged: "WEAPON.RANGED",
// 	shoot: "ACTION.SHOOT",
// 	persuade: "ACTION.PERSUADE",
// 	taunt: "ACTION.TAUNT",
// 	flee: "ACTION.FLEE",
// 	heal: "ACTION.HEAL",
// 	dodge: "ACTION.DODGE",
// 	parry: "ACTION.PARRY",
// 	shove: "ACTION.SHOVE",
// 	disarm: "ACTION.DISARM",
// 	run: "ACTION.RUN",
// 	retreat: "ACTION.RETREAT",
// 	"grapple-attack": "ACTION.GRAPPLE_ATTACK",
// 	spells: "MAGIC.SPELLS",
// 	activatedTalents: "TALENT.ANY_ACTIVATED",
// 	"travel-forced-march": "FLPS.TRAVEL_ROLL.FORCED_MARCH",
// 	"travel-navigate": "FLPS.TRAVEL_ROLL.NAVIGATE",
// 	"travel-keep-watch": "FLPS.TRAVEL_ROLL.KEEP_WATCH",
// 	"travel-find-good-place": "FLPS.TRAVEL_ROLL.FIND_GOOD_PLACE",
// 	"travel-find-food": "FLPS.TRAVEL_ROLL.FIND_FOOD",
// 	"travel-find-prey": "FLPS.TRAVEL_ROLL.FIND_PREY",
// 	"travel-hike-in-darkness": "FLPS.TRAVEL_ROLL.HIKE_IN_DARKNESS",
// 	"travel-kill-prey": "FLPS.TRAVEL_ROLL.KILL_PREY",
// 	"travel-catch-fish": "FLPS.TRAVEL_ROLL.CATCH_FISH",
// 	"travel-make-camp": "FLPS.TRAVEL_ROLL.MAKE_CAMP",
// 	carryingCapacity: "CARRYING_CAPACITY",
// 	"dark-forest": "BIOME.DARK_FOREST",
// 	forest: "BIOME.FOREST",
// 	hills: "BIOME.HILLS",
// 	lake: "BIOME.LAKE",
// 	marshlands: "BIOME.MARSHLANDS",
// 	mountains: "BIOME.MOUNTAINS",
// 	plains: "BIOME.PLAINS",
// 	quagmire: "BIOME.QUAGMIRE",
// 	ruins: "BIOME.RUINS",
// 	"beneath-the-ice": "BIOME.BENEATH_THE_ICE",
// 	"ice-cap": "BIOME.ICE_CAP",
// 	"ice-forest": "BIOME.ICE_FOREST",
// 	"sea-ice": "BIOME.SEA_ICE",
// 	tundra: "BIOME.TUNDRA",
// 	"crimson-forest": "BIOME.CRIMSON_FOREST",
// 	ashlands: "BIOME.ASHLANDS",
// 	ocean: "BIOME.OCEAN",
// 	firelands: "BIOME.FIRELANDS",
// };

FU.itemTypes = [
        "armor",
        "artifact",
        "helper",
        "heroicSkill",
        "quirk",
        "monsterSkill",
        "project",
        "rawMaterial",
        "shield",
        "skill",
        "spell",
        "weapon"
];

// FU.encounterTables = [
// 	"dark-forest",
// 	"forest",
// 	"hills",
// 	"lake",
// 	"marshlands",
// 	"mountains",
// 	"plains",
// 	"quagmire",
// 	"ruins",
// 	"beneath-the-ice",
// 	"ice-cap",
// 	"ice-forest",
// 	"sea-ice",
// 	"tundra",
// 	"ocean",
// 	"firelands",
// 	"crimson-forest",
// 	"ashlands",
// ];

// FU.otherTables = ["travel-find-prey"];

// FU.skillAttributeMap = {
// 	"animal-handling": "empathy",
// 	crafting: "strength",
// 	endurance: "strength",
// 	healing: "empathy",
// 	insight: "wits",
// 	lore: "wits",
// 	manipulation: "empathy",
// 	marksmanship: "agility",
// 	melee: "strength",
// 	might: "strength",
// 	move: "agility",
// 	performance: "empathy",
// 	scouting: "wits",
// 	"sleight-of-hand": "agility",
// 	stealth: "agility",
// 	survival: "wits",
// };

// FU.weaponFeatures = ["blunt", "edged", "hook", "parrying", "shield", "pointed", "slowReload"];

// export const modifyConfig = () => {
// 	const settings = ["maxInit"];
// 	for (const setting of settings) {
// 		const value = game.settings.get("fabula-ultima", setting);
// 		if (value) {
// 			FU[setting] = value;
// 		}
// 	}
// };
export default FU;
