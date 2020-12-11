// Eslint "react/forbid-elements" config
const forbidElementsConfig = {
  forbid: [
    // For elements that have equivalents in the design system preferentially use those
    // Grouped according to MDN docs https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Obsolete_and_deprecated_elements

    // Content sectioning
    { element: "address", message: "use <Address> in design system instead" },
    { element: "article", message: "use <Article> in design system instead" },
    { element: "aside", message: "use <Aside> in design system instead" },
    { element: "footer", message: "use <Footer> in design system instead" },
    { element: "header", message: "use <Header> in design system instead" },
    { element: "h1", message: "use <H1> in design system instead" },
    { element: "h2", message: "use <H2> in design system instead" },
    { element: "h3", message: "use <H3> in design system instead" },
    { element: "h4", message: "use <H4> in design system instead" },
    { element: "h5", message: "use <H5> in design system instead" },
    { element: "h6", message: "use <H6> in design system instead" },
    {
      element: "hgroup",
      message: "use <HeadingGroup> in design system instead",
    },
    { element: "main", message: "use <Main> in design system instead" },
    { element: "nav", message: "use <Nav> in design system instead" },
    { element: "section", message: "use <Section> in design system instead" },

    // Text Content
    {
      element: "blockquote",
      message: "use <Blockquote> in design system instead",
    },
    { element: "dl", message: "use <DefinitionList> in design system instead" },
    {
      element: "dt",
      message: "use <DefinitionList.Term> in design system instead",
    },
    {
      element: "dd",
      message: "use <DefinitionList.Definition> in design system instead",
    },
    { element: "div", message: "use <Div> in design system instead" },
    {
      element: "figcaption",
      message: "use <Figure.Caption> in design system instead",
    },
    { element: "figure", message: "use <Figure> in design system instead" },
    { element: "hr", message: "use <HorizontalRule> in design system instead" },
    { element: "ol", message: "use <List> in design system instead" },
    { element: "ul", message: "use <List> in design system instead" },
    { element: "li", message: "use <List.Item> in design system instead" },
    { element: "main", message: "use <Main> in design system instead" },
    { element: "p", message: "use <Paragraph> in design system instead" },
    { element: "pre", message: "use <Preformatted> in design system instead" },

    // Text Inline
    { element: "a", message: "use <Anchor> in design system instead" },
    { element: "abbr", message: "use <Abbreviation> in design system instead" },
    {
      element: "b",
      message: "use <BringAttentionTo> in design system instead",
    },
    { element: "cite", message: "use <Citation> in design system instead" },
    { element: "code", message: "use <Code> in design system instead" },
    { element: "dfn", message: "use <Definition> in design system instead" },
    { element: "em", message: "use <Emphasis> in design system instead" },
    { element: "i", message: "use <IdiomaticText> in design system instead" },
    { element: "kbd", message: "use <KeyboardInput> in design system instead" },
    { element: "mark", message: "use <MarkText> in design system instead" },
    { element: "q", message: "use <InlineQuotation> in design system instead" },
    { element: "s", message: "use <StrikeThrough> in design system instead" },
    { element: "samp", message: "use <SampleOutput> in design system instead" },
    { element: "span", message: "use <Span> in design system instead" },
    { element: "strong", message: "use <Strong> in design system instead" },
    { element: "sub", message: "use <Sub> in design system instead" },
    { element: "sup", message: "use <Sup> in design system instead" },
    { element: "time", message: "use <Time> in design system instead" },
    {
      element: "u",
      message: "use <UnarticulatedAnnotation> in design system instead",
    },
    { element: "var", message: "use <Var> in design system instead" },
    { element: "del", message: "use <DeletedText> in design system instead" },
    { element: "ins", message: "use <InsertedText> in design system instead" },

    // Forms
    { element: "button", message: "use <Button> in design system instead" },
    { element: "button", message: "use <Button> in design system instead" },
    { element: "datalist", message: "use <DataList> in design system instead" },
    { element: "fieldset", message: "use <Fieldset> in design system instead" },
    { element: "form", message: "use <Form> in design system instead" },
    { element: "input", message: "use <Input> in design system instead" },
    { element: "label", message: "use <Label> in design system instead" },
    { element: "legend", message: "use <Legend> in design system instead" },
    { element: "meter", message: "use <Meter> in design system instead" },
    {
      element: "optgroup",
      message: "use <OptionGroup> in design system instead",
    },
    {
      element: "option",
      message:
        "use <OptionGroup.Option> <Select.Option> or <DataList.Option> in the design system instead",
    },
    { element: "output", message: "use <Output> in design system instead" },
    { element: "progress", message: "use <Progress> in design system instead" },
    { element: "select", message: "use <Select> in design system instead" },
    { element: "textarea", message: "use <TextArea> in design system instead" },

    // Deprecated elements https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Obsolete_and_deprecated_elements
    { element: "acronym", message: "this element is deprecated" },
    { element: "applet", message: "this element is deprecated" },
    { element: "basefont", message: "this element is deprecated" },
    { element: "bgsound", message: "this element is deprecated" },
    { element: "big", message: "this element is deprecated" },
    { element: "blink", message: "this element is deprecated" },
    { element: "center", message: "this element is deprecated" },
    { element: "command", message: "this element is deprecated" },
    { element: "content", message: "this element is deprecated" },
    { element: "dir", message: "this element is deprecated" },
    { element: "element", message: "this element is deprecated" },
    { element: "font", message: "this element is deprecated" },
    { element: "frame", message: "this element is deprecated" },
    { element: "frameset", message: "this element is deprecated" },
    { element: "image", message: "this element is deprecated" },
    { element: "isindex", message: "this element is deprecated" },
    { element: "keygen", message: "this element is deprecated" },
    { element: "listing", message: "this element is deprecated" },
    { element: "marquee", message: "this element is deprecated" },
    { element: "menuitem", message: "this element is deprecated" },
    { element: "multicol", message: "this element is deprecated" },
    { element: "nextid", message: "this element is deprecated" },
    { element: "nobr", message: "this element is deprecated" },
    { element: "noembed", message: "this element is deprecated" },
    { element: "noframes", message: "this element is deprecated" },
    { element: "plaintext", message: "this element is deprecated" },
    { element: "shadow", message: "this element is deprecated" },
    { element: "spacer", message: "this element is deprecated" },
    { element: "strike", message: "this element is deprecated" },
    { element: "tt", message: "this element is deprecated" },
    { element: "xmp", message: "this element is deprecated" },
  ],
};

module.exports = {
  forbidElementsConfig,
};
