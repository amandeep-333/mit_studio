import { useState } from "react";
import {
  LayoutDashboard,
  KanbanSquare,
  Inbox,
  Users,
  ShoppingCart,
  LogIn,
  FileText,
  LifeBuoy,
  Crown,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="text-gray-700 bg-transparent hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-md ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden"
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
        <div className="h-full flex flex-col">
          {/* Logo + Close Button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              {/* Red circle logo */}
              <div className="w-8 h-8 rounded-full bg-red-500" />
              <span className="font-semibold text-gray-800">MyApp</span>
            </div>

            {/* Close button (mobile only) */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-gray-200 sm:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu */}
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <SidebarItem label="Dashboard" icon={LayoutDashboard} />
              <SidebarItem label="Kanban" icon={KanbanSquare} badge="Pro" />
              <SidebarItem label="Inbox" icon={Inbox} badge="2" />
              <SidebarItem label="Users" icon={Users} />
              <SidebarItem label="Products" icon={ShoppingCart} />
              <SidebarItem label="Sign In" icon={LogIn} />
            </ul>

            <ul className="space-y-2 font-medium border-t border-gray-200 pt-4 mt-4">
              <SidebarItem label="Documentation" icon={FileText} />
              <SidebarItem label="Support" icon={LifeBuoy} />
              <SidebarItem label="PRO version" icon={Crown} />
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SidebarItem({ label, badge, icon: Icon }) {
  return (
    <li>
      <a
        href="#"
        className="flex items-center px-2 py-1.5 text-gray-700 rounded-md hover:bg-gray-200 hover:text-blue-600 transition-colors"
      >
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
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
