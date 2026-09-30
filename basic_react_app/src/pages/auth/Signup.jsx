import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFlash } from "../../context/FlashContext.jsx";
import AuthForm from "../../features/auth/components/AuthForm.jsx";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { signup } = useAuth();
  const { setFlash } = useFlash();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(form);
      navigate("/listings");
    } catch (err) {
      setFlash({ type: "error", message: err.message });
    }
  };

  return (
    <AuthForm
      title="Create Account"
      submitLabel="Sign up"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      fields={[
        { name: "username", label: "Username" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
      ]}
    />
  );
}

export default Signup;
