import Sidebar from "./Sidebar/Sidebar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar /> 
      <div className="flex-1">
        {children} 
      </div>
    </div>
  );
}