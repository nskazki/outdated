export default function attempt(limit, action, arg) {
  let count = 0
  return invoke()

  function invoke() {
    count++
    return action(arg).catch((err) => {
      if (count >= limit) {
        return Promise.reject(err)
      } else {
        return invoke()
      }
    })
  }
}
