import PropertyCard from './PropertyCard';

const sampleProperties = [
    { id: 1, title: 'Cozy Mountain Cabin', location: 'Manali, HP', price: 89, rating: 4.8, image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Beachside Villa', location: 'Goa', price: 150, rating: 4.9, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Modern City Loft', location: 'Bengaluru, KA', price: 65, rating: 4.6, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80' },
];

export default function FeaturedProperties() {
    return (
        <section className="max-w-6xl mx-auto px-4 mt-16 mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured stays</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sampleProperties.map((p) => (
                    <PropertyCard key={p.id} {...p} />
                ))}
            </div>
        </section>
    );
}