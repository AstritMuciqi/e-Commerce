import { action, observable,  computed,runInAction } from "mobx";
import {  SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../API/agent";
import { IProduct } from "../models/product";
import { RootStore } from "./rootStore";

//configure({ enforceActions: "always" });

export default class ProductStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable productRegistry = new Map();
  @observable loadingInitial = false;
  @observable product: IProduct | null = null;
  @observable submitting = false;
  @observable target = "";

  @computed get productsData() {
    return Array.from(this.productRegistry.values());
  }

  @action loadProducts = async () => {
    this.loadingInitial = true;
    try {
      const products = await agent.Products.productList();
      runInAction("loading products", () => {
        products.forEach((product) => {
          product.productName = product.productName.split(".")[0];
          this.productRegistry.set(product.productId, product);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load products problem", () => {
        this.loadingInitial = false;
      });
    }
  };
  @action createProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.productCreate(product);
      runInAction("create product", () => {
        this.productRegistry.set(product.productId, product);
        this.submitting = false;
      });
      history.push("/dashboard/productmaster/product");
    } catch (error) {
      runInAction("create product error", () => {
        this.submitting = false;
      });
      toast.error("Problem creating data");
      console.log(error);
    }
  };
  @action editProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.editProduct(product);
      runInAction("edit product", () => {
        this.productRegistry.set(product.productId, product);
        this.product = product;
        this.submitting = false;
      });
      history.push("/dashboard/productmaster/product");
    } catch (error) {
      runInAction("edit product error", () => {
        this.submitting = false;
      });
      toast.error("Problem editing data");
      console.log(error);
    }
  };
  @action deleteProduct = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Products.deleteProduct(id);
      runInAction("delete product ", () => {
        this.productRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete product error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
  @action loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.product = product;
      return product;
    } else {
      this.loadingInitial = true;
    }
    try {
      product = await agent.Products.productDetails(id);
      runInAction("getting product", () => {
        this.product = product;
        this.loadingInitial = false;
      });
      return product;
    } catch (error) {
      runInAction("getting product error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  getProduct = (id: string) => {
    return this.productRegistry.get(id);
  };
  @action clearProduct = () =>{
    this.product = null;
  }
}
//export default createContext(new ProductStore());
