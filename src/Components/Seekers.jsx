import { Navigate, Outlet } from "react-router-dom";
import Studens_header from "./layouts/studens/studens_header";

export default function Seekers() {
  return (
    <>
      <Studens_header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
