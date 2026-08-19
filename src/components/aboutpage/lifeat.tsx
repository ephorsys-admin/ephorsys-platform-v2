import { LayoutGrid } from "../ui/layout-grid";

export function LayoutGridDemo({ photosData = [] }: { photosData?: { imageUrl: string; caption?: string }[] }) {
    if (photosData.length === 0) return null;

    const activeCards = photosData.map((p, idx) => ({
        id: idx + 1,
        content: (
            <div>
                <p className="font-bold md:text-2xl text-lg text-white">
                    {p.caption || ""}
                </p>
            </div>
        ),
        className: idx % 4 === 0 || idx % 4 === 3 ? "md:col-span-2" : "col-span-1",
        thumbnail: p.imageUrl,
    }));

    return (
        <div className="min-h-screen py-16 w-full bg-black relative z-0">
            {/* Heading Section */}
            <div className="text-center px-3">
                <h2 className="text-4xl md:text-5xl sm:text-3xl text-white mb-3 font-extrabold">
                    Life At <span className="text-[#74c316]">Ephorsys</span>
                </h2>
                <p className="text-center text-white/70 text-sm md:text-base max-w-xl mx-auto">
                    Experience a dynamic work environment where creativity meets technology,
                    empowering teams to build scalable and future-ready solutions.
                </p>
            </div>

            <LayoutGrid cards={activeCards} />
        </div>
    );
}