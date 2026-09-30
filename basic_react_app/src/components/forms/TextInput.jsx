import { inputClass } from "./formStyles.js";

function TextInput(props) {
  return <input {...props} className={props.className || inputClass} />;
}

export default TextInput;
