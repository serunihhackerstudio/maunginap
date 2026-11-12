import { useCallback, useEffect, useState } from "react";

const KEY = "maunginap:favorites";

const read = () => {
  try {
    return JSON.parse(window.localStorage.getItem(KEY)) || [];
  } catch (e) {
    return [];
  }
};

/** Daftar penginapan favorit, disimpan di perangkat (localStorage) dan sinkron antar komponen. */
export default function useFavorites() {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    const sync = () => setIds(read());
    window.addEventListener("maunginap:favorites", sync);
    return () => window.removeEventListener("maunginap:favorites", sync);
  }, []);

  const toggle = useCallback((id) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch (e) {
      /* penyimpanan tidak tersedia */
    }
    setIds(next);
    window.dispatchEvent(new Event("maunginap:favorites"));
  }, []);

  return { favorites: ids, isFavorite: (id) => ids.includes(id), toggle };
}
