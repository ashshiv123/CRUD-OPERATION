import { TESTIMONIALS } from "../data/homepageData.js";

function TestimonialsSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What Our Students Say</h2>
          <p className="mt-2 text-sm text-slate-600">
            Real experiences from students who found their perfect accommodation through HostelHub.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`relative rounded-2xl border-2 p-6 shadow-sm transition hover:shadow-lg ${
                testimonial.tone === "pink"
                  ? "border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50"
                  : "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50"
              }`}
            >
              <p className="text-sm text-slate-700">"{testimonial.comment}"</p>
              <div className="mt-6 border-t border-white/60 pt-4">
                <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-xs text-slate-600">
                  {testimonial.course} • {testimonial.year}
                </p>
                <p
                  className={`mt-1 text-xs font-semibold ${
                    testimonial.tone === "pink" ? "text-pink-600" : "text-blue-600"
                  }`}
                >
                  @ {testimonial.hostelName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
