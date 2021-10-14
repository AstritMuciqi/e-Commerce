import { action, computed, observable, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../API/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable user: IUser | null = null;

  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable userRegistry = new Map();

  @computed get usersData() {
    return Array.from(this.userRegistry.values());
  }
  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/");
      window.location.reload()
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  @action loadUsers = async () => {
    this.loadingInitial = true;
    try {
      const users = await agent.User.currentList();
      runInAction("loading products", () => {
        users.forEach((user) => {
          user.displayName = user.displayName.split(".")[0];
          this.userRegistry.set(user.token, user);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load products problem", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/");
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };

 
}
