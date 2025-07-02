import { Outlet } from "react-router-dom";
import { Navbar } from "./components/shared/Navbar";
import { Footer } from "./components/shared/Footer";

function App() {
  return (
    <>
   <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;
