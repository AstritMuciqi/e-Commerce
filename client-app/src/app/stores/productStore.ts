import {action, observable,configure} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../API/agent';
import { IProduct } from '../models/product'

configure({enforceActions:'always'})

class ProductStore {
  @observable productRegistry = new Map();
  @observable products: IProduct[] = [];
  @observable selectedProduct: IProduct | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @action loadProducts = async () => {
    this.loadingInitial = true;
    try {
      const products = await agent.Products.productList()
      action('loading products',() => {
        products.forEach((product) => {
          product.productName = product.productName.split(".")[0];
          this.productRegistry.set(product.productId, product);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      action('load products problem', ()=>{
        this.loadingInitial = false;
      })
      console.log(error);
    }
  };
  @action createProduct = async (product : IProduct) => {
    this.submitting=true;
    try{
      await agent.Products.productCreate(product);
      action('create product',() => {
      this.productRegistry.set(product.productId,product)
      this.editMode=false;
      this.submitting = false;
      })
    }catch(error){
      action('create product error',() => {
      this.submitting = false;
      })
      console.log(error);
    }

  }
  @action editProduct = async (product : IProduct) => {
    this.submitting=true;
    try{
      await agent.Products.editProduct(product);
      action('edit product',() => {
      this.productRegistry.set(product.productId,product);
      this.selectedProduct = product;
      this.editMode=false;
      this.submitting = false;
      })
    }catch(error){
      action('edit product error',() => {
      this.submitting = false;
      })
      console.log(error);
    }

  }
  @action deleteProduct = async(event:SyntheticEvent<HTMLButtonElement>,id:string)=>{
    this.submitting=true;
    this.target = event.currentTarget.name;
    try{
      await agent.Products.deleteProduct(id);
      action('delete product ',() => {
      this.productRegistry.delete(id);
      this.submitting=false;
      this.target='';
      })
    }catch(error){
      action('delete product error',() => {
      this.submitting=false;
      this.target='';
      })
      console.log(error);
    }
    
  }
  @action openCreateForm = () => {
    this.editMode=true;
    this.selectedProduct = undefined;
  }
  @action openEditForm = (id:string) => {
    this.selectedProduct=this.productRegistry.get(id);
    this.editMode=true;
  }
  @action cancelSelectedProduct = () => {
    this.selectedProduct=undefined;
  }
  @action cancelFormOpen = () => {
    this.editMode=false;
  }
  @action selectProduct = (id: string) => {
    this.selectedProduct = this.productRegistry.get(id);
    this.editMode = false;
  };
}
export default createContext(new ProductStore());