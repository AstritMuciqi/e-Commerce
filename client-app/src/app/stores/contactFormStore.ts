import { action, observable, computed,runInAction } from "mobx";
import {  SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../API/agent";
import { IContactForm } from "../models/contactForm";
import { RootStore } from "./rootStore";

//configure({ enforceActions: "always" });

export default class ContactFormStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable contactFormRegistry = new Map();
  @observable loadingInitial = false;
  @observable contactForm: IContactForm | null = null;
  @observable submitting = false;
  @observable target = "";

  @computed get contactFormData() {
    return Array.from(this.contactFormRegistry.values());
  }

  @action loadContactForms = async () => {
    this.loadingInitial = true;
    try {
      const contactForm = await agent.ContactForms.contactFormList();
      runInAction("loading contact froms", () => {
        contactForm.forEach((contactForm) => {
          contactForm.firstName = contactForm.firstName.split(".")[0];
          this.contactFormRegistry.set(contactForm.id, contactForm);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load products problem", () => {
        this.loadingInitial = false;
      });
    }
  };
  @action createContactForm = async (contactForm: IContactForm) => {
    this.submitting = true;
    try {
      await agent.ContactForms.createContactForm(contactForm);
      runInAction("create contact form", () => {
        this.contactFormRegistry.set(contactForm.id, contactForm);
        this.submitting = false;
      });
      history.push("/");
    } catch (error) {
      runInAction("create contact form error", () => {
        this.submitting = false;
      });
      toast.error("Problem creating data");
      console.log(error);
    }
  };
  @action editContactForm = async (contactForm: IContactForm) => {
    this.submitting = true;
    try {
      await agent.ContactForms.editContactForm(contactForm);
      runInAction("edit product", () => {
        this.contactFormRegistry.set(contactForm.id, contactForm);
        this.contactForm = contactForm;
        this.submitting = false;
      });
      history.push("/dashboard/clientProblems");
    } catch (error) {
      runInAction("edit contact form error", () => {
        this.submitting = false;
      });
      toast.error("Problem editing data");
      console.log(error);
    }
  };
  @action deleteContactForm = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.ContactForms.deleteContactForm(id);
      runInAction("delete contact form ", () => {
        this.contactFormRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete contact form error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
  @action loadContactForm = async (id: string) => {
    let contactForm = this.getContactForm(id);
    if (contactForm) {
      this.contactForm = contactForm;
      return contactForm;
    } else {
      this.loadingInitial = true;
    }
    try {
      contactForm = await agent.ContactForms.contactFormDetails(id);
      runInAction("getting contact form", () => {
        this.contactForm = contactForm;
        this.loadingInitial = false;
      });
      return contactForm;
    } catch (error) {
      runInAction("getting contact form error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  getContactForm = (id: string) => {
    return this.contactFormRegistry.get(id);
  };
  @action clearContactForm = () =>{
    this.contactForm = null;
  }
}
//export default createContext(new ContactFormStore());
