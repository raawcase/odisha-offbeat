import PackageClient from "./PackageClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PackageClient id={id} />;
}