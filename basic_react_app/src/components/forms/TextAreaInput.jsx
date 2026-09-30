import { inputClass } from "./formStyles.js";

function TextAreaInput(props) {
  return <textarea {...props} className={props.className || `${inputClass} min-h-28`} />;
}

export default TextAreaInput;
