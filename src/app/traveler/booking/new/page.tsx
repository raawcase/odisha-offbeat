import BookingNewClient from "./BookingNewClient";

export default async function Page({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const sp = await searchParams;
  return <BookingNewClient packageId={sp.package} />;
}