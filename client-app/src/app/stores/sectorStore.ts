import { action, observable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../API/agent";
import { ISector } from "../models/sector";

class SectorStore {
  @observable sectorRegistry = new Map();
  @observable sectors: ISector[] = [];
  @observable selectedSector: ISector | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @action loadSectors = async () => {
    this.loadingInitial = true;
    try {
      const sectors = await agent.Sectors.sectorList();
      action("loading brand error", () => {
        sectors.forEach((sector) => {
          sector.sectorName = sector.sectorName.split(".")[0];
          this.sectorRegistry.set(sector.sectorId, sector);
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
  @action createSector = async (sector: ISector) => {
    this.submitting = true;
    try {
      await agent.Sectors.sectorCreate(sector);
      action("create brand ", () => {
        this.sectorRegistry.set(sector.sectorId, sector);
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
  @action editSector = async (sector: ISector) => {
    this.submitting = true;
    try {
      await agent.Sectors.editSector(sector);
      action("edit brand error", () => {
        this.sectorRegistry.set(sector.sectorId, sector);
        this.selectedSector = sector;
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
  @action deleteSector = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Sectors.deleteSector(id);
      action("delete brand error", () => {
        this.sectorRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      action("edit brand error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedSector = undefined;
  };
  @action selectSector = (id: string) => {
    this.selectedSector = this.sectorRegistry.get(id);
    this.editMode = false;
  };

  @action openEditForm = (id: string) => {
    this.selectedSector = this.sectorRegistry.get(id);
    this.editMode = true;
  };
  @action cancelSelectedSector = () => {
    this.selectedSector = undefined;
  };
  @action cancelFormOpen = () => {
    this.editMode = false;
  };
}
export default createContext(new SectorStore());
