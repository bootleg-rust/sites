import { DefaultFlex, DefaultBlock } from "./_shared";

// .button,
// button {
//   display: inline-block;
//   width: 100%;
//   min-height: 38px;
//   padding: 8px 30px;
//   text-align: center;
//   font-weight: 600;
//   letter-spacing: 0.1rem;
//   text-transform: uppercase;
//   text-decoration: none;
//   border-radius: 4px;
//   border: 1px solid;
//   cursor: pointer;
//   box-sizing: border-box;

//   &:hover,
//   &:focus {
//     outline: 0;
//   }
// }

// .button.button-secondary {
//   font-size: 0.8em;
// }

const _DataList = DefaultBlock("datalist");
const DataListOption = DefaultBlock("option");

const DataList = _DataList as typeof _DataList & {
  Option: typeof DataListOption;
};
DataList.Option = DataListOption;

const _OptionGroup = DefaultBlock("optgroup");
const OptionGroupOption = DefaultBlock("option");
const OptionGroup = _OptionGroup as typeof _OptionGroup & {
  Option: typeof OptionGroupOption;
};
OptionGroup.Option = OptionGroupOption;

const _Select = DefaultBlock("select");
const SelectOption = DefaultBlock("option");
const Select = _Select as typeof _Select & {
  Option: typeof SelectOption;
};
Select.Option = SelectOption;

// TODO: make this not use the <button /> element by default to avoid
// situations where browsers don't apply flexbox rules correctly to `<button />` elements
// But that means we need to re-create all accesibility concerns https://www.youtube.com/watch?v=CZGqnp06DnI

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Forms

export const Button = DefaultBlock("button");
export { DataList };
export const Fieldset = DefaultFlex("fieldset");
export const Form = DefaultFlex("form");
export const Input = DefaultBlock("input");
export const Label = DefaultBlock("label");
export const Legend = DefaultBlock("legend");
export const Meter = DefaultBlock("meter");
export { OptionGroup };
export const Output = DefaultBlock("output");
export const Progress = DefaultBlock("progress");
export { Select };
export const TextArea = DefaultBlock("textarea");
