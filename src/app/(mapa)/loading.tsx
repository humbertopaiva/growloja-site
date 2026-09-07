export default function MapaLoading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <div className="h-4 w-40 animate-pulse rounded-full bg-paper-2" />
      <div className="mt-4 h-10 w-72 animate-pulse rounded-full bg-paper-2" />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="h-56 animate-pulse rounded-3xl bg-white" />
        <div className="h-56 animate-pulse rounded-3xl bg-white" />
      </div>
    </div>
  );
}
