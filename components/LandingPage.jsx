import Hero from './Hero';
import SearchBar from './SearchBar';
import FeaturedProperties from './FeaturedProperties';

export default function LandingPage({ user }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Hero />
            <SearchBar />
            <FeaturedProperties />
        </div>
    );
}