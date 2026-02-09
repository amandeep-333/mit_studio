import React from "react";
import Sidebar from "./Sidebar";
import MainFile from "../features/design-customizer/MainFile.jsx";
import DesignCustomizer from "../features/design-customizer/MainFile.jsx";
import Navbar from "@/components/Navbar";

function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col sm:ml-64">
        <Navbar />

        <main className="flex-1 overflow-auto">
          <DesignCustomizer />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
