import { action, computed, observable ,runInAction} from "mobx";
import {  SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../API/agent";
import { IBrand } from "../models/brand";
import { RootStore } from "./rootStore";

//configure({enforceActions: 'always'});

export default class BrandStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable brandRegistry = new Map();
  @observable brand: IBrand | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get brandsData(){
    return Array.from(this.brandRegistry.values());
  }
  @action loadBrands = async () => {
    this.loadingInitial = true;
    try {
      const brands = await agent.Brands.brandList();
      runInAction("loading brand", () => {
        brands.forEach(brand => {
          brand.brandName = brand.brandName.split(".")[0];
          this.brandRegistry.set(brand.brandId, brand);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading brand error", () => {
        this.loadingInitial = false;
      });
    }
  };
  @action createBrand = async (brand: IBrand) => {
    this.submitting = true;
    try {
      await agent.Brands.brandCreate(brand);
      runInAction("create brand ", () => {
        this.brandRegistry.set(brand.brandId, brand);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create brand error", () => {
        this.submitting = false;
      });
      toast.error("Problem creating data");
      console.log(error);
    }
  };
  @action editBrand = async (brand: IBrand) => {
    this.submitting = true;
    try {
      await agent.Brands.editBrand(brand);
      runInAction("edit brand ", () => {
        this.brandRegistry.set(brand.brandId, brand);
        this.submitting = false;
      });
      history.push("/dashboard/productmaster/brands")
    } catch (error) {
      runInAction("edit brand error", () => {
        this.submitting = false;
      });
      toast.error("Problem editing data");
      console.log(error);
    }
  };
  @action deleteBrand = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Brands.deleteBrand(id);
      runInAction("delete brand ", () => {
        this.brandRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
      history.push("/dashboard/productmaster/brands")
    } catch (error) {
      runInAction("delete brand error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
  @action loadBrand = async (id: string) => {
    let brand = this.getBrand(id);
    if (brand) {
      this.brand = brand;
      return brand;
    } else {
      this.loadingInitial = true;
    }
    try {
      brand = await agent.Brands.brandDetails(id);
      runInAction("getting brand", () => {
        this.brand = brand;
        this.loadingInitial = false;
      });
      return brand;
    } catch (error) {
      runInAction("getting brand error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  getBrand = (id: string) => {
    return this.brandRegistry.get(id);
  };
  @action clearBrand = () => {
    this.brand = null;
  };
}
//export default createContext(new BrandStore());
