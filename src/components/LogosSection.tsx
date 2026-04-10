import { motion } from "framer-motion";

const brands = [
  "Startup Lab", "Nova Digital", "Criativo Studio", "Brandhaus",
  "Pixel Works", "Artflow", "Venture Co", "Design Hub",
];

const LogosSection = () => (
  <section className="py-12 md:py-16 mx-4 md:mx-6 -mt-[50px] md:-mt-[60px] relative z-20 bg-secondary rounded-b-[40px] md:rounded-b-[80px]">
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <p className="text-[13px] font-bold text-foreground tracking-[0.05em] uppercase whitespace-nowrap shrink-0">
          Marcas Parceiras
        </p>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-16 animate-marquee">
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={i}
                className="text-muted-foreground/40 font-bold text-[14px] tracking-wider uppercase whitespace-nowrap shrink-0"
              >
                ● {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LogosSection;
