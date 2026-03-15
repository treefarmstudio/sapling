

export function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="bg-background/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all dark:border-gray-800"
    >
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-lg text-foreground/60 dark:text-foreground/40">{description}</p>
    </div>
  );
}