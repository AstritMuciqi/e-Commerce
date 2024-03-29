import { action, computed,  observable,runInAction} from "mobx";
import {  SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../API/agent";
import { ISector } from "../models/sector";
import { RootStore } from "./rootStore";

//configure({ enforceActions: "always" });

export default class SectorStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }


  @observable sectorRegistry = new Map();
  @observable loadingInitial = false;
  @observable sector: ISector | null = null;
  @observable submitting = false;
  @observable target = "";

  @computed get sectorsData() {
    return Array.from(this.sectorRegistry.values());
  }
  @action loadSectors = async () => {
    this.loadingInitial = true;
    try {
      const sectors = await agent.Sectors.sectorList();
      runInAction("loading sector error", () => {
        sectors.forEach((sector) => {
          sector.sectorName = sector.sectorName.split(".")[0];
          this.sectorRegistry.set(sector.sectorId, sector);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading sector error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  @action createSector = async (sector: ISector) => {
    this.submitting = true;
    try {
      await agent.Sectors.sectorCreate(sector);
      runInAction("create sector ", () => {
        this.sectorRegistry.set(sector.sectorId, sector);
        this.submitting = false;
      });
      history.push("/dashboard/productmaster/sectors")
    } catch (error) {
      runInAction("create sector error", () => {
        this.submitting = false;
      });
      toast.error("Problem creating data");
      console.log(error);
    }
  };
  @action editSector = async (sector: ISector) => {
    this.submitting = true;
    try {
      await agent.Sectors.editSector(sector);
      runInAction("edit sector error", () => {
        this.sectorRegistry.set(sector.sectorId, sector);
        this.sector = sector;
        this.submitting = false;
      });
      history.push("/dashboard/productmaster/sectors")
    } catch (error) {
      runInAction("edit sector error", () => {
        this.submitting = false;
      });
      toast.error("Problem editing data");
      console.log(error);
    }
  };
  @action deleteSector = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Sectors.deleteSector(id);
      runInAction("delete sector", () => {
        this.sectorRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("edit sector error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
  @action loadSector = async (id: string) => {
    let sector = this.getSector(id);
    if (sector) {
      this.sector = sector;
      return sector;
    } else {
      this.loadingInitial = true;
    }
    try {
      sector = await agent.Sectors.sectorDetails(id);
      runInAction("getting sector", () => {
        this.sector = sector;
        this.loadingInitial = false;
      });
      return sector;
    } catch (error) {
      runInAction("getting sector error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  getSector = (id: string) => {
    return this.sectorRegistry.get(id);
  };
  @action clearSector = () => {
    this.sector = null;
  };
}
//export default createContext(new SectorStore());
