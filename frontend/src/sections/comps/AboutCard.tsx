export default function AboutCard({ img }: { img: string }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-2 border border-border/40">
      <div className="w-full aspect-video overflow-hidden rounded-xl">
        <img
          src={img}
          alt="Picture from the app"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}