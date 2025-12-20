interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

/**
 * Search Bar Component
 * Provides real-time search input for filtering employees
 */
export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
    return (
        <div className="search-bar-form">
            <input
                type="text"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employees by name..."
            />
        </div>
    );
};

