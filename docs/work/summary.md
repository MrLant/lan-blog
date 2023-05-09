---
title: 工作中总结
date: 2023/04/10
---

## element-ui table组件左右滑动
```js
export default {
  data() {
    return {
      domObj: null
    }
  },
  watch: {
    checkTableFieldList: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.$nextTick(() => {
            this.$refs.table.bodyWrapper.id = 'scrollBar'
            this.scrollFunction(this.domObj, 'scrollBar')
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    scrollFunction(obj, id) {
      obj = document.getElementById(id)
      if (obj.attachEvent) {
        obj.attachEvent('onmousewheel', this.mouseScroll(obj))
      } else if (obj.addEventListener) {
        obj.addEventListener('DOMMouseScroll', this.mouseScroll(obj), false)
      }
      obj.onmousewheel = obj.onmousewheel = this.mouseScroll(obj)
    },
    mouseScroll(obj) {
      return function () {
        const e = window.event || document.all ? window.event : arguments[0] ? arguments[0] : event
        let detail, moveForwardStep, moveBackStep
        let step = 0
        if (e.wheelDelta) {
          // google 下滑负数： -120
          detail = e.wheelDelta
          moveForwardStep = -1
          moveBackStep = 1
        } else if (e.detail) {
          // firefox 下滑正数：3
          detail = event.detail
          moveForwardStep = 1
          moveBackStep = -1
        }
        step = detail > 0 ? moveForwardStep * 100 : moveBackStep * 100
        // e.preventDefault()
        const left = obj.querySelector('table').clientWidth - obj.clientWidth
        //这里是为了向右滚动后再向下滚动，向左滚动后再向上滚动，如果不需要，只需要写e.preventDefault()
        //-------------------
        if (moveForwardStep === -1) {
          //google
          if (detail > 0) {
            //向上
            if (obj.scrollLeft > 0) {
              e.preventDefault()
            } else {
              return true
            }
          } else {
            if (obj.scrollLeft < left) {
              e.preventDefault()
            } else {
              return true
            }
          }
        } else {
          //firefox
          if (detail > 0) {
            //向下
            if (obj.scrollLeft < left) {
              e.preventDefault()
            } else {
              return true
            }
          } else {
            if (obj.scrollLeft > 0) {
              e.preventDefault()
            } else {
              return true
            }
          }
        }
        obj.scrollLeft = obj.scrollLeft + step
      }
    }
  }
}
```