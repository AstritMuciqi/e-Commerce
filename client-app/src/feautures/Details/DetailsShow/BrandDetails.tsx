import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const BrandDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { brand, loadBrand, loadingInitial } = rootStore.brandStore;

  useEffect(() => {
    loadBrand(match.params.id);
  }, [loadBrand, match.params.id]);
  if (loadingInitial || !brand)
    return <LoadingComponent content="Loading Brand..." />;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{brand.brandName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/manage/brand/${brand.brandId}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/dashboard/productmaster/brands")}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(BrandDetails);
