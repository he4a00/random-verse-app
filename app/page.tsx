import VerseContainer from "@/components/VerseContainer";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 h-screen"
      style={{
        backgroundImage: "url(/bg.webp)",
        backgroundSize: "cover",
      }}
    >
      <VerseContainer />
    </div>
  );
}
