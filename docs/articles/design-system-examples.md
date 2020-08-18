# Design system examples

An example of how the "flexbox first" design system can help simplify components & layout etc.

```tsx
function OldModal() {
  return (
    <GenericModal
      modalBodyStyle="100%"
      width="70%"
      crossButton
      modalText={{}}
      errorModal={false}
      isOpen={isOpen}
      unmountModal={() => hideModal(false)}
      noFooter
    >
      <Box mt="-30px">
        <HeadingWrapper data-test-id="controlling-post-heading">
          {CONTROLLING_POST.CONTROLLING_POST_TITLE}
        </HeadingWrapper>
        <ModalContent {...{ controllingPostId, controllingPostDetails }} />
        <Row mt="40px">
          <Col xs={10} />
          <Col xs={2} pr="30px">
            <CustomButton
              onClick={() => hideModal(false)}
              appearance="ghost"
              id="close-controlling-post-modal-btn"
              fullWidth
              size="medium"
            >
              {CLOSE}
            </CustomButton>
          </Col>
        </Row>
      </Box>
    </GenericModal>
  );
}
```

- `crossButton` probably should be a `isCancellable` or `cancellable` semantic bool prop that determines whether to render the close button.
- `modalText` maybe should be `title`… but probably shouldn’t exist because it's a bit semantically flawed/redundant.
- `errorModal` is a strance flag and defaulting to true not an ergonomic API.
- `unmountModal` should probably be `onModalCloseRequested` because it should be understood as "the function the Modal should invoke when people press the close button or escape key (etc)".
- `noFooter` is not a good flag name, and even if it was needed it should default to not being present and the flag should be `footer` `showFooter` or `hasFooter`.
- `data-test-id` should be avoided, people should use accessibility selectors like what `react-testing-library` advocates
- `<Row>` and `<Col>` is a grid system which shouldn't be necessary when we use layout focussed around using flexbox
- `<Button>` is ok except for it having an id on the element which is probably bad practice

```tsx
const betterCss = css`
  width: 70%;

  ._container {
    margin-top: -30px;
  }
  ._content {
    margin-top: 40px;

    @media ${({ theme }) => theme.device.phoneLandscape} {
      padding-right: 30px;
      flex-direction: row-reverse;
    }
  }
`;

function BetterModal() {
  return (
    <GenericModal
      css={betterCss}
      isOpen={isOpen}
      onModalCloseRequested={() => hideModal(false)}
      isCancellable /* although really the default should be that it's "cancellable" and displays the close button */
    >
      <Div className="_container">
        <HeadingWrapper>
          {CONTROLLING_POST.CONTROLLING_POST_TITLE}
        </HeadingWrapper>
        <ModalContent {...{ controllingPostId, controllingPostDetails }} />
        <Div className="_content">
          <CustomButton
            onClick={() => hideModal(false)}
            appearance="ghost"
            fullWidth
            size="medium"
          >
            {CLOSE}
          </CustomButton>
        </Div>
      </Div>
    </GenericModal>
  );
}
```
