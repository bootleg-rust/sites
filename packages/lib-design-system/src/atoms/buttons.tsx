import { styled } from "../theming";

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

// TODO: make this not use the <button /> element by default to avoid
// situations where browsers don't apply flexbox rules correctly to `<button />` elements
// But that means we need to re-create all accesibility concerns https://www.youtube.com/watch?v=CZGqnp06DnI
export const Button = styled.button``;
