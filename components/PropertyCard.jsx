export default function PropertyCard({ image, title, location, price, rating }) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <img src={image} alt={title} className="w-full h-56 object-cover" />
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <p className="font-semibold text-gray-900">{title}</p>
                    <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                        <span className="text-yellow-400">★</span> {rating}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{location}</p>
                <p className="mt-3 font-bold text-gray-900">
                    ${price} <span className="font-normal text-gray-500 text-sm">/ night</span>
                </p>
            </div>
        </div>
    );
}