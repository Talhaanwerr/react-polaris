import {
  TextField,
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  Badge,
  Page,
  useBreakpoints,
  Thumbnail,
  Banner,
  Tooltip,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
// import { CircleInformationMajor } from "@shopify/polaris-icons";
import products from "../data/products";
import icon from "../assets/icons8-google-48.png";
import warningIcon from "../assets/warning.png";

function Products() {
  const [selected, setSelected] = useState(0);

  const sortOptions = [
    { label: "Product", value: "product asc", directionLabel: "A-Z" },
    { label: "Product", value: "product desc", directionLabel: "Z-A" },
    { label: "Error", value: "error asc", directionLabel: "A-Z" },
    { label: "Error", value: "error desc", directionLabel: "Z-A" },
  ];

  const [sortSelected, setSortSelected] = useState(["product asc"]);
  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const filters = [
    {
      key: "status",
      label: "Status",
      filter: (
        <TextField
          label="Status"
          value={""}
          onChange={() => {}}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const tabWithBadges = [
    {
      label: "All Products",
      badge: 6,
    },
    {
      label: "Ineligible",
      badge: 2,
    },
    {
      label: "Pending",
      badge: 4,
    },
    {
      label: "Submitted",
      badge: 10,
    },
    {
      label: "Submitted with Warnings",
      badge: 12,
    },
    {
      label: "Excluded",
      badge: 0,
    },
  ];

  const tabs = tabWithBadges.map((item, idx) => ({
    content: item.label,
    id: idx.toString(),
    badge: item.badge || "0",
  }));

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const headings = [
    { title: "Product" },
    { title: "" },
    { title: "Google Product Category" },
    {
      title: (
        <div>
          <img
            src={icon}
            alt="Google"
            style={{ width: "16px", height: "16px" }}
          />
        </div>
      ),
    },
    { title: "Error from Merchant Center" },
  ];

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const rowMarkup = products.map(
    ({ id, product, category, error, image, tooltip }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Thumbnail source={image} alt={product} />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {product}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{category || ""}</IndexTable.Cell>
        <IndexTable.Cell>
          <Tooltip content={tooltip || "No additional info"}>
            <div>
              <img
                src={warningIcon}
                alt=""
                style={{ width: "16px", height: "16px" }}
              />
            </div>
          </Tooltip>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <img
            src={icon}
            alt="Google"
            style={{ width: "16px", height: "16px" }}
          />
          <Tooltip content={"Error"}>
            <img
              src={warningIcon}
              alt=""
              style={{ width: "16px", height: "16px" }}
            />
          </Tooltip>
          {error}
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Page title="Products">
      <LegacyCard>
        <IndexFilters
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          queryValue={""}
          queryPlaceholder="Search products"
          onQueryChange={() => {}}
          onQueryClear={() => {}}
          onSort={setSortSelected}
          // primaryAction={primaryAction}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          filters={filters}
          appliedFilters={[]}
          onClearAll={() => {}}
          mode={mode}
          setMode={setMode}
        />
        <IndexTable
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={products.length}
          selectedItemsCount={
            allResourcesSelected ? "All Products" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={headings}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </Page>
  );
}

export default Products;
