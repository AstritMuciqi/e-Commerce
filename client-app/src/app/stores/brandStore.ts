import { action, observable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../API/agent";
import { IBrand } from "../models/brand";

class BrandStore {
  @observable brandRegistry = new Map();
  @observable brands: IBrand[] = [];
  @observable selectedBrand: IBrand | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @action loadBrands = async () => {
    this.loadingInitial = true;
    try {
      const brands = await agent.Brands.brandList();
      action("loading brand", () => {
        brands.forEach((brand) => {
          brand.brandName = brand.brandName.split(".")[0];
          this.brandRegistry.set(brand.brandId, brand);
        });
      });
      this.loadingInitial = false;
    } catch (error) {
      action("loading brand error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  @action createBrand = async (brand: IBrand) => {
    this.submitting = true;
    try {
      await agent.Brands.brandCreate(brand);
      action("create brand ", () => {
        this.brandRegistry.set(brand.brandId, brand);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      action("create brand error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
  @action editBrand = async (brand: IBrand) => {
    this.submitting = true;
    try {
      await agent.Brands.editBrand(brand);
      action("edit brand ", () => {
        this.brandRegistry.set(brand.brandId, brand);
        this.selectedBrand = brand;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      action("edit brand error", () => {
        this.submitting = false;
      });
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
      action("delete brand ", () => {
        this.brandRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      action("delete brand error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedBrand = undefined;
  };
  @action selectBrand = (id: string) => {
    this.selectedBrand = this.brandRegistry.get(id);
    this.editMode = false;
  };

  @action openEditForm = (id: string) => {
    this.selectedBrand = this.brandRegistry.get(id);
    this.editMode = true;
  };
  @action cancelSelectedBrand = () => {
    this.selectedBrand = undefined;
  };
  @action cancelFormOpen = () => {
    this.editMode = false;
  };
}
export default createContext(new BrandStore());
