// 滚动
const getElememtY = elem => {
  // window.pageYOffset 获取当前滚动的位置
  // getBoundingClientRect().top 可以获取 元素距离顶部窗口的距离
  return (
    window.pageYOffset +
    document.querySelector(elem).getBoundingClientRect().top
  )
}

/**
 * 滚动到指定的元素
 * @param {String} elem DOM元素
 * @param {Number} duration  滚动动画执行的时间
 * @param {Number} offset  滚动偏移量
 */
const scrollToElem = (elem, duration, offset) => {
  // 初始位置
  const startingY = window.pageYOffset
  // 元素的位置
  const elementY = getElememtY(elem)

  // 需要滚动的距离
  const diff = elementY - startingY + offset
  if (!diff) return

  // 滚动的动画
  const easing = t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  // 初始滚动时间
  let start
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    // 计算时间的差值， 根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)

    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export { scrollToElem }
