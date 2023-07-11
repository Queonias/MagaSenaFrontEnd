import { useContext } from "react";
import AppConext from "./AppContext";
import style from "../styles/alert.module.css"

export default function Alert() {
  const context = useContext(AppConext);
  return (
    <>
      { context.errosContext && (
        <div className={`alert alert-danger alert-dismissible fade show ${style.alert}`} role="alert">
         {context.errosContext}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      )}
    </>
  );
}