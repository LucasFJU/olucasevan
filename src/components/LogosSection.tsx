const brands = [
  "Startup Lab", "Nova Digital", "Criativo Studio", "Brandhaus",
  "Pixel Works", "Artflow", "Venture Co", "Design Hub",
];

const LogosSection = () => (
  <section className="border-t border-border">
    <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-8">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <p className="text-[13px] font-medium text-foreground tracking-[0.05em] uppercase whitespace-nowrap shrink-0">
          Clientes
        </p>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-16 animate-marquee">
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={i}
                className="text-muted-foreground/30 font-medium text-[14px] tracking-wider uppercase whitespace-nowrap shrink-0"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LogosSection;
