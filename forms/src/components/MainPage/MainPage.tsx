import { useState } from "react";
import type { ReactElement } from "react";
import { Modal } from "../Modal/Modal";
import { UncontrolledForm } from "../Forms/UncontrolledForm";
import { HookForm } from "../Forms/HookForm";
import "./MainPage.styles.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export function MainPage(): ReactElement {
  const [modalType, setModalType] = useState<"uncontrolled" | "hook" | null>(
    null
  );

  const closeModal = () => setModalType(null);

  const uncontrolledForms = useSelector(
    (state: RootState) => state.form.uncontrolledForms
  );
  const hookForms = useSelector((state: RootState) => state.form.hookForms);

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
      <h2>Submitted Data</h2>
      <div className="cards">
        {uncontrolledForms.map((item, idx) => (
          <div key={`un-${idx}`} className="card">
            <h3>Uncontrolled Form</h3>
            <p>
              <b>Name:</b> {item.name}
            </p>
            <p>
              <b>Email:</b> {item.email}
            </p>
            <p>
              <b>Country:</b> {item.country}
            </p>
            {item.picture && (
              <img src={item.picture} alt="uploaded" className="preview" />
            )}
          </div>
        ))}

        {hookForms.map((item, idx) => (
          <div key={`hook-${idx}`} className="card">
            <h3>Hook Form</h3>
            <p>
              <b>Name:</b> {item.name}
            </p>
            <p>
              <b>Email:</b> {item.email}
            </p>
            <p>
              <b>Country:</b> {item.country}
            </p>
            {item.picture && (
              <img src={item.picture} alt="uploaded" className="preview" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
