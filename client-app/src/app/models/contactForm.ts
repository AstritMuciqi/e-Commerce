export interface IContactForm {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }
  export class ContactFormValues {
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    message: string = "";
    constructor(init?: any) {
      Object.assign(this, init);
    }
  }
  