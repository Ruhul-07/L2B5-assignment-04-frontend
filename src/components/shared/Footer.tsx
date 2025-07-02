export const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white p-4 mt-8 text-center shadow-inner">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Book App. All rights reserved.</p>
        <p className="text-sm mt-1">Created By MD.RUHUL AMIN.</p>
      </div>
    </footer>
  );
};