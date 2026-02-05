import { StarRating } from "@/components/ui/rating1";

export default function TestimonialCard({img, name, review, rating}: {img: string, name: string, review: string, rating: number}) {
    return <div className="bg-[#F5F5F5] rounded-2xl py-4 px-4">
        <div className="flex gap-4 items-center">
            <div className="rounded-full mt-4">
                <img src={img} />
            </div>
            <div className="flex flex-col">
                <h4 className="text-lg font-bold mt-7 mb-3">{name}</h4>
                <StarRating value={rating} />
            </div>
        </div>
        <p className="text-muted mt-4">{review}</p>
    </div>
}