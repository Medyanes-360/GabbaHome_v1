import NavbarComponent from "@/containers/layout/navbarComponent";

export default function HomeLayout({ children }) {
  return (
    <>
      <NavbarComponent />
      <div className="px-4"> {children}</div>
    </>
  );
}
