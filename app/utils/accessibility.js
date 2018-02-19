// @flow

// Produce the handlers needed to transform a div
// into a accesibility valid button (selectable, actionable)
export function a11yButton(fn: () => any) {
  return {
    tabIndex: 0,
    role:"button",
    onKeyUp: (event) => {
      event = event || window.event
      if (event.keyCode === 32 || event.keyCode === 13) {
        fn()
      }
    },
    onClick: fn
  }
}
