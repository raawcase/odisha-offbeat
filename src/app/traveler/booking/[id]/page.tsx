import BookingConfirmClient from "./BookingConfirmClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BookingConfirmClient id={id} />;
}