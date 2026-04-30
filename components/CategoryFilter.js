'use client'

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="bg-white border-b shadow-sm sticky top-[56px] md:top-[60px] z-10">
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => onChange('semua')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200
            ${active === 'semua'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Semua
        </button>
        {categories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => onChange(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200
              ${active === cat.slug
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {cat.icon && <span className="text-lg">{cat.icon}</span>}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}