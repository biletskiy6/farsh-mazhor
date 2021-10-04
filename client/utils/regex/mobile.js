// eslint-disable-next-line prefer-regex-literals
export default new RegExp(
  /^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$/
)
