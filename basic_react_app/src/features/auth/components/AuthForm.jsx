import PageCard from "../../../components/common/PageCard.jsx";
import FormField from "../../../components/forms/FormField.jsx";
import TextInput from "../../../components/forms/TextInput.jsx";

function AuthForm({ title, fields, submitLabel, form, onChange, onSubmit }) {
  return (
    <PageCard className="max-w-2xl">
      <h1 className="mb-4 font-['Space_Grotesk'] text-3xl font-bold text-slate-900">{title}</h1>
      <form className="grid gap-4" onSubmit={onSubmit}>
        {fields.map((field) => (
          <FormField key={field.name} label={field.label} htmlFor={field.name}>
            <TextInput
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              required={field.required !== false}
              value={form[field.name]}
              onChange={onChange}
            />
          </FormField>
        ))}

        <button
          type="submit"
          className="w-fit rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          {submitLabel}
        </button>
      </form>
    </PageCard>
  );
}

export default AuthForm;
