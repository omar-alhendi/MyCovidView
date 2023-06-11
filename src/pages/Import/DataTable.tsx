import { useEffect, useState } from "react";
import {
  Button,
  DataTable,
  DataTableHeader,
  DataTableRow,
  DenormalizedRow,
  OverflowMenu,
  OverflowMenuItem,
  Pagination,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
} from "carbon-components-react";
import { Edit, TrashCan } from "@carbon/icons-react";
import { SortInfo, useSortInfo } from "../../hooks/useSortInfo";
import { DataTableSortState } from "carbon-components-react/lib/components/DataTable/state/sorting";

const IDataTable = ({
  data,
  totalItemsLength,
  setQuery,
  onBatchDelete,
  onAdd,
  removeDataset,
  onImport,
  onEditHeader,
  onEdit,
  onDelete,
}: {
  data: any[];
  totalItemsLength: number;
  setQuery: ({
    page,
    pageSize,
    searchString,
    sortInfo,
  }: {
    page: number;
    pageSize: number;
    searchString: string;
    sortInfo: SortInfo;
  }) => void;
  onBatchDelete: (selectedRows: readonly DenormalizedRow[]) => void;
  onAdd: () => void;
  removeDataset: () => void;
  onImport: () => void;
  onEditHeader: () => void;
  onEdit: (rowId: string) => void;
  onDelete: (rowId: string) => void;
}) => {
  const [rows, setRows] = useState<Array<DataTableRow>>([]);
  const [headers, setHeaders] = useState<Array<DataTableHeader>>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState("");
  const [sortInfo, setSortInfo] = useSortInfo();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery({ page, pageSize, searchString, sortInfo });
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchString, sortInfo]);

  useEffect(() => {
    let headers: Array<DataTableHeader> = [];
    let rows: Array<DataTableRow> = [];
    let sortHeaderExists = false;
    if (data.length !== 0) {
      headers = Object.keys(data[0])
        .filter((field) => field !== "id")
        .map((field) => ({
          header: field,
          key: field,
        }));
      if (rows.length > pageSize) {
        rows = rows.slice((page - 1) * pageSize, page * pageSize);
      }
      rows = data.map((t) => ({ ...t, id: String(t.id) }));
      sortHeaderExists = Object.keys(data[0]).includes(sortInfo.columnId);
    }
    if (!sortHeaderExists) setSortInfo({ columnId: "", oldDirection: "NONE" });
    setRows(rows);
    setHeaders(headers);
  }, [data]);

  const changePaginationState = (pageInfo: {
    page: number;
    pageSize: number;
  }) => {
    if (page != pageInfo.page) {
      setPage(pageInfo.page);
    }
    if (pageSize != pageInfo.pageSize) {
      setPageSize(pageInfo.pageSize);
    }
  };

  const changeSearchstring = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleChangeSort = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const columnId = event.currentTarget.dataset.columnId ?? "";
    const oldDirection = event.currentTarget.dataset
      .sortDirection as DataTableSortState;
    setSortInfo({ columnId, oldDirection });
  };

  return (
    <div>
      <DataTable
        rows={rows}
        headers={headers}
        isSortable
        render={({
          rows,
          headers,
          selectedRows,
          getHeaderProps,
          getBatchActionProps,
          getSelectionProps,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <TableContainer>
              <TableToolbar>
                <TableBatchActions {...batchActionProps}>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={TrashCan}
                    onClick={() => onBatchDelete(selectedRows)}
                  >
                    Delete
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <TableToolbarSearch
                    onChange={changeSearchstring}
                    persistent
                  />
                  <TableToolbarMenu>
                    <TableToolbarAction
                      disabled={rows.length === 0}
                      onClick={onAdd}
                    >
                      Add Row
                    </TableToolbarAction>
                    <TableToolbarAction
                      isDelete
                      hasDivider
                      disabled={rows.length === 0}
                      onClick={removeDataset}
                    >
                      Remove Dataset
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <Button onClick={onImport}>Import</Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.length > 0 && <TableHeader />}
                    {headers.map((header) => {
                      const isSortHeader = header.key === sortInfo.columnId;
                      const sortDirection = isSortHeader
                        ? sortInfo.direction
                        : "NONE";
                      return (
                        <TableHeader
                          {...getHeaderProps({ header })}
                          isSortHeader={isSortHeader}
                          sortDirection={sortDirection}
                          data-column-id={header.key}
                          data-sort-direction={sortDirection}
                          onClick={handleChangeSort}
                        >
                          {header.header}
                        </TableHeader>
                      );
                    })}
                    {headers.length > 0 && (
                      <TableHeader>
                        <Button
                          style={{ color: "black" }}
                          renderIcon={Edit}
                          hasIconOnly
                          className="cds--overflow-menu cds--overflow-menu--sm"
                          iconDescription="Edit Headers"
                          tooltipPosition="bottom"
                          tooltipAlignment="end"
                          onClick={onEditHeader}
                        />
                      </TableHeader>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      <TableCell>
                        <OverflowMenu size="sm" flipped>
                          <OverflowMenuItem
                            itemText="Edit"
                            onClick={() => onEdit(row.id)}
                          />
                          <OverflowMenuItem
                            itemText="Delete"
                            onClick={() => onDelete(row.id)}
                          />
                        </OverflowMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }}
      />
      <Pagination
        onChange={changePaginationState}
        page={page}
        pageSize={pageSize}
        pageSizes={[10, 20, 100]}
        totalItems={totalItemsLength}
      ></Pagination>
    </div>
  );
};

export default IDataTable;
