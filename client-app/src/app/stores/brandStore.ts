import { action, configure, observable ,runInAction} from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../API/agent";
import { IBrand } from "../models/brand";
configure({enforceActions: 'always'});
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
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create brand error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
  @action editBrand = async (brand: IBrand) => {
    this.submitting = true;
    try {
      await agent.Brands.editBrand(brand);
      runInAction("edit brand ", () => {
        this.brandRegistry.set(brand.brandId, brand);
        this.selectedBrand = brand;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit brand error", () => {
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
      runInAction("delete brand ", () => {
        this.brandRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete brand error", () => {
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
