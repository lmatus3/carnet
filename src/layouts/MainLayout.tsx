import { Navbar } from "../components/Navbar";

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};
