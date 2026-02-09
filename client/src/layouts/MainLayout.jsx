import React from "react";
import Sidebar from "./Sidebar";
import MainFile from "../features/design-customizer/MainFile.jsx";
import DesignCustomizer from "../features/design-customizer/MainFile.jsx";

function MainLayout() {
  return (
    <>
      <Sidebar />

      <main className="sm:ml-64 min-h-screen">
        <DesignCustomizer />
      </main>
    </>
  );
}

export default MainLayout;
