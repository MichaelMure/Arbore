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

      try {
        await dispatch(action)
      } catch (err) {
        console.error(`Error while running the scheduled task ${id}`, err)
      }

      await new Promise(resolve => setTimeout(resolve, timeBetween))
    } while (timers[id])

    console.log('Stop scheduled action ' + id)
  })
}

/**
 * Stop a timer
 * @param id
 */
export const stop = (id) => {
  timers[id] = false
}

/**
 * Stop all timers
 */
export const stopAll = () =>
{
  Object.keys(timers).forEach((key) => {
    timers[key] = false
  })
}
