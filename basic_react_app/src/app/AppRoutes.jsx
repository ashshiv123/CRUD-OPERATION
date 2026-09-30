import { Navigate, Route, Routes } from "react-router-dom";
import ListingsIndex from "../pages/listings/ListingsIndex.jsx";
import ListingNew from "../pages/listings/ListingNew.jsx";
import ListingDetail from "../pages/listings/ListingDetail.jsx";
import ListingEdit from "../pages/listings/ListingEdit.jsx";
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import NotFound from "../pages/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/listings" replace />} />
      <Route path="/listings" element={<ListingsIndex />} />
      <Route path="/listings/new" element={<ListingNew />} />
      <Route path="/listings/:id" element={<ListingDetail />} />
      <Route path="/listings/:id/edit" element={<ListingEdit />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
