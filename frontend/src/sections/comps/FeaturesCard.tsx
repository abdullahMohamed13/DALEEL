export default function FeaturesCard({ icon, header, body }: { icon: React.ReactNode, header: string, body: string }) {
    return <div className="animated-card rounded-xl shadow-md p-6 md:py-4 md:px-4 flex flex-col items-start text-right">
        <div className="badge" style={{ padding: '10px 20px' }}>
            {icon}
            {/* <img src={icon} alt='Feature Icon' className="md:w-auto md:h-auto" /> */}
        </div>
        <h4 className="text-lg md:text-xl font-bold mt-5 md:mt-7 mb-2 md:mb-3">{header}</h4>
        <p className="text-sm md:text-base text-muted">{body}</p>
    </div>
}
