import Nav from "./_components/nav";

export const metadata = {
  title: "Absen Pulang",
};
export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
