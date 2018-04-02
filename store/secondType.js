export const state = () => ({
  counter: 0,
  seo: 'none',
  searchInfo: {
    city: '', // 城区
    busines: '', // 商圈
    price: '', // 售价
    room: '', // 居室
    area: '', // 面积
    features: [], // 特色
    toward: '', // 朝向
    decoration: '', // 装修
    product: '', // 产品
    purpose: '' // 用途
  },
  queryStr: {},
  keyword: '', // 搜索关键字
  busines: [], // 商圈
  featuresBind: [], // 特色
  priceCustom: {
    minPrice: null,
    maxPrice: null
  }, // 自定义售价
  areaCustom: {} // 自定义面积
})

export const getters = {
  searchResult: state => {
    let result = ''
    // 返回路由拼接规则
    for (let [k, v] of Object.entries(state.searchInfo)) {
      if (k !== 'features' && v) {
        result += `${v.districtId}_`
      } else if (k === 'features' && v.length > 0) {
        for (let item of v) {
          result += item.districtId
        }
        result += '_'
      }
    }
    return result.slice(0, result.length - 1)
  },
  getPath: state => (id, name) => {
    // console.log('ceshi')

    let result = ''
    // 返回路由拼接规则
    for (let [k, v] of Object.entries(state.searchInfo)) {
      // if (k !== 'features' && name !== 'features' && v) {
      if (k !== 'features') {
        if (k === name) {
          result += `${id}_`
          // console.log('ceshi:  11  ' + result)
        } else {
          if (v) {
            result += `${v.districtId}_`
          }
        }
        // console.log('ceshi:  13  ' + result)
      } else if (k === 'features') {
        // console.log(v.find((item) => item.districtId === id))
        if (k === name) {
          let arr = []
          if (!v.find((item) => item.districtId === id)) {
            arr = [id]
          }
          for (let item of v) {
            if (item.districtId !== id) {
              arr.push(item.districtId)
            }
          }
          arr = [...new Set(arr)]
          if (arr.length > 0) {
            result += `${arr.sort().join('')}_`
          }
          // console.log('ceshi:  21 ' + result)
        } else {
          // console.log('ceshi: 3 ' + result)
          if (v.length > 0) {
            for (let item of v) {
              result += item.districtId
            }
            result += '_'
          }
          // console.log('ceshi: 31 ' + result)
        }
      }
    }
    result = result.slice(0, result.length - 1)
    // query参数拼接
    result += '?'
    if (Object.keys(state.queryStr).length > 0) {
      for (let [k, v] of Object.entries(state.queryStr)) {
        result += `${k}=${v}&`
      }
    }
    return result.slice(0, result.length - 1)
  },
  
  getLimitPath:function(state){
  	return function(name,id){
  		
  	}
  }
  getLimitPath: state => (name, id) => {
    // console.log('ceshi')

    let result = ''
    // 返回路由拼接规则
    for (let [k, v] of Object.entries(state.searchInfo)) {
      if (k !== 'features') {
        if (k !== name && v) {
          result += `${v.districtId}_`
        }
      } else if (k === 'features' && v.length > 0) {
        if (k !== name) {
          for (let item of v) {
            result += item.districtId
          }
          result += '_'
        } else {
          if (id) {
            let arr = []
            for (let item of v) {
              if (item.districtId !== id) {
                arr.push(item.districtId)
              }
            }
            arr = [...new Set(arr)]
            if (arr.length > 0) {
              result += `${arr.sort().join('')}_`
            }
          }
        }
      }
    }

    return result.slice(0, result.length - 1)
  },
  getComplex: (state, getters) => (name, value) => {
    let result = `/sh-esf/${getters.searchResult}`
    if (name === '综合') {
      if (state.queryStr.wd) {
        result += `?wd=${state.queryStr.wd}`
      }
      return result
    }
    if (name === '最新') {
      result += '?'
      if (state.queryStr.wd) {
        result += `wd=${state.queryStr.wd}&`
      }
      if (state.queryStr.soft && state.queryStr.soft !== 't') {
        result += `soft=t&`
      }
      if (!state.queryStr.soft) {
        result += `soft=t&`
      }
      return result.slice(0, result.length - 1)
    }
    if (name === '其他') {
      // console.log(value)
      // console.log(state.queryStr.soft.idOf(value))
      result += '?'
      if (state.queryStr.wd) {
        result += `wd=${state.queryStr.wd}&`
      }
      if (state.queryStr.soft && state.queryStr.soft === `${value}1`) {
        result += `soft=${value}2&`
      }
      if (state.queryStr.soft && state.queryStr.soft === `${value}2`) {
        result += `soft=${value}1&`
      }
      if (!state.queryStr.soft || state.queryStr.soft === 't' || !state.queryStr.soft.startsWith(value)) {
        result += `soft=${value}1&`
      }
      return result.slice(0, result.length - 1)
    }
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  },
  changeSort(state, str) {
    state.seo += `_${str}`
  },
  cityInfo(state, city) {
    state.searchInfo.city = city
  },
  businesInfo(state, busines) {
    // state.searchInfo.busines.districtId = busines.bizcircleId
    // state.searchInfo.busines.districtName = busines.bizcircleName
    if (busines) {
      state.searchInfo.busines = {
        districtId: busines.bizcircleId,
        districtName: busines.bizcircleName
      }
    }
    // state.searchInfo.busines = busines
  },
  priceInfo(state, price) {
    state.searchInfo.price = price
  },
  roomInfo(state, room) {
    state.searchInfo.room = room
  },
  areaInfo(state, area) {
    state.searchInfo.area = area
  },
  featuresInfo(state, feature) {
    // console.log(feature)
    state.searchInfo.features = feature
    // state.searchInfo.features.push(feature)
  },
  towardInfo(state, toward) {
    state.searchInfo.toward = toward
  },
  decorationInfo(state, decoration) {
    state.searchInfo.decoration = decoration
  },
  productInfo(state, product) {
    state.searchInfo.product = product
  },
  purposeInfo(state, purpose) {
    state.searchInfo.purpose = purpose
  },
  keyWord(state, keyword) {
    // console.log('key word ' + keyword)
    state.keyword = keyword
  },
  setPriceCustom(state, price) {
    state.priceCustom = price
  },
  setAreaCustom(state, area) {
    state.areaCustom = area
  },
  setQueryStr(state, query) {
    state.queryStr = query
  },
  setFeatures(state, feature) {
    state.featuresBind.push(feature)
  }
}
