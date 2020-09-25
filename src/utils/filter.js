// 时间格式化库
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 时间格式化库 中文显示
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

const moment = date => {
  // 超过 7 天显示日期
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    // 小于 7 天，显示 xx 小时或 xx 天前
    return dayjs(date)
      .locale('zh-cn')
      .from(dayjs())
  }
}

export default {
  moment
}
