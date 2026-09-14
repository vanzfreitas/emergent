const ITEMS = [
    "Obras comerciais",
    "Reformas",
    "Adequações",
    "Infraestrutura",
    "Pisos e revestimentos",
    "Forros e acabamentos",
    "Lauro de Freitas",
    "Salvador e região",
];

export const Marquee = () => (
    <div data-testid="editorial-marquee" className="border-y border-white/10 bg-ksv-charcoal py-5 overflow-hidden select-none">
        <div className="flex w-max animate-ksv-marquee items-center">
            {[...ITEMS, ...ITEMS].map((item, i) => (
                <span key={i} className="flex items-center">
                    <span className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-ksv-silverdark px-6 whitespace-nowrap">
                        {item}
                    </span>
                    <span className="w-2 h-2 rotate-45 bg-ksv-orange inline-block shrink-0" />
                </span>
            ))}
        </div>
    </div>
);
