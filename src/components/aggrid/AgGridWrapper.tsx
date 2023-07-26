import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useContainerWidth } from "../../hooks/useContainerWidth";

export function AgGridWrapper({
  onGridReady,
  theme = "ag-theme-material",
  debounce = 0,
  ...props
}: AgGridReactProps & { theme?: string; debounce?: number }) {
  const [gridApi, setGridApi] = useState<GridApi | undefined>();
  const [windowWidth] = useWindowSize(debounce);
  const { width: containerWidth, ref } = useContainerWidth(debounce);
  useEffect(() => {
    if (gridApi) {
      // gridApi.sizeColumnsToFit();
    }
  }, [windowWidth, containerWidth, gridApi]);

  function handleGridReady(event: GridReadyEvent) {
    if (onGridReady) {
      onGridReady(event);
    }
    setGridApi(event.api);
  }

  return (
    <div className={theme} ref={ref} style={{ height: "100%" }}>
      <AgGridReact onGridReady={handleGridReady} {...props} />
    </div>
  );
}
