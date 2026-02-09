import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="text-gray-700 bg-transparent border border-transparent hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-md ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h10"
          />
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 border-r border-gray-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <SidebarItem label="Dashboard" />
            <SidebarItem label="Kanban" badge="Pro" />
            <SidebarItem label="Inbox" badge="2" />
            <SidebarItem label="Users" />
            <SidebarItem label="Products" />
            <SidebarItem label="Sign In" />
          </ul>

          <ul className="space-y-2 font-medium border-t border-gray-200 pt-4 mt-4">
            <SidebarItem label="Documentation" />
            <SidebarItem label="Support" />
            <SidebarItem label="PRO version" />
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64 w-full">
        <div className="p-4 border border-dashed border-gray-300 rounded-md">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 rounded-md bg-gray-100"
              >
                +
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center h-48 rounded-md bg-gray-100 mb-4">
            +
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 rounded-md bg-gray-100"
              >
                +
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ label, badge }) {
  return (
    <li>
      <a
        href="#"
        className="flex items-center px-2 py-1.5 text-gray-700 rounded-md hover:bg-gray-200 hover:text-blue-600 transition-colors"
      >
        <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
        {badge && (
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-200 border border-gray-300">
            {badge}
          </span>
        )}
      </a>
    </li>
  );
}
