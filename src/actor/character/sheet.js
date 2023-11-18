/* eslint-disable no-unused-vars */
import { FabulaUltimaActorSheet } from "../sheet.js";
// import { FabulaUltimaCharacterGenerator } from "@components/character-generator/character-generator.js";
// import { FBLRoll, FBLRollHandler } from "@components/roll-engine/engine.js";
// import localizeString from "@utils/localize-string";
// import { ActorSheetConfig } from "@utils/sheet-config.js";

export class FabulaUltimaCharacterSheet extends FabulaUltimaActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["fabula-ultima", "sheet", "actor"],
      width: 660,
      height: 740,
      resizable: false,
      scrollY: [
        ".bonds .item-list .items",
        ".classes .item-list .items",
        ".spells .item-list .items",
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
    return "systems/fabula-ultima/templates/actor/character/sheet.hbs";
    // if (!game.user.isGM && this.actor.limited)
    //   return "systems/fabula-ultima/templates/actor/character/character-limited-sheet.hbs";
    // if (this.actorProperties.subtype?.type === "npc")
    //   return "systems/fabula-ultima/templates/actor/character/npc-sheet.hbs";
  }

  async getData() {
    let actorData = await super.getData();
    // actorData = this.computeSkills(actorData);
    // actorData = this.computeEncumbrance(actorData);

    if (actorData.actor.type == 'character') {
      this._prepareItems(actorData);
    }
    return actorData;
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = duplicate(header.dataset);
    const name = `New ${type.capitalize()}`;
    const itemData = {
      name: name,
      type: type,
      data: data
    }
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Initialize containers.
    const bonds = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      if (i.type === 'bond') {
        bonds.push(i);
      }
    }

    // Assign and return
    context.bonds = bonds;
  }
  /** override **/
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.item-create').click(this._onItemCreate.bind(this));

    html.find(".item-delete").click((ev) => {
      const div = $(ev.currentTarget).parents(".item");
      this.actor.deleteEmbeddedDocuments("Item", [div.data("itemId")]);
      div.slideUp(200, () => this.render(false));
    });

    html.find('[name="bond.who"]').change(async ev => {
      ev.preventDefault();
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));

      await item.update({
        "system.who": $(ev.currentTarget).val()
      });
    });

    html.find('.feeling-checkbox').click(async ev => {
      ev.preventDefault();
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      const checkbox = $(ev.currentTarget);

      const prop = "system." + ev.currentTarget.dataset.prop;
      const feeling = checkbox.attr('name');

      $("[data-prop='" + ev.currentTarget.dataset.prop + "']").not("[name='" + feeling + "']")[0].checked = false;

      const values = {};

      if (checkbox[0].checked)
        values[prop] = feeling;
      else
        values[prop] = "";

      await item.update(values);
    });

    // html.find(".condition").click(async (ev) => {
    //   const conditionName = $(ev.currentTarget).data("condition");
    //   this.actor.toggleCondition(conditionName);
    //   this._render();
    // });
    //
    // html.find(".roll-armor.specific").click((ev) => {
    //   const itemId = $(ev.currentTarget).data("itemId");
    //   this.rollSpecificArmor(itemId);
    // });
    //
    // html.find(".roll-armor.total").click(() => this.rollArmor());
    //
    // html.find(".roll-consumable").click((ev) => {
    //   const consumable = $(ev.currentTarget).data("consumable");
    //   return this.rollConsumable(consumable);
    // });
    //
    // html.find(".roll-reputation").click(() => this.rollReputation());
    //
    // html.find(".roll-pride").click(() => this.rollPride());
    //
    // html.find(".currency-button").on("click contextmenu", (ev) => {
    //   const currency = $(ev.currentTarget).data("currency");
    //   const operator = $(ev.currentTarget).data("operator");
    //   const modifier = ev.type === "contextmenu" ? 5 : 1;
    //   let coins = [
    //     this.actor.actorProperties.currency.gold.value,
    //     this.actor.actorProperties.currency.silver.value,
    //     this.actor.actorProperties.currency.copper.value,
    //   ];
    //   let i = { gold: 0, silver: 1, copper: 2 }[currency];
    //   if (operator === "plus") {
    //     coins[i] += modifier;
    //   } else {
    //     coins[i] -= modifier;
    //     for (; i >= 0; --i) {
    //       if (coins[i] < 0 && i > 0) {
    //         coins[i - 1] -= 1;
    //         coins[i] += 10;
    //       }
    //     }
    //   }
    //   if (coins[0] >= 0) {
    //     this.actor.update({
    //       "system.currency.gold.value": coins[0],
    //       "system.currency.silver.value": coins[1],
    //       "system.currency.copper.value": coins[2],
    //     });
    //   }
    // });
  }
  //
  // /************************************************/
  // /***        Character Specific Rolls          ***/
  // /************************************************/
  //
  // async rollConsumable(identifier) {
  //   const consumable = this.actor.consumables[identifier];
  //   if (!consumable.value) return ui.notifications.warn(localizeString("WARNING.NO_CONSUMABLE"));
  //   const rollName = localizeString(consumable.label);
  //   const dice = CONFIG.fbl.consumableDice[consumable.value];
  //   const options = {
  //     name: rollName.toLowerCase(),
  //     maxPush: "0",
  //     consumable: identifier,
  //     type: "consumable",
  //     ...this.getRollOptions(),
  //   };
  //   const roll = FBLRoll.create(dice + `[${rollName}]`, {}, options);
  //   await roll.roll({ async: true });
  //   const message = await roll.toMessage();
  //   if (Number(message.roll.result) <= (game.settings.get("fabula-ultima", "autoDecreaseConsumable") || 0)) {
  //     FBLRollHandler.decreaseConsumable(message.id);
  //   }
  // }
  //
  // async rollPride() {
  //   if (!this.actor.canAct) throw this.broken();
  //   const pride = this.actor.actorProperties.bio.pride;
  //   const rollName = localizeString(pride.label);
  //   const options = {
  //     name: rollName,
  //     flavor: `<span class="chat-flavor">${pride.value}</span>`,
  //     maxPush: "0",
  //     ...this.getRollOptions(),
  //   };
  //   const roll = FBLRoll.create(CONFIG.fbl.prideDice + `[${rollName}]`, {}, options);
  //   await roll.roll({ async: true });
  //   return roll.toMessage();
  // }
  //
  // async rollReputation() {
  //   const reputation = this.actor.actorProperties.bio.reputation;
  //   const rollName = localizeString(reputation.label);
  //   const options = {
  //     name: rollName,
  //     flavor: `<span class="chat-flavor">${reputation.value}</span>`,
  //     maxPush: "0",
  //     ...this.getRollOptions(),
  //   };
  //   const roll = FBLRoll.create(reputation.value + "db" + `[${rollName}]`, {}, options);
  //   await roll.roll({ async: true });
  //   return roll.toMessage();
  // }
  //
  // /************************************************/
  // /************************************************/
  //
  // async _charGen() {
  //   const chargen = await new FabulaUltimaCharacterGenerator(
  //     await FabulaUltimaCharacterGenerator.loadDataset(),
  //     this.actor,
  //   );
  //   return chargen.render(true);
  // }
  //
  // /* Override */
  // _onConfigureSheet(event) {
  //   event.preventDefault();
  //   new ActorSheetConfig(this.actor, {
  //     top: this.position.top + 40,
  //     left: this.position.left + (this.position.width - 400) / 2,
  //   }).render(true);
  // }
  //
  // _getHeaderButtons() {
  //   let buttons = super._getHeaderButtons();
  //
  //   if (this.actor.isOwner) {
  //     buttons = [
  //       {
  //         label: game.i18n.localize("SHEET.HEADER.REST"),
  //         class: "rest-up",
  //         icon: "fas fa-bed",
  //         onclick: () => this.actor.rest(),
  //       },
  //       {
  //         label: game.i18n.localize("SHEET.HEADER.ROLL"),
  //         class: "custom-roll",
  //         icon: "fas fa-dice",
  //         onclick: () => this.rollAction("ACTION.GENERIC"),
  //       },
  //       {
  //         label: game.i18n.localize("SHEET.HEADER.CHAR_GEN"),
  //         class: "char-gen",
  //         icon: "fas fa-leaf",
  //         onclick: async () => {
  //           const hasFilledAttributes = Object.values(this.actor.actorProperties.attribute)
  //             .flatMap((a) => a.value + a.max)
  //             .some((v) => v > 0);
  //
  //           if (hasFilledAttributes) {
  //             Dialog.confirm({
  //               title: game.i18n.localize("FLCG.TITLE"),
  //               content: `
  //                                                                       <h1 style="text-align: center;font-weight: 600; border:none;">${game.i18n.localize("FLCG.WARNING")}</h1>
  //                                                                       <p>${game.i18n.localize("FLCG.WARNING_DESTRUCTIVE_EDIT")}</p><hr/>
  //                                                                       <p>${game.i18n.localize("FLCG.WARNING_HINT")}</p>
  //                                                                       <p style="text-align: center;"><b>${game.i18n.localize("FLCG.WARNING_ARE_YOU_SURE")}</b></p>
  //                                                                       <br/>`,
  //               yes: async () => await this._charGen(),
  //               no: () => {},
  //               defaultYes: false,
  //             });
  //           } else {
  //             await this._charGen();
  //           }
  //         },
  //       },
  //     ].concat(buttons);
  //   }
  //
  //   return buttons;
  // }
// }
}
