import React,{useState , useEffect, SyntheticEvent } from 'react';
import {Container} from 'semantic-ui-react';
import Faturimi from './FaturimiLayout/Faturimi';
import { IProduct } from '../models/product';
import { Route } from 'react-router';
import ProductDashboard from '../../feautures/Details/DashboardDetails/Product/ProductDashboard';
import SectorDashboard from '../../feautures/Details/DashboardDetails/Sector/SectorDashboard';
import { ISector } from '../models/sector';
import { IBrand } from '../models/brand';
import BrandDashboard from '../../feautures/Details/DashboardDetails/Brands/BrandDashboard';
import { Home } from './HomePageLayout/Home';
import Dash from './DashboardLayout/SideBarDashboard/dash';
import agent from '../API/agent';
import './styles.css';
import LoadingComponent from './LoadingComponent';



const App = () => { 
 
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sectors, setSectors] = useState<ISector[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
      null
    );
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');
  
    const handleOpenCreateForm = () => {
      setSelectedProduct(null);
      setSelectedSector(null);

      setEditMode(true);
      
    }
  
    const handleCreateProduct = (product: IProduct) => {
      setSubmitting(true);
      agent.Products.productCreate(product)
        .then(() => {
          setProducts([...products, product]);
          setSelectedProduct(product);
          setEditMode(false);
        })
        .then(() => setSubmitting(false));
    }
  
    const handleEditProduct = (product: IProduct) => {
      setSubmitting(true);
      agent.Products.editProduct(product)
        .then(() => {
          setProducts([
            ...products.filter((p) => p.productId !== product.productId),
            product,
          ]);
          setSelectedProduct(product);
          setEditMode(false);
        })
        .then(() => setSubmitting(false));
    }
  
    const handleDeleteProduct = (event:SyntheticEvent<HTMLButtonElement>,productId: string) => {
      setSubmitting(true);
      setTarget(event.currentTarget.name);
      agent.Products.deleteProduct(productId)
        .then(() => {
          setProducts([...products.filter((p) => p.productId !== productId)]);
        })
        .then(() => setSubmitting(false));

    }
  
    const handleSelectProduct = (productId: string) => {
      setSelectedProduct(products.filter(p => p.productId === productId)[0]);
      setEditMode(false);
    };
    const [selectedSector, setSelectedSector] = useState<ISector | null>(
      null
    );
  
    const handleCreateSector = (sector: ISector) => {
      setSubmitting(true);
      agent.Sectors.sectorCreate(sector).then(()=>{
        setSectors([...sectors, sector]);
        setSelectedSector(sector);
        setEditMode(false);
      })        .then(() => setSubmitting(false));

    }
  
    const handleEditSector = (sector: ISector) => {
      setSubmitting(true);
      agent.Sectors.editSector(sector)
        .then(() => {
          setSectors([
            ...sectors.filter((s) => s.sectorId !== sector.sectorId),
            sector,
          ]);
          setSelectedSector(sector);
          setEditMode(false);
        })
        .then(() => setSubmitting(false));
      
    }
  
    const handleDeleteSector = (event:SyntheticEvent<HTMLButtonElement>,sectorId: string) => {
      setSubmitting(true);
      setTarget(event.currentTarget.name);
      agent.Sectors.deleteSector(sectorId)
        .then(() => {
          setSectors([...sectors.filter((s) => s.sectorId !== sectorId)]);
        })
        .then(() => setSubmitting(false));
    }
  
    const handleSelectSector = (sectorId: string) => {
      setSelectedSector(sectors.filter(s => s.sectorId === sectorId)[0]);
      setEditMode(false);
    };
    const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(
      null
    );
  
    const handleCreateBrand = (brand: IBrand) => {
      setSubmitting(true);
      agent.Brands.brandCreate(brand)
        .then(() => {
          setBrands([...brands, brand]);
          setSelectedBrand(brand);
          setEditMode(false);
        })
        .then(() => setSubmitting(false));
    }
  
    const handleEditBrand = (brand: IBrand) => {
      setSubmitting(true);
      agent.Brands.editBrand(brand)
        .then(() => {
          setBrands([
            ...brands.filter((b) => b.brandId !== brand.brandId),
            brand,
          ]);
          setSelectedBrand(brand);
          setEditMode(false);
        })
        .then(() => setSubmitting(false));
    }
  
    const handleDeleteBrand = (event:SyntheticEvent<HTMLButtonElement>,brandId: string) => {
      setSubmitting(true);
      setTarget(event.currentTarget.name);
      agent.Brands.deleteBrand(brandId)
        .then(() => {
          setBrands([...brands.filter((b) => b.brandId !== brandId)]);
        })
        .then(() => setSubmitting(false));
    }
  
    const handleSelectBrand = (brandId: string) => {
      setSelectedBrand(brands.filter(b => b.brandId === brandId)[0]);
      setEditMode(false);
    };
  
    useEffect(() => {
      agent.Products.productList()
        .then((response) => {
          let products: IProduct[] = [];
          response.forEach((product) => {
            product.productName = product.productName.split(".")[0];
            products.push(product);
          });
          setProducts(products);
        }).then(() => setLoading(false));
    }, []);
    useEffect(() => {
      agent.Sectors.sectorList()
        .then((response) => {
          let sectors: ISector[] = [];
          response.forEach((sector) => {
            sector.sectorName = sector.sectorName.split(".")[0];
            sectors.push(sector);
          });
          setSectors(sectors);
        })
        .then(() => setLoading(false));
    }, []);
    useEffect(() => {
      agent.Brands.brandList()
        .then((response) => {
          let brands: IBrand[] = [];
          response.forEach((brand) => {
            brand.brandName = brand.brandName.split(".")[0];
            brands.push(brand);
          });
          setBrands(brands);
        })
        .then(() => setLoading(false));
    }, []);
    if (loading) return <LoadingComponent content="Please Wait!" />;



    

    return (
      <Container className="APP-Page">
        <Route path="/faturimi" component={Faturimi} />

        <Route path="/dashboard" component={Dash} />
        <Route path="/" component={Home} exact />

        <Route path="/dashboard/productmaster/product">
          <ProductDashboard
            products={products}
            selectProduct={handleSelectProduct}
            selectedProduct={selectedProduct}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedProduct={setSelectedProduct}
            createProduct={handleCreateProduct}
            editProduct={handleEditProduct}
            deleteProduct={handleDeleteProduct}
            openCreateForm={handleOpenCreateForm}
            submitting={submitting}            
            target={target}
          />
        </Route>
        <Route path="/dashboard/productmaster/sectors">
          <SectorDashboard
            sectors={sectors}
            selectSector={handleSelectSector}
            selectedSector={selectedSector}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedSector={setSelectedSector}
            createSector={handleCreateSector}
            editSector={handleEditSector}
            deleteSector={handleDeleteSector}
            openCreateForm={handleOpenCreateForm}
            submitting={submitting}
            target={target}
          />
        </Route>
        <Route path="/dashboard/productmaster/brands">
          <BrandDashboard
            brands={brands}
            selectBrand={handleSelectBrand}
            selectedBrand={selectedBrand}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedBrand={setSelectedBrand}
            createBrand={handleCreateBrand}
            editBrand={handleEditBrand}
            deleteBrand={handleDeleteBrand}
            openCreateForm={handleOpenCreateForm}
            submitting={submitting}
            target={target}
          />
        </Route>
      </Container>
    );
    
    
}
 

export default App;
