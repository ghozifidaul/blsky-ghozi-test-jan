export default function TwoPanelLayout({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen md:h-screen">
      <div className="border-b md:border-b-0 md:border-r border-gray-800 h-[50vh] md:h-full">
        {left}
      </div>
      <div className="h-[50vh] md:h-full">
        {right}
      </div>
    </div>
  );
}
