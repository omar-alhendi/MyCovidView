import { useEffect, useState } from "react";
import {
  bulkRemove,
  bulkUpsert,
  clear,
  getData,
  getAllData,
  remove,
  upsert,
} from "../indexedDB";
import {
  Button,
  ComposedModal,
  ContentSwitcher,
  ContentSwitcherOnChangeData,
  DataTable,
  DataTableHeader,
  DataTableRow,
  DenormalizedRow,
  FileUploader,
  Loading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  OverflowMenu,
  OverflowMenuItem,
  Pagination,
  Switch,
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
  TextInput,
  ToastNotification,
} from "carbon-components-react";
import Papa, { ParseResult } from "papaparse";
import { Edit, TrashCan } from "@carbon/icons-react";
import axios from "axios";

const ImportPage = () => {
  type ModalType = "import" | "add" | "edit" | "delete" | "editHeader" | "";

  const [rows, setRows] = useState<Array<DataTableRow>>([]);
  const [headers, setHeaders] = useState<Array<DataTableHeader>>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState<ModalType>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<number | number[]>(NaN);
  const [editData, setEditData] = useState<any>({});
  const [showNotification, setShowNotification] = useState<
    "success" | "error" | ""
  >("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await loadData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

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

  const openModal = (modal: ModalType) => {
    setOpen(modal);
  };

  const closeModal = () => {
    setOpen("");
  };

  const closeNotification = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setShowNotification("");
    return true;
  };

  const loadData = async () => {
    const data = await getAllData();
    if (data.length === 0) {
      setHeaders([]);
      setRows([]);
      return;
    }
    const fields = Object.keys(data[0]).filter((field) => field !== "id");
    setHeaders(
      fields.map((field) => ({
        header: field,
        key: field,
      }))
    );
    setRows(data.map((t) => ({ ...t, id: String(t.id) })));
  };

  const onAdd = async () => {
    const temp: any = {};
    headers.forEach((header) => {
      temp[header.key] = "";
    });
    setEditData(temp);
    openModal("add");
  };

  const onEdit = async (rowId: string) => {
    setTargetId(parseInt(rowId));
    setEditData(await getData(parseInt(rowId)));
    openModal("edit");
  };

  const onEditHeader = async () => {
    const temp: any = {};
    headers.forEach((header) => {
      temp[header.key] = header.key;
    });
    setEditData(temp);
    openModal("editHeader");
  };

  const onDelete = (rowId: string) => {
    setTargetId(parseInt(rowId));
    openModal("delete");
  };

  const onBatchDelete = (selectedRows: readonly DenormalizedRow[]) => {
    setTargetId(selectedRows.map((row) => parseInt(row.id)));
    openModal("delete");
  };

  const removeDataset = () => {
    setIsLoading(true);
    clear()
      .then(async () => {
        await loadData();
        setIsLoading(false);
        setShowNotification("success");
      })
      .catch(() => {
        setIsLoading(false);
        setShowNotification("error");
      });
  };

  return (
    <div>
      {showNotification === "success" ? (
        <ToastNotification
          kind="success"
          role="status"
          timeout={4000}
          title="Successful"
          onClose={closeNotification}
        />
      ) : showNotification === "error" ? (
        <ToastNotification
          kind="error"
          role="status"
          timeout={4000}
          title="An error occurred"
          onClose={closeNotification}
        />
      ) : (
        <div style={{ height: 50 }}></div>
      )}
      <DataTable
        rows={rows}
        headers={headers}
        isSortable
        render={({
          rows,
          headers,
          selectedRows,
          getHeaderProps,
          onInputChange,
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
                  <TableToolbarSearch onChange={onInputChange} persistent />
                  <TableToolbarMenu light>
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
                  <Button onClick={() => openModal("import")}>Import</Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.length > 0 && <TableHeader />}
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
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
                  {rows
                    .slice((page - 1) * pageSize, page * pageSize)
                    .map((row) => (
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
        totalItems={rows.length}
      ></Pagination>
      {open === "import" ? (
        <ImportModal
          loadData={loadData}
          closeModal={closeModal}
          setIsLoading={setIsLoading}
          setShowNotification={setShowNotification}
        />
      ) : open === "add" ? (
        <AddModal
          loadData={loadData}
          closeModal={closeModal}
          setIsLoading={setIsLoading}
          editData={editData}
          setEditData={setEditData}
          setShowNotification={setShowNotification}
        />
      ) : open === "edit" ? (
        <EditModal
          loadData={loadData}
          closeModal={closeModal}
          setIsLoading={setIsLoading}
          targetId={targetId as number}
          editData={editData}
          setEditData={setEditData}
          setShowNotification={setShowNotification}
        />
      ) : open === "editHeader" ? (
        <EditHeaderModal
          loadData={loadData}
          closeModal={closeModal}
          setIsLoading={setIsLoading}
          editData={editData}
          setEditData={setEditData}
          setShowNotification={setShowNotification}
        />
      ) : open === "delete" ? (
        <DeleteModal
          loadData={loadData}
          closeModal={closeModal}
          setIsLoading={setIsLoading}
          targetId={targetId}
          setShowNotification={setShowNotification}
        />
      ) : null}
      {isLoading && <Loading />}
    </div>
  );
};

const ImportModal = (props: {
  loadData: () => Promise<void>;
  closeModal: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotification: React.Dispatch<
    React.SetStateAction<"success" | "error" | "">
  >;
}) => {
  const { loadData, closeModal, setIsLoading, setShowNotification } = props;
  const [dataSourceType, setDataSourceType] = useState<"file" | "url">("file");

  const toggleDataSourceType = (event: ContentSwitcherOnChangeData) => {
    if (event.name !== "file" && event.name !== "url") return;
    setDataSourceType(event.name);
  };

  const onConfirm = async () => {
    let input;
    let data;
    if (dataSourceType === "file") {
      input = document.querySelector<HTMLInputElement>(
        "#file-input input[type=file]"
      );
      if (input === null || input.files === null) return;
      closeModal();
      setIsLoading(true);
      data = input.files[0];
    } else if (dataSourceType === "url") {
      input = document.querySelector<HTMLInputElement>("#text-input");
      if (input === null || input.value === null) return;
      closeModal();
      setIsLoading(true);
      try {
        data = (await axios.get(input.value)).data;
      } catch {
        setIsLoading(false);
        setShowNotification("error");
        return;
      }
    }
    await clear();
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<object>) => onParseComplete(results),
      error: () => {
        setIsLoading(false);
        setShowNotification("error");
      },
    });
  };

  const onParseComplete = (results: ParseResult<object>) => {
    bulkUpsert(results.data)
      .then(async () => {
        await loadData();
        setIsLoading(false);
        setShowNotification("success");
      })
      .catch(() => {
        setIsLoading(false);
        setShowNotification("error");
      });
  };

  return (
    <ComposedModal
      size="lg"
      open
      onClose={closeModal}
      preventCloseOnClickOutside
    >
      <ModalHeader>
        <h1>Import Data</h1>
      </ModalHeader>
      <ModalBody>
        <ContentSwitcher onChange={toggleDataSourceType}>
          <Switch name="file" text="File" />
          <Switch name="url" text="URL" />
        </ContentSwitcher>
        <div style={{ minHeight: 200, padding: 15 }}>
          {dataSourceType === "file" && (
            <FileUploader
              id="file-input"
              accept={[".csv"]}
              buttonLabel="Add file"
              filenameStatus="edit"
              iconDescription="Delete file"
              labelDescription="Only .csv file is supported."
              labelTitle="Upload file"
              size="md"
            />
          )}
          {dataSourceType === "url" && (
            <>
              <h6 style={{ marginBottom: 5 }}>Enter URL</h6>
              <TextInput
                id="text-input"
                labelText=""
                hideLabel
                size="md"
                type="text"
              />
            </>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button kind="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

const AddModal = (props: {
  loadData: () => Promise<void>;
  closeModal: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  editData: any;
  setEditData: React.Dispatch<React.SetStateAction<any>>;
  setShowNotification: React.Dispatch<
    React.SetStateAction<"success" | "error" | "">
  >;
}) => {
  const {
    loadData,
    closeModal,
    setIsLoading,
    editData,
    setEditData,
    setShowNotification,
  } = props;

  const addRow = async () => {
    closeModal();
    setIsLoading(true);
    upsert(editData)
      .then(async () => {
        await loadData();
        setIsLoading(false);
        setShowNotification("success");
      })
      .catch(() => {
        setIsLoading(false);
        setShowNotification("error");
      });
  };

  return (
    <ComposedModal
      size="lg"
      open
      onClose={closeModal}
      preventCloseOnClickOutside
    >
      <ModalHeader>
        <h4>Add Data</h4>
      </ModalHeader>
      <ModalBody>
        {Object.keys(editData)
          .filter((key) => key !== "id")
          .map((key) => (
            <TextInput
              key={key}
              id={key}
              labelText={key}
              style={{ marginBottom: "1rem" }}
              value={editData[key]}
              onChange={(e) => {
                setEditData({ ...editData, [key]: e.target.value });
              }}
            />
          ))}
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button kind="primary" onClick={addRow}>
          Confirm
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

const EditModal = (props: {
  loadData: () => Promise<void>;
  closeModal: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  targetId: number;
  editData: any;
  setEditData: React.Dispatch<React.SetStateAction<any>>;
  setShowNotification: React.Dispatch<
    React.SetStateAction<"success" | "error" | "">
  >;
}) => {
  const {
    loadData,
    closeModal,
    setIsLoading,
    targetId,
    editData,
    setEditData,
    setShowNotification,
  } = props;

  const editRow = async () => {
    closeModal();
    setIsLoading(true);
    if (!Array.isArray(targetId)) {
      upsert(editData)
        .then(async () => {
          await loadData();
          setIsLoading(false);
          setShowNotification("success");
        })
        .catch(() => {
          setIsLoading(false);
          setShowNotification("error");
        });
    }
  };

  return (
    <ComposedModal
      size="lg"
      open
      onClose={closeModal}
      preventCloseOnClickOutside
    >
      <ModalHeader>
        <h4>Update Data</h4>
      </ModalHeader>
      <ModalBody>
        {Object.keys(editData)
          .filter((key) => key !== "id")
          .map((key) => (
            <TextInput
              key={key}
              id={key}
              labelText={key}
              style={{ marginBottom: "1rem" }}
              value={editData[key]}
              onChange={(e) => {
                setEditData({ ...editData, [key]: e.target.value });
              }}
            />
          ))}
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button kind="primary" onClick={editRow}>
          Confirm
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

const EditHeaderModal = (props: {
  loadData: () => Promise<void>;
  closeModal: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  editData: any;
  setEditData: React.Dispatch<React.SetStateAction<any>>;
  setShowNotification: React.Dispatch<
    React.SetStateAction<"success" | "error" | "">
  >;
}) => {
  const {
    loadData,
    closeModal,
    setIsLoading,
    editData,
    setEditData,
    setShowNotification,
  } = props;

  const editHeaders = async () => {
    closeModal();
    setIsLoading(true);
    const data = await getAllData();
    bulkUpsert(data.map((d) => renameKeys(d, editData)))
      .then(async () => {
        await loadData();
        setIsLoading(false);
        setShowNotification("success");
      })
      .catch(() => {
        setIsLoading(false);
        setShowNotification("error");
      });
  };

  function renameKeys(obj: any, newKeys: any) {
    const keyValues = Object.keys(obj).map((key) => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  return (
    <ComposedModal
      size="lg"
      open
      onClose={closeModal}
      preventCloseOnClickOutside
    >
      <ModalHeader>
        <h4>Update Headers</h4>
      </ModalHeader>
      <ModalBody>
        {Object.keys(editData)
          .filter((key) => key !== "id")
          .map((key) => (
            <TextInput
              key={key}
              id={key}
              labelText={key}
              style={{ marginBottom: "1rem" }}
              value={editData[key]}
              onChange={(e) => {
                setEditData({ ...editData, [key]: e.target.value });
              }}
            />
          ))}
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button kind="primary" onClick={editHeaders}>
          Confirm
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

const DeleteModal = (props: {
  loadData: () => Promise<void>;
  closeModal: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  targetId: number | number[];
  setShowNotification: React.Dispatch<
    React.SetStateAction<"success" | "error" | "">
  >;
}) => {
  const { loadData, closeModal, setIsLoading, targetId, setShowNotification } =
    props;

  const deleteRow = async () => {
    closeModal();
    setIsLoading(true);
    if (Array.isArray(targetId)) {
      bulkRemove(targetId)
        .then(async () => {
          await loadData();
          setIsLoading(false);
          setShowNotification("success");
        })
        .catch(() => {
          setIsLoading(false);
          setShowNotification("error");
        });
    } else {
      remove(targetId)
        .then(async () => {
          await loadData();
          setIsLoading(false);
          setShowNotification("success");
        })
        .catch(() => {
          setIsLoading(false);
          setShowNotification("error");
        });
    }
  };

  return (
    <ComposedModal
      size="lg"
      open
      onClose={closeModal}
      preventCloseOnClickOutside
    >
      <ModalHeader>
        <h4>Are you sure you want to delete the selected row(s)?</h4>
      </ModalHeader>
      <ModalBody />
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button kind="danger" onClick={deleteRow}>
          Delete
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

export default ImportPage;
