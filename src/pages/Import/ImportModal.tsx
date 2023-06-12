import { useState } from "react";
import { initDB, db } from "../../indexedDB";
import {
  Button,
  ComposedModal,
  ContentSwitcher,
  ContentSwitcherOnChangeData,
  FileUploader,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Switch,
  TextInput,
} from "carbon-components-react";
import Papa, { ParseResult } from "papaparse";
import axios from "axios";

const ImportModal = (props: {
  closeModal: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotification: React.Dispatch<
    React.SetStateAction<"success" | "error" | "">
  >;
}) => {
  const { closeModal, setIsLoading, setShowNotification } = props;
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
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: function (header) {
        return header.trim().replace(/[?]/g, "").replace(/ /g, "_");
      },
      complete: (results: ParseResult<object>) => onParseComplete(results),
      error: () => {
        setIsLoading(false);
        setShowNotification("error");
      },
    });
  };

  const onParseComplete = async (results: ParseResult<object>) => {
    const fields = ["++id"];
    results.meta.fields?.forEach((field) => fields.push(field));
    setIsLoading(true);
    await initDB(fields.join(","));
    db.store
      .bulkAdd(results.data)
      .then(async () => {
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

export default ImportModal;
