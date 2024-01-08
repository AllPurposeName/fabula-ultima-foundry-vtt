import { FabulaUltimaActorSheet } from "../sheet.js";

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
  }
}
