import { useState } from "react";
import MaskInput from "react-maskinput";

export default function Input({
  id,
  label,
  mask,
  maskString,
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
      {mask !== undefined ? (
        <MaskInput
          maskChar="_"
          mask={mask}
          maskString={maskString}
          alwaysShowMask
          type={type}
          name={id}
          id={id}
          required={isRequired ? true : false}
          pattern={pattern}
          onFocus={
            onFocus !== undefined
              ? onFocus
              : (e) => {
                  if (setInputEl !== undefined) {
                    setInputEl(e.target);
                  }
                  setHasBeenInteractedWith(true);
                }
          }
          autoFocus={autoFocus}
          className={hasBeenInteractedWith === true ? "interacted" : ""}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          pattern={pattern}
          onFocus={
            onFocus !== undefined
              ? onFocus
              : (e) => {
                  if (setInputEl !== undefined) {
                    setInputEl(e.target);
                  }
                  setHasBeenInteractedWith(true);
                }
          }
          required={isRequired ? true : false}
          autoFocus={autoFocus}
          className={hasBeenInteractedWith === true ? "interacted" : ""}
          onChange={onChange}
          value={value}
          onKeyPress={onkeypress}
        />
      )}

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
