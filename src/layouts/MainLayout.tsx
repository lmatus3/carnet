import { Navbar } from "../components/Navbar";

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="w-svw overflow-x-hidden">
      <div className="print:hidden">
        <Navbar />
      </div>
      <div className="mb-14">{children}</div>
    </div>
  );
};
