import localizeString from "../utils/localize-string.js";
import { objectSearch } from "../utils/object-search.js";

export class FabulaUltimaItem extends Item {
  get itemProperties() {
    return this.system;
  }
}
