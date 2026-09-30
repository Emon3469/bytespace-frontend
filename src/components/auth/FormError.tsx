/** Server-side validation message (only shown if browser validation was bypassed). */
export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="w-full font-sans text-body-s text-[#d92d20]">
      {message}
    </p>
  );
}
