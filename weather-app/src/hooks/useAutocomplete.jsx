import { useState, useEffect } from 'react';

const API_KEY = '7c8d74dd12eacced5a7f2232a83a8f76';

export default function useOWMAutocomplete(query, limit = 5) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`
        );
        if (!res.ok) throw new Error('Ошибка сети');
        const data = await res.json();
        if (!cancelled) {
          // Преобразуем для автозаполнения
          const list = data.map(item => ({
            name: item.name,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
          }));
          setSuggestions(list);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const timeout = setTimeout(fetchData, 400); // debounce
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query, limit]);

  return { suggestions, loading, error };
}
