export default function FeaturesCard({icon, header, body}: {icon: string, header: string, body: string}) {
    return <div className="rounded-xl shadow-md py-4 px-4 group hover:scale-103 hover:translate-y-1.5 transition-all duration-700">
        <div className="badge" style={{padding: '10px 20px'}}>
            <img src={icon} alt='Feature Icon' />
        </div>
        <h4 className="text-xl font-bold mt-7 mb-3">{header}</h4>
        <p className="text-muted">{body}</p>
    </div>
}