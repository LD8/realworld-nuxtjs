import Vue from 'vue'
import dayjs from 'dayjs'

// 使用时语法：{{ 插值表达式内容（这里自动传入的value） | 过滤器名称此处为date(时间格式) }}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
