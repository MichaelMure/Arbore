// @flow

const timers = {}

/**
 * Dispatch a Redux action with a fixed time between each firing
 * @param dispatch
 * @param id
 * @param action
 * @param timeBetween
 */
export const startTimeBetween = (dispatch, id: string, action, timeBetween: number) => {
  timers[id] = true

  dispatch(async () => {
    do {
      console.log('Run scheduled action ' + id)
      dispatch(action)
      await new Promise(resolve => setTimeout(resolve, timeBetween));
    } while (timers[id])
  })
}

/**
 * Stop a timer
 * @param id
 */
export const stop = (id) => {
  timers[id] = false
}
