import { useState } from "react";
import type { ReactElement } from "react";
import { Modal } from "../Modal/Modal";
import { UncontrolledForm } from "../Forms/UncontrolledForm";
import { HookForm } from "../Forms/HookForm";
import "./MainPage.styles.css";

export function MainPage(): ReactElement {
  const [modalType, setModalType] = useState<"uncontrolled" | "hook" | null>(
    null
  );

  const closeModal = () => setModalType(null);

  return (
    <div className="main-page">
      <h1>Forms</h1>
      <button onClick={() => setModalType("uncontrolled")}>
        Open Uncontrolled Form
      </button>
      <button onClick={() => setModalType("hook")}>Open React Hook Form</button>

      {modalType && (
        <Modal onClose={closeModal}>
          {modalType === "uncontrolled" && (
            <UncontrolledForm onSuccess={closeModal} />
          )}
          {modalType === "hook" && <HookForm onSuccess={closeModal} />}
        </Modal>
      )}
    </div>
  );
}
