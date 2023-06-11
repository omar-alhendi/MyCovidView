import { DataTableSortState } from "carbon-components-react/lib/components/DataTable/state/sorting";
import { useCallback, useState } from "react";

export type SortInfo = {
  columnId: string;
  direction: DataTableSortState;
};

const useSortInfo = () => {
  const [sortInfo, setSortInfo] = useState<SortInfo>({
    columnId: "",
    direction: "NONE",
  });

  const invokeSetSortInfo = useCallback(
    ({
      columnId,
      oldDirection,
    }: {
      columnId: string;
      oldDirection: DataTableSortState;
    }) => {
      const directions: DataTableSortState[] = ["NONE", "ASC", "DESC"];
      const index = directions.indexOf(oldDirection);
      const direction = directions[(index + 1) % directions.length];
      setSortInfo({
        columnId,
        direction,
      });
    },
    [setSortInfo]
  );

  return [sortInfo, invokeSetSortInfo] as const;
};

export { useSortInfo };
