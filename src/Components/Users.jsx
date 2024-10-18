import { Outlet, Link } from "react-router-dom";
import Commen_head from "./layouts/commen/header";

export default function Users() {

  const Footer = () => (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </footer>
  );

  return (
    <div className="h-screen">
      <Commen_head />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
