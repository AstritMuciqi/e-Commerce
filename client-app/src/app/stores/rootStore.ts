import { configure } from "mobx";
import { createContext } from "react";
import BrandStore from "./brandStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProductStore from "./productStore";
import SectorStore from "./sectorStore";
import ContactFormStore from "./contactFormStore";

import UserStore from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {
  brandStore: BrandStore;
  productStore: ProductStore;
  sectorStore: SectorStore;
  contactFormStore: ContactFormStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.brandStore = new BrandStore(this);
    this.productStore = new ProductStore(this);
    this.sectorStore = new SectorStore(this);
    this.userStore = new UserStore(this);
    this.contactFormStore = new ContactFormStore(this);

    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
