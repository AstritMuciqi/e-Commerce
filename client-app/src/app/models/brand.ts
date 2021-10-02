export interface IBrand{
    brandId: string;
    brandName: string;
    
}

export class BrandFormValues{
    brandId?:string= undefined;
    brandName:string= "";
    constructor(init?:any){
        Object.assign(this,init);
    }
}