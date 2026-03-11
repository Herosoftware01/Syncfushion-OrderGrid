import Sidebar from "./Sidebar/Sidebar";
 
export default function ProtectedLayout({ children }) {
  return (
<<<<<<< HEAD
    <div className="flex">
      <Sidebar /> 
      <div className="flex-1">
        {children} 
      </div>
    </div>
=======
    <Sidebar children={children} />
>>>>>>> 8576b71c2eb06f5c474f941aba547e37c359f0f1
  );
}