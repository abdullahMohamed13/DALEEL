export default function AppFeaturesCard({ img, text }: { img: string, text: { header: string, body: string } }) {
  return (
    <div className="flex items-center flex-col cursor-grab active:cursor-grabbing">
      <div className="rounded-2xl p-2 border border-border/30 overflow-hidden">
        <img
          src={img}
          alt={text.header}
          className="h-135 w-full sm:h-full object-cover rounded-xl"
        />
      </div>
      <div className="text-center mt-5 px-2">
        <p className="font-bold text-lg">{text.header}</p>
        <span className="text-sm text-muted-foreground mt-1 block leading-relaxed">{text.body}</span>
      </div>
    </div>
  );
}