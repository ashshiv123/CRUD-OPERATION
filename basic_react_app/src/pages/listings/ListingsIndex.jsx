import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../api/client.js";
import { useFlash } from "../../context/FlashContext.jsx";
import ListingHero from "../../features/listings/components/ListingHero.jsx";
import ListingsSection from "../../features/listings/components/ListingsSection.jsx";
import FoodServicesSection from "../../features/listings/sections/FoodServicesSection.jsx";
import TestimonialsSection from "../../features/listings/sections/TestimonialsSection.jsx";

function ListingsIndex() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setFlash } = useFlash();

  useEffect(() => {
    let alive = true;
    apiRequest("/api/listings")
      .then((data) => {
        if (!alive) return;
        setListings(data.listings || []);
      })
      .catch((err) => {
        if (!alive) return;
        setFlash({ type: "error", message: err.message });
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [setFlash]);

  const boysListings = useMemo(
    () => listings.filter((listing) => listing.gender === "boys"),
    [listings]
  );

  const girlsListings = useMemo(
    () => listings.filter((listing) => listing.gender === "girls"),
    [listings]
  );

  if (loading) {
    return <p className="text-sm text-slate-500">Loading listings...</p>;
  }

  return (
    <>
      <ListingHero />
      <ListingsSection id="boys" title="Boys Hostels & PG" pillLabel="For Boys" listings={boysListings} />
      <ListingsSection id="girls" title="Girls Hostels & PG" pillLabel="For Girls" forGirls listings={girlsListings} />
      <FoodServicesSection />
      <TestimonialsSection />
    </>
  );
}

export default ListingsIndex;
