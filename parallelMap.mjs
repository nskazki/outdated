export default function parallelMap(limit, queue, action) {
  let results = []
  let running = 0

  return new Promise((resolve) => {
    tick()

    function tick() {
      if (running >= limit) {
        return
      }

      if (queue.length === 0) {
        if (running === 0) {
          resolve(results)
        }

        return
      }

      running++

      const arg = queue.shift()
      action(arg).then((val) => {
        results.push({ arg, val })
      }, (err) => {
        results.push({ arg, err })
      }).finally(() => {
        running--
        tick()
      })

      tick()
    }
  })
}
