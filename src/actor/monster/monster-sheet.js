import { FabulaUltimaActorSheet } from "../sheet.js";

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
  }

    /** override **/
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.monster-textareas textarea').each((i, el) => {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`
    });

    html.find('.monster-textareas').on('input', (ev) => {
      ev.preventDefault();
      if (ev.target.tagName.toLowerCase() === 'textarea') {
        ev.target.style.height = 'auto';
        ev.target.style.height = ev.target.scrollHeight + 'px';
      }
    })

    const AFFINITY_MAP = {
      'affinity-inactive': "AFFINITY.INACTIVE",
      'affinity-vulnerable': "AFFINITY.VULNERABLE",
      'affinity-resistant': "AFFINITY.RESISTANT",
      'affinity-immune': "AFFINITY.IMMUNE",
      'affinity-absorbs': "AFFINITY.ABSORBS",
    }

    const affinityKeys = Object.keys(AFFINITY_MAP)

    html.find('.affinity-boxes').on('click', '.affinity-box', async ev => {
      const target = ev.currentTarget;
      const currentAffinityIndex = affinityKeys.indexOf(target.classList[2]);
      const nextAffinityIndex = (currentAffinityIndex + 1) % affinityKeys.length;
      target.classList.remove(affinityKeys[currentAffinityIndex]);
      target.classList.add(affinityKeys[nextAffinityIndex]);

      const thisAffinity = target.classList[1].split('-')[1]
      await this.actor.update({
        [`system.affinities.${thisAffinity}.class`]: affinityKeys[nextAffinityIndex],
        [`system.affinities.${thisAffinity}.value`]: AFFINITY_MAP[affinityKeys[nextAffinityIndex]],
      });
    })
  }
}
