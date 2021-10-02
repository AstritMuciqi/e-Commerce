export interface IProduct {
  productId: string;
  productName: string;
  sector: string;
  brand: string;
  valueOfProduct: number;
  modelYear: string;
  quantity: number;
  description: string;
}
export class ProductFormValues {
  productId: string = "" ;
  productName: string = '';
  sector: string = '';
  brand: string = '';
  valueOfProduct?: number ;
  modelYear: string = "";
  quantity?: number ;
  description: string = "";
  constructor(init?: any) {
    Object.assign(this, init);
  }
}
