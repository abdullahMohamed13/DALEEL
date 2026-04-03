import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import AppFeaturesCard from "./comps/AppFeaturesCard";
import { appFeatureCarouselItems } from "@/static-data/appFeaturesItems";

export default function AppFeaturesShowcase() {

    return <section className="bg-[#FAFAFA] px-4 md:px-8 py-12 md:py-20 w-full" id="app-showcase">

        <Carousel opts={{ align: "start", direction: "rtl" }} className="w-full overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-6 md:gap-0">
                <div className="text-center md:text-right">
                    <h3 className="text-2xl md:text-3xl mb-2 font-bold">جولة داخل التطبيق</h3>
                    <p className="text-sm md:text-base text-muted-foreground px-4 md:px-0">واجهة مستخدم بسيطة وسهلة، مصممة لتحربة استخدام مريحة وسريعة، تغطي جميع احتياجاتك.</p>
                </div>

                <div className="mt-3 sm:mt-0 -mb-3 sm:mb-0 flex gap-3">
                    <CarouselPrevious className="relative rotate-180 z-10 inset-0 translate-y-0 translate-x-0" />
                    <CarouselNext className="relative rotate-180 z-10 inset-0 translate-y-0 translate-x-0" />
                </div>
            </div>
            <CarouselContent className="mt-5 sm:mt-20">
                {
                    appFeatureCarouselItems.map((item) => {
                        return <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <AppFeaturesCard
                                img={item.img}
                                text={{ header: item.text.header, body: item.text.body }}
                            />
                        </CarouselItem>
                    })
                }
            </CarouselContent>

        </Carousel>
    </section>
}