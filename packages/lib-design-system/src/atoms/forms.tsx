import { flx } from "@pseudo-su/flex-elements";
import { styled } from "../theming/typed-styled-components";

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

// -- data list
const _DataList = styled(flx.datalist)``;
const DataListOption = styled(flx.option)``;

const DataList = _DataList as typeof _DataList & {
  Option: typeof DataListOption;
};
DataList.Option = DataListOption;

// -- option group
const _OptionGroup = styled(flx.optgroup)``;
const OptionGroupOption = styled(flx.option)``;
const OptionGroup = _OptionGroup as typeof _OptionGroup & {
  Option: typeof OptionGroupOption;
};
OptionGroup.Option = OptionGroupOption;

// -- select
const _Select = styled(flx.select)``;
const SelectOption = styled(flx.option)``;
const Select = _Select as typeof _Select & {
  Option: typeof SelectOption;
};
Select.Option = SelectOption;

export { DataList };
export { OptionGroup };
export { Select };
