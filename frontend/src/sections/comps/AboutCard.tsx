export default function AboutCard({ img, text }: { img: string, text: { header: string, body: string } }) {
  return (
    <div className="flex items-center flex-col group cursor-default">
      <div className="bg-white rounded-2xl p-2 border border-border/30 overflow-hidden">
        <img
          src={img}
          alt={text.header}
          className="w-full h-full object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />
      </div>
      <div className="text-center mt-5 px-2">
        <p className="font-bold text-base md:text-lg">{text.header}</p>
        <span className="text-xs md:text-sm text-muted-foreground mt-1 block leading-relaxed">{text.body}</span>
      </div>
    </div>
  );
}