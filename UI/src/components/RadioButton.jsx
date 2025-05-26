import { Radio, Label, Utility } from "@visa/nova-react";

export default function RadioButton({
  id,
  name,
  value,
  label,
  checked,
  onChangeHandler,
}) {
  return (
    <Utility vAlignItems="center" vFlex vGap={2}>
      <Radio
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChangeHandler}
      />
      <Label htmlFor={id}>{label}</Label>
    </Utility>
  );
}
