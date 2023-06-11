import {
  Button,
  ComposedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "carbon-components-react";

const IModal = (props: {
  header: string;
  closeModal: () => void;
  onConfirm: () => void;
  targetId: number | number[];
  editData: any;
  setEditData: React.Dispatch<React.SetStateAction<any>>;
  danger?: boolean;
}) => {
  const {
    header,
    closeModal,
    editData,
    setEditData,
    onConfirm,
    danger = false,
  } = props;

  return (
    <ComposedModal
      size="lg"
      open
      onClose={closeModal}
      preventCloseOnClickOutside
    >
      <ModalHeader>
        <h4>{header}</h4>
      </ModalHeader>
      <ModalBody>
        {!danger &&
          Object.keys(editData)
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
        <Button kind={danger ? "danger" : "primary"} onClick={onConfirm}>
          Confirm
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

export default IModal;
