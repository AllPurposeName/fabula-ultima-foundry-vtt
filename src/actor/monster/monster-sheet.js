/* eslint-disable no-unused-vars */
import { FabulaUltimaActorSheet } from "../sheet.js";
// import { FabulaUltimaCharacterGenerator } from "@components/character-generator/character-generator.js";
// import { FBLRoll, FBLRollHandler } from "@components/roll-engine/engine.js";
// import localizeString from "@utils/localize-string";
// import { ActorSheetConfig } from "@utils/sheet-config.js";

export class FabulaUltimaMonsterSheet extends FabulaUltimaActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["fabula-ultima", "sheet", "actor"],
      width: 660,
      height: 740,
      resizable: false,
      scrollY: [
        ".armors .item-list .items",
        ".bonds .item-list .items",
        ".critical-injuries .item-list .items",
        ".gears .item-list .items",
        ".spells .item-list .items",
        ".talents .item-list .items",
        ".weapons .item-list .items",
      ],
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main",
        },
      ],
    });
  }

  get template() {
    return "systems/fabula-ultima/templates/actor/monster/monster-sheet.hbs";
    // if (!game.user.isGM && this.actor.limited)
    //   return "systems/fabula-ultima/templates/actor/character/character-limited-sheet.hbs";
    // if (this.actorProperties.subtype?.type === "npc")
    //   return "systems/fabula-ultima/templates/actor/character/npc-sheet.hbs";
  }
}
