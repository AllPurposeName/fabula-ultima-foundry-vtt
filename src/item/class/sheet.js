/* eslint-disable no-unused-vars */
import { FabulaUltimaItemSheet } from "../sheet.js";

export class FabulaUltimaClassSheet extends FabulaUltimaItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["fabula-ultima", "sheet", "item"],
      width: 660,
      height: 740,
      resizable: false,
    });
  }

  get template() {
    return "systems/fabula-ultima/templates/item/class/sheet.hbs";
  }
  async getData() {
    let itemData = await super.getData();
    return itemData;
  }
}
