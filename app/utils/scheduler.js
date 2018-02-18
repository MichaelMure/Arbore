// @flow

const timers = {}

/**
 * Dispatch a Redux action with a fixed time between an action's end to the start of the next one
 * @param dispatch
 * @param id
 * @param action
 * @param timeBetween
 * @param delay start the first action after waiting the duration
 */
export const startTimeBetween = (dispatch, id: string, action, timeBetween: number, delay: number = 0) => {
  timers[id] = true

  dispatch(async () => {
    if(delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    if(!timers[id]) {
      return
    }

    do {
      console.log('Run scheduled action ' + id)

      try {
        await dispatch(action)
      } catch (err) {
        console.error(`Error while running the scheduled task ${id}`, err)
      }

      await new Promise(resolve => setTimeout(resolve, timeBetween))
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

/**
 * Stop all timers
 */
export const stopAll = () =>
{
  Object.keys(timers).forEach((key) => {
    if(timers[key]) {
      console.log('Stop scheduled action ' + key)
    }
    timers[key] = false
  })
}
