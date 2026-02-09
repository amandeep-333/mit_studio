// import { Undo2, Redo2, Save, Download, User } from "lucide-react";

// export default function Navbar() {
//   return (
//     <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
//       {/* Left side */}
//       <div className="flex items-center gap-3">
//         <button className="text-sm text-gray-600 hover:text-black">
//           ← Back
//         </button>
//         <div className="h-6 w-px bg-gray-300" />
//         <h1 className="text-sm font-semibold text-gray-800">Untitled Design</h1>
//       </div>

//       {/* Center controls */}
//       <div className="hidden md:flex items-center gap-2 text-gray-600">
//         <button className="p-2 rounded-md hover:bg-gray-100">
//           <Undo2 className="w-4 h-4" />
//         </button>
//         <button className="p-2 rounded-md hover:bg-gray-100">
//           <Redo2 className="w-4 h-4" />
//         </button>
//         <button className="p-2 rounded-md hover:bg-gray-100">
//           <Save className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-3">
//         <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800">
//           <Download className="w-4 h-4" />
//           Export
//         </button>

//         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//           <User className="w-4 h-4 text-gray-600" />
//         </div>
//       </div>
//     </header>
//   );
// }


import { Undo2, Redo2, Save, Download, User } from "lucide-react";

function Navbar() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-gray-800">
          Untitled Design
        </h1>
      </div>

      {/* Center */}
      <div className="hidden md:flex items-center gap-2 text-gray-600">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Undo2 className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Redo2 className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Save className="w-4 h-4" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800">
          <Download className="w-4 h-4" />
          Export
        </button>

        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
