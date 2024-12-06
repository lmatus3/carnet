import { Navbar } from "../components/Navbar";

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="">
      <div className="print:hidden">
        <Navbar />
      </div>
      {children}
    </div>
  );
};
