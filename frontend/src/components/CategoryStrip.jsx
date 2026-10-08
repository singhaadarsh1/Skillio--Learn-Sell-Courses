const categories = [
  "All Courses",
  "Web Development",
  "JavaScript",
  "Artificial Intelligence",
  "DevOps",
  "Cloud",
  "Data Science",
  "Computer Science",
];

function CategoryStrip({ selectedCategory, onCategoryChange }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
              selectedCategory === category
                ? "border-skillio-accent bg-skillio-accent text-white"
                : "border-skillio-border bg-skillio-card text-skillio-text hover:border-skillio-accent hover:text-skillio-accent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryStrip;