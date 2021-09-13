import { IProduct } from "../../models/product";
import Dash from "./SideBarDashboard/dash";


interface IProps {
  products:IProduct[];
  selectProduct: (productId: string) => void;
  selectedProduct: IProduct | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedProduct: (product: IProduct | null) => void;
  createProduct: (product: IProduct) => void;
  editProduct: (product: IProduct) => void;
  deleteProduct: (productId: string) => void;
}

const Dashboard = () => { 
    return (
      <div>
        <Dash />
        
      </div>
    );
  }
 

export default Dashboard;
