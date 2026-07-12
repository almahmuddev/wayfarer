const stats = [
  { value: "1,200+", label: "Curated experiences" },
  { value: "340+", label: "Verified local hosts" },
  { value: "18", label: "Regions across Bangladesh" },
  { value: "25,000+", label: "Travelers hosted" },
];

export function Stats() {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
