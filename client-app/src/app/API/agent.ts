import axios, { AxiosResponse } from "axios";
import { request } from "http";
import { config } from "process";
import { toast } from "react-toastify";
import { history } from "../..";
import { IBrand } from "../models/brand";
import { IContactForm } from "../models/contactForm";
import { IProduct } from "../models/product";
import { ISector } from "../models/sector";
import { IUser, IUserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config 
}, error =>{
  return Promise.reject(error);
})

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - make sure API is running!');
    history.push("/notfound");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error('Server error - check terminal for more info!');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};
const Products = {
  productList: (): Promise<IProduct[]> => requests.get("/product"),
  productDetails: (productId: string) => requests.get(`/product/${productId}`),
  productCreate: (product: IProduct) => requests.post("/product", product),
  editProduct: (product: IProduct) =>
    requests.put(`/product/${product.productId}`, product),
  deleteProduct: (productId: string) => requests.del(`/product/${productId}`),
};
const Sectors = {
  sectorList: (): Promise<ISector[]> => requests.get("/sector"),
  sectorDetails: (sectorId: string) => requests.get(`/sector/${sectorId}`),
  sectorCreate: (sector: ISector) => requests.post("/sector", sector),
  editSector: (sector: ISector) =>
    requests.put(`/sector/${sector.sectorId}`, sector),
  deleteSector: (sectorId: string) => requests.del(`/sector/${sectorId}`),
};
const Brands = {
  brandList: (): Promise<IBrand[]> => requests.get("/brand"),
  brandDetails: (brandId: string) => requests.get(`/brand/${brandId}`),
  brandCreate: (brand: IBrand) => requests.post("/brand", brand),
  editBrand: (brand: IBrand) => requests.put(`/brand/${brand.brandId}`, brand),
  deleteBrand: (brandId: string) => requests.del(`/brand/${brandId}`),
};

const User = {
  current: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user),

}

const ContactForms = {
  contactFormList: (): Promise<IContactForm[]> => requests.get("/contactForm"),
  contactFormDetails: (id: string) => requests.get(`/contactForm/${id}`),
  createContactForm: (contactForm: IContactForm) => requests.post("/contactForm", contactForm),
  editContactForm: (contactForm: IContactForm) =>
    requests.put(`/contactForm/${contactForm.id}`, contactForm),
  deleteContactForm: (id: string) => requests.del(`/contactForm/${id}`),
};
const ItemsPage = {
  Products,
  Sectors,
  Brands,
  User,
  ContactForms,
};


export default ItemsPage;
