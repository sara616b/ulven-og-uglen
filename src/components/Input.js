import { useState } from "react";

export default function Input({
  id,
  label,
  type,
  isRequired,
  pattern,
  error,
  placeholder,
  onFocus,
  autoFocus,
  setInputEl,
  onkeypress,
  onChange,
  value,
}) {
  const [hasBeenInteractedWith, setHasBeenInteractedWith] = useState(false);

  return (
    <label htmlFor={id} style={{ padding: "7px 0" }}>
      {label}
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        pattern={pattern}
        onFocus={() => {
          setHasBeenInteractedWith(true);
        }}
        required={isRequired ? true : false}
        autoFocus={autoFocus}
        className={hasBeenInteractedWith === true ? "interacted" : ""}
        onChange={onChange}
        value={value}
      />
      {hasBeenInteractedWith === true ? (
        <span className="error" id="err-name" aria-live="assertive">
          {error}
        </span>
      ) : (
        ""
      )}
    </label>
  );
}
