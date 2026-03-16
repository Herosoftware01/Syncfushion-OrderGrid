import Sidebar from "./Sidebar/Sidebar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Always visible */}
      
      {/* Content area scrolls independently */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Optional: If you have a top navbar */}
        {/* <Navbar /> */}

        {/* Scrollable main content */}
        <div className="flex-1 overflow-y-auto p-0">
          {children}
        </div>
      </div>
    </div>
  );
}