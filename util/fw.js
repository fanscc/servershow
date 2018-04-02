
// 判断站点类型
let Site = {
  IsPC() {
    let userAgentInfo = navigator.userAgent
    let Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"
    ]
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  },
  IsWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return true
    } else {
      return false
    }
  }
}

let api = {
  IsSite() {
    if (Site.IsPC()) {
      if (this.IsWeiXin()) {
        return '400100000003'
      } else {
        return '400100000001'
      }
    } else {
      if (Site.IsWeiXin()) {
        return '400100000003'
      } else {
        return '400100000002'
      }
    }
  }
}
export {
  api
}
