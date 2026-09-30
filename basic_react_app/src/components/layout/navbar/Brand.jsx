import { Link } from "react-router-dom";

function Brand({ onClick }) {
  return (
    <Link className="flex items-center gap-3" to="/listings" onClick={onClick}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-lg font-bold text-white">
        H
      </span>
      <span>
        <span className="block font-['Space_Grotesk'] text-lg font-bold leading-none">HostelHub</span>
        <span className="text-xs text-slate-500">Engineers Campus Stay</span>
      </span>
    </Link>
  );
}

export default Brand;
