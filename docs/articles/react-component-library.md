# Component library overview

## CSS Resets

While I really dislike the whole “css utility driven” driven nature of tailwind.css I’m really liking the look of the resets/defaults they’ve gone with (normalize.css with some extras).

I also think most of tailwind's theme for default config/vaiables is a great starting point for a design system.

A lot of the [default theme](../packages/libs/design-system/src/theming/theme.tsx) is just taken directly from [tailwind.config.js default config](https://gist.github.com/benfurfie/2290b626b8964b6b0dd68394827868db) (spacing, borderWidth, boxShadow etc))

## Default styles

I avoid making every element look the same, which some resets do. For example, <button> and <ul>/<ol> should look like buttons and lists by-default

When it comes to setting default styles for HTML elements the approach used is to remove all styles from  elements by default and then have a expose Components with the desired default styles through the design system exclusively.

For example:

1. Remove all styles from `<h1>`, `<button>`, `<ul>`, `<ol>`.
2. Have components exposed through your design system that replace the default elements `<H1 />`, `<Button />`, `<List as="ul" />`, `<List.Item />`.
3. Forbid using elements that aren’t from the design system using eslint rule [react/forbit-elements](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-elements.md)

The result is you end up writing components like this:

```tsx
<Div>
  <H1>Hello World</H1>
  <P>This is a paragraph</P>
  <Button>Click me!</Button>
</Div>
```

NOTE: lots of design systems seem to use something like `<Box />` with an element that defaults to using `display:flex` to replace using `<div>`s so that might be a better name.

Instead of like this:

```tsx
<div>
  <h1>Hello World</h1>
  <p>This is a paragraph</p>
  <button>Click me!</button>
</div>
```

## Design system intended to encourage correct use of semantic html

WIP

* Match semantics of html whenever possible but group tags together and give them more descriptive names where possible (eg `<ol>` and `<li>` become `<List />` and `>List.Item />`)
* Using mdn reference https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Table_content

## Anything that defaults to display as "block" in html should instead display as "flex"

```tsx
function defaultToFlex({ block }: { block?: boolean}) {
  if (block) return "display: block;";
  return "display: flex;";
}

const Div = styled.div<{ block?: boolean }>`
  ${defaultToFlex}
`;
const Section = styled.section<{ block?: boolean }>`
  ${defaultToFlex}
`;
```
