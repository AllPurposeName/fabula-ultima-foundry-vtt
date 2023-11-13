import localize from "@utils/localize-string.js";

export class FabulaUltimaActor extends Actor {
  get actorProperties() {
    return this.system;
  }

  get attributes() {
    return this.actorProperties.baseAttribute;
  }

  get hp() {
    return this.attributes.baseHitPoints.value
  }

  get mp() {
    return this.attributes.baseMindPoints.value
  }

  get ip() {
    return this.attributes.baseInventoryPoints.value
  }

  get dexterity() {
    return this.modifiedAttribute({baseAttribute: "baseDexterity", possibleStatusEffects: ["slow", "enraged"]});
  }

  get insight() {
    return this.modifiedAttribute({baseAttribute: "baseInsight", possibleStatusEffects: ["dazed", "enraged"]});
  }

  get might() {
    return this.modifiedAttribute({baseAttribute: "baseMight", possibleStatusEffects: ["weak", "poisoned"]});
  }

  get willpower() {
    return this.modifiedAttribute({baseAttribute: "baseWillpower", possibleStatusEffects: ["shaken", "poisoned"]});
  }

  modifiedAttribute({baseAttribute, possibleStatusEffects}) {
    const baseValue = this.actorProperties.baseAttribute[baseAttribute].value;
    const activeStatusEffects = possibleStatusEffects.filter((effect) => this.actorProperties.condition[effect].value).length;
    return Math.max(6, baseValue - (2 * activeStatusEffects));
  }

  get conditions() {
    return this.actorProperties.condition;
  }

  get bio() {
    return this.actorProperties.bio;
  }

  // get consumables() {
  //   return this.actorProperties.consumable;
  // }
  //
  // get canAct() {
  //   if (!this.attributes) return false;
  //   return Object.entries(this.attributes).every(
  //     ([key, attribute]) => attribute.value > 0 || attribute.max <= 0 || key === "empathy",
  //   );
  // }
  //
  // get skills() {
  //   return this.actorProperties.skill;
  // }
  //
  // get willpower() {
  //   return this.actorProperties.bio?.willpower;
  // }
  //
  // get unlimitedPush() {
  //   return this.getFlag("fabula-ultima", "unlimitedPush") ?? false;
  // }

  /* Override */
  getRollData() {
    return {
      dexterity: this.dexterity,
      insight: this.insight,
      might: this.might,
      willpower: this.willpower,
      dex: `1d${this.dexterity}`,
      ins: `1d${this.insight}`,
      mig: `1d${this.might}`,
      wlp: `1d${this.willpower}`,
      hp: this.hitPoints,
      mp: this.mindPoints,
      ip: this.inventoryPoints,
    }
  }

  // getRollModifierOptions(...rollIdentifiers) {
  //   if (!rollIdentifiers.length) return [];
  //   const itemModifiers = this.items.reduce((array, item) => {
  //     const modifiers = item.getRollModifier(...rollIdentifiers);
  //     if (modifiers) array = [...array, ...modifiers];
  //     return array;
  //   }, []);
  //   if (rollIdentifiers.includes("dodge")) {
  //     itemModifiers.push({
  //       name: localize("ROLL.STANDING_DODGE"),
  //       value: -2,
  //       active: true,
  //     });
  //     itemModifiers.push({
  //       name: localize("ROLL.DODGE_SLASH"),
  //       value: +2,
  //     });
  //   }
  //   return itemModifiers;
  // }
  //
  // async createEmbeddedDocuments(embeddedName, data, options) {
  //   // Replace randomized Item.properties like "[[d6]] days" with a roll
  //   let newData = deepClone(data);
  //   if (!Array.isArray(newData)) newData = [newData]; // Small technical debt. During redesign of NPC sheet createEmbeddedDocuments needs to be passed an array.
  //   const inlineRoll = /\[\[([d\d+\-*]+)\]\]/i;
  //   const createRoll = async ([_match, group]) => {
  //     const roll = await new Roll(group).roll();
  //     return roll.total;
  //   };
  //   for await (const entity of newData) {
  //     if (entity.data) {
  //       entity.data = await Object.entries(entity.data).reduce(async (obj, [key, value]) => {
  //         if (typeof value === "string" && value.match(inlineRoll)) {
  //           const result = await createRoll(inlineRoll.exec(value));
  //           value = value.replace(inlineRoll, result);
  //         }
  //         const resolved = await obj;
  //         return { ...resolved, [key]: value };
  //       }, {});
  //
  //       // We only want to touch flags of items that are considered "gear"
  //       if (!CONFIG.fbl.carriedItemTypes.includes(data.type)) continue;
  //       entity.flags["fabula-ultima"] = {
  //         state: "carried",
  //         ...entity.flags["fabula-ultima"],
  //       };
  //     }
  //   }
  //
  //   return super.createEmbeddedDocuments(embeddedName, newData, options);
  // }

  /**
   * Override initializing a character to set default portraits.
   * @param {object} data object of an initialized character.
   * @param {object?} options optional object of options.
   */
  static async create(data, options) {
    if (!data.img) {
      switch (data.type) {
        case "party":
          data.img = "systems/fabula-ultima/assets/fbl-sun.webp";
          break;
        default:
          data.img = `systems/fabula-ultima/assets/fbl-${data.type}.webp`;
          break;
      }
    }
    super.create(data, options);
  }

  // toggleCondition(conditionName) {
  //   const conditionValue = this.conditions[conditionName].value;
  //   const conditionLabel = this.conditions[conditionName].label;
  //   const effect = this.effects.find((condition) => condition.getFlag("core", "statusId") === conditionName);
  //   if (CONFIG.fbl.conditions.includes(conditionName)) {
  //     this.update({ [`system.condition.${conditionName}.value`]: !conditionValue });
  //     if (conditionValue && effect) this.deleteEmbeddedDocuments("ActiveEffect", [effect.id]);
  //     else if (!conditionValue && !effect)
  //       this.createEmbeddedDocuments("ActiveEffect", {
  //         ...CONFIG.fbl.activeEffects[conditionName],
  //         label: localize(conditionLabel),
  //       });
  //   }
  // }
  //
  // rest() {
  //   const activeConditions = Object.entries(this.conditions ?? {}).filter(([_, value]) => value?.value);
  //   const isBlocked = (...conditions) =>
  //     conditions.some((condition) => activeConditions.map(([key, _]) => key).includes(condition));
  //   const data = {
  //     attribute: {
  //       agility: {
  //         value: isBlocked("thirsty") ? this.attributes.agility.value : this.attributes.agility.max,
  //       },
  //       strength: {
  //         value: isBlocked("thirsty", "cold", "hungry")
  //         ? this.attributes.strength.value
  //         : this.attributes.strength.max,
  //       },
  //       wits: {
  //         value: isBlocked("thirsty", "cold", "sleepy")
  //         ? this.attributes.wits.value
  //         : this.attributes.wits.max,
  //       },
  //       empathy: {
  //         value: isBlocked("thirsty") ? this.attributes.empathy.value : this.attributes.empathy.max,
  //       },
  //     },
  //   };
  //   if (this.conditions?.sleepy.value) this.toggleCondition("sleepy");
  //   this.update({ data });
  //   const sleepyIndex = activeConditions.map(([key, _]) => key).indexOf("sleepy");
  //   const wasSleepy = sleepyIndex > -1;
  //   if (wasSleepy) activeConditions.splice(sleepyIndex, 1);
  //   const formatter = new Intl.ListFormat(game.i18n.lang, { style: "long" });
  //   ChatMessage.create({
  //     content: `<div class="fabula-ultima chat-item"><h3>${this.name}</h3><h4>${localize("ACTION.REST")}</h4>${
  //       wasSleepy ? `<p>${this.name} ${localize("CONDITION.IS_NO_LONGER_SLEEPY")}.</p>` : ""
  //     }${
  //       activeConditions.length
  //         ? `<p>${this.name} ${localize("CONDITION.SUFFERING_FROM")} ${formatter.format(
  //           activeConditions
  //           .filter(([key, _]) => key !== "sleepy")
  //           .map(([_, value]) => `<b>${localize(value.label)}</b>`),
  //         )}.</p>`
  //         : ""
  //     }</div>`,
  //     speaker: { actor: this },
  //     whisper: game.user.isGM ? [game.user.id] : [],
  //   });
  // }
}
