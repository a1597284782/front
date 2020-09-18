import faces from '@/assets/js/face'

const escapeHtml = (val = '') => {
  if (!val) return ''
  // 替换 表情
  let result = val
  const face = /\sface\[\W{1,}]/g
  if (face.test(result)) {
    const group = result.match(face)
    group.map(item => {
      const key = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img src="${faces[key]}">`)
    })
  }

  // 替换 图片
  const img = /img\[\S+\]/g
  if (img.test(result)) {
    const group = result.match(img)
    group.map(item => {
      console.log('escapeHtml -> item', item)
      result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`)
    })
  }

  // 替换 链接 a(链接)[标题]
  const link = /\sa\(\S+\]/g
  if (link.test(result)) {
    const group = result.match(link)
    const title = /\((.+)\)/
    const linkName = /\[(.+)\]/
    group.map(item => {
      const nameGroup = item.match(linkName)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(title)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }

  // 替换 引用
  result = result.replace(/\[quote\]/g, '<div class="layui-elem-quote">')
  result = result.replace(/\[\/quote\]/g, '</div>')

  // 替换 代码块
  // 替换 hr
  return result
}

export {
  escapeHtml
}
