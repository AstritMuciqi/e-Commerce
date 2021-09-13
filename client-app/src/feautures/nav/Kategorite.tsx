import React from "react";
import { ISector } from "../../app/models/sector";
import '../../app/layout/styles.css';


interface IProps {
  sectors:ISector[];
  // selectActivity: (id: string) => void;
  // selectedActivity: IActivity | null;
  // editMode: boolean;
  // setEditMode: (editMode: boolean) => void;
  // setSelectedActivity: (activity: IActivity | null) => void;
  // createActivity: (activity: IActivity) => void;
  // editActivity: (activity: IActivity) => void;
  // deleteActivity: (id: string) => void;
}

  const Kategorite: React.FC<IProps> = ({
    sectors,
    // selectProduct,
    // selectedProduct,
    // editMode,
    // setEditMode,
    // setSelectedProduct,
    // createProduct,
    // editProduct,
    // deleteProduct,
    // openCreateForm
  }) => {
    return (
      <div className="kategoria">
        {sectors.map((sector) => (
          <button className="hoverButtons" key={sector.sectorId}>
              <p className="teksti" style={{textDecoration:"none"}}>{sector.sectorName}</p>
          </button>
        ))}
      </div>
    );
  };
  
  export default Kategorite;
  
