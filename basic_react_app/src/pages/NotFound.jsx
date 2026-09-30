import { Link } from "react-router-dom";
import PageCard from "../components/common/PageCard.jsx";

function NotFound() {
  return (
    <PageCard className="max-w-2xl">
      <h1 className="mb-3 font-['Space_Grotesk'] text-3xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mb-4 text-sm text-slate-500">The page you requested does not exist.</p>
      <Link
        to="/listings"
        className="inline-flex rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Go to Home
      </Link>
    </PageCard>
  );
}

export default NotFound;
