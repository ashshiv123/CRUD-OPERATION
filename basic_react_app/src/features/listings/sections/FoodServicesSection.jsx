import { FOOD_SERVICES } from "../data/homepageData.js";
import { formatPrice } from "../utils/listingUtils.js";

function FoodServicesSection() {
  return (
    <section id="food" className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700">
            Fuel Your Studies
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Student Food Services</h2>
          <p className="mt-2 text-sm text-slate-600">
            From unlimited mess meals to daily tiffin deliveries, find a plan that matches your routine.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FOOD_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group overflow-hidden rounded-2xl border-2 border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                    {service.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{service.highlight}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{service.location}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">Monthly plan</p>
                    <p className="text-xl font-bold text-slate-900">{formatPrice(service.pricePerMonth)}</p>
                  </div>
                  <span className="rounded-full bg-orange-100 px-3 py-2 text-xs font-semibold text-orange-700">
                    View menu
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoodServicesSection;
