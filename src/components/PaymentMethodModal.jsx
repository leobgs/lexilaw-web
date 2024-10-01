import { Modal } from "./Modal";

export const PaymentMethodModal = ({
  isShow,
  snapURL,
  onHide = () => {},
}) => {
  return (
    <Modal
      show={isShow}
      onHide={() => {
        onHide();
      }}
      contentClassName="bg-[#FCFCFC] overflow-y-scroll no-scrollbar bg-white max-h-[700px] max-w-[420px] rounded-lg md:rounded animate"
      className="bg-neutral-40"
    >
      {snapURL && (
        <div className="w-full h-full flex items-center justify-center">
          <iframe
            src={snapURL}
            title="Payment Gateway"
            className="w-full h-full"
            style={{ minHeight: "78vh", minWidth: "80vh" }}
          />
        </div>
      )}
    </Modal>
  );
};
