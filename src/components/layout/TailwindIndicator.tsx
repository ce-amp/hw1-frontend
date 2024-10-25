"use client";
export default function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex size-10 font-bold text-md items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-white">
      <div className="block 2xs:hidden">3xs</div>
      <div className="hidden 2xs:block xs:hidden">2xs</div>
      <div className="hidden xs:block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}