export interface ISector{
    sectorId: string;
    sectorName: string;
    
}

export class SectorFormValues{
    sectorId?:string= undefined;
    sectorName:string= "";
    constructor(init?:any){
        Object.assign(this,init);
    }
}