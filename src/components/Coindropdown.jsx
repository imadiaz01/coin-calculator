import React, { useRef, useState, useEffect } from 'react';
import { fetchTopCoins } from '../../api/coinGecko';
import './Coindropdown.css'; // Assuming you have a CSS file for dropdown styles


const CoinDropdown = ({onCoinSelect}) => {
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                setLoading(true);
                const data = await fetchTopCoins();

                if (Array.isArray(data)) {
                    const isValid = data.every(coin => coin.name && coin.symbol && coin.current_price);
                    if (isValid) {
                        setCoins(data);
                    } else {
                        console.error('Unexpected data format:', data);
                        throw new Error('Invalid data format received from fetchTopCoins');
                    }
                } else {
                    console.error('Data is not an array:', data);
                    throw new Error('Invalid data format received from fetchTopCoins');
                }
                    
            } catch (err) {
                console.error('Error fetching coins:', err);
                setError(`Failed to fetch coins: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    const handleCoinSelect = (coin) => {
        setSelectedCoin(coin);
        setSearchTerm(''); 
        setDropdownOpen(false); 

        if (onCoinSelect) onCoinSelect(coin);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setSelectedCoin(null); 
    };

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('.dropdown-container')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <>
        
            <input
                type="text"
                className="search-input"
                value={selectedCoin ? selectedCoin.name : searchTerm}
                onChange={handleSearchChange}
                onClick={handleDropdownToggle}
                placeholder="Search for a coin..."
            />

            {selectedCoin && (
    <div className="selected-coin">
        <p>Selected: {selectedCoin.name} ${selectedCoin.current_price} USD ({selectedCoin.symbol.toUpperCase()})</p>
    </div>
)}
        {dropdownOpen &&
        <div className="dropdown-container">
            {loading && <p>Loading coins...</p>}
            {error && <p className="error">{error}</p>}
            <ul className='coin-list'>
                {filteredCoins.map((coin, index) => (
                    coin && (
                        <li key={coin.id || `coin-${index}`} className="coin-item" onClick={() => handleCoinSelect(coin)}>
                            <div className="coin-info">
                                <img
                                    src={coin.image || 'https://via.placeholder.com/64?text=No+Image'}
                                    alt={coin.name ? `${coin.name}` : 'No Name'}
                                />
                                <span>({coin.symbol.toUpperCase()})</span>
                            </div>
                            <div className="coin-price">
                                <span>Current Price: ${coin.current_price.toFixed(2)} USD</span>
                            </div>
                        </li>
)
                ))}
            </ul>
        </div>

        }
        {filteredCoins.length === 0 && !loading && !error && (
            <p className="no-results">No coins found</p>
        )}
        </>
    );
};

export default CoinDropdown;