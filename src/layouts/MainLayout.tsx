import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { useUIStore } from "../stores/UIStore";

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isLoading = useUIStore((state) => state.loading);
  return (
    <div className="w-svw overflow-x-hidden">
      <div className="print:hidden">
        <Navbar />
      </div>
      <div className="mb-14">{children}</div>
      {isLoading && <Loader />}
    </div>
  );
};
