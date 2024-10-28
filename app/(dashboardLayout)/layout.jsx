import DashboardSidebar from "@/components/dashboard/layout/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex ">
      <DashboardSidebar />
      <main className=" p-5 flex-grow flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
