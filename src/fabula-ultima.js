import FabulaConfig from "@system/core/config.js";
// import { FURollHandler } from "@components/roll-engine/engine.js";
import { FabulaUltimaActor } from "@actor/actor-document.js";
import { FabulaUltimaItem } from "@item/item-document.js";
import { initializeHandlebars } from "@system/core/handlebars.js";
import { registerSheets } from "@system/core/sheets.js";

/**
 * We use this label to remove the debug option in production builds.
 * @See rollup.config.js
 */
/* @__PURE__ */ (async () => {
  CONFIG.debug.hooks = true;
  const tests = await import("./tests/foundry-scripts");
  CONFIG.debug.tests = tests.default;
  console.warn("HOOKS DEBUG ENABLED: ", CONFIG.debug.hooks);
})();

Hooks.once("init", () => {
	game.fbl = {
		config: FabulaConfig,
	};
  CONFIG.Actor.documentClass = FabulaUltimaActor;
	CONFIG.fabula = FabulaConfig;
	CONFIG.Item.documentClass = FabulaUltimaItem;
	// CONFIG.JournalEntry.documentClass = FabulaUltimaJournalEntry;
	// CONFIG.Combat.documentClass = FabulaUltimaCombat;
	registerSheets();
	initializeHandlebars();
	initializeEditorEnrichers();
	modifyConfig();
})
