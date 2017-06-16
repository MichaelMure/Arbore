// @flow

// Taken from http://ourcodeworld.com/articles/read/317/how-to-check-if-a-javascript-promise-has-been-fulfilled-rejected-or-resolved
export default (promise) => {
  // Don't modify any promise that has been already modified.
  if (promise.isResolved) return promise

  // Set initial state
  let isPending = true
  let isRejected = false
  let isFulfilled = false
  let result = undefined

  // Observe the promise, saving the fulfillment in a closure scope.
  const wrapper = promise.then(
    function(v) {
      isFulfilled = true
      isPending = false
      result = v
      return v
    },
    function(e) {
      isRejected = true
      isPending = false
      throw e
    }
  )

  wrapper.isFulfilled = function() { return isFulfilled }
  wrapper.isPending = function() { return isPending }
  wrapper.isRejected = function() { return isRejected }
  wrapper.result = function () { return result }
  return wrapper
}
