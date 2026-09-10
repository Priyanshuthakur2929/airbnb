export default function Hero() {
    return (
        <section
            className="relative h-[70vh] flex items-center justify-center text-white bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=80')" }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 text-center px-4 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Stay</h1>
                <p className="text-lg md:text-xl text-gray-100">Unique homes, unforgettable experiences</p>
            </div>
        </section>
    );
}