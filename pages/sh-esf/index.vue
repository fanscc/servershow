<template>
  <div>
    <headers></headers>
    <!-- 搜索 -->
    <div class="serachHouse">
      <div class="container clearfix" style="position: relative;">
        <p class="nowL">
          <a href="/">上海豪宅</a> >
          <a href="/sh-esf/">二手豪宅{{searchInfo.city.id?'出售':''}}
          </a>
          <a v-if="searchInfo.city.id" :href="'/sh-esf/'+searchRuslt" class="disN_a"> > {{searchInfo.city.name}}
            <span>
              <img style="width:13px;height:13px;margin-left:5px;" src="~/assets/img/down.png" alt="">
            </span>
          </a>
          <a v-if="searchInfo.city.id" :href="'/sh-esf/'+searchRuslt" class="bizN_a"> >{{searchInfo.city.name}}
            <span>
              <img style="width:13px;height:13px;margin-left:5px;" src="~/assets/img/down.png" alt="">
            </span>
          </a>
        </p>
        <ul class="disN pg_nav_city" v-if="searchInfo.city.id">
          <li v-for="city in getDistrict" :key="city.districtId">
            <a href="/sh-esf/city.districtId">{{city.districtName}}
              <span style="display:none">二手豪宅</span>
            </a>
          </li>
        </ul>

        <!--  <ul class="bizN pg_nav_area" v-if="searchInfo.busines.id">
          <li v-for="item in busines" :key="item.id">
            <a href="/sh-esf/{{searchInfo.city.id+'_'+item.id}}">{{item.name}}
              <span style="display:none">二手豪宅</span>
            </a>
          </li>
        </ul> -->
        <div class="reason clearfix">
          <div class="sear">
            <input id='search' type="text" placeholder="请输入楼盘名称/区域" value="" />
            <input type="button" class="searicon" />
          </div>
          <div class="pg_search_pv" style="display:none"></div>
          <div class="history_cot" style="display: none;position: absolute;width: 781px;border: 1px solid #E2E2E2;box-sizing:content-box;padding-right: 3px;padding-top:10px;">
            <span class="pg_history">
              <i>搜索历史</i>
              <i class="clear_history" style="float: right;color: #333;cursor: pointer;">清除历史</i>
              <img style="float: right;height: 16px;width: 15px;margin: 2px 5px 0 0;cursor:pointer" src='~/assets/img/garb.png' />
            </span>
            <ul class="second" style="display: block;min-height: 40px;overflow: hidden;">
            </ul>
          </div>
        </div>
        <p class="searching">大家都在搜：
          <a href="/sh-esf/?wd=世茂滨江花园" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '世茂滨江花园'])">世茂滨江花园</a>
          <a href="/sh-esf/?wd=财富海景花园" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '财富海景花园'])">财富海景花园</a>
          <a href="/sh-esf/?wd=浦东星河湾" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '浦东星河湾'])">浦东星河湾</a>
          <a href="/sh-esf/?wd=仁恒河滨城" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '仁恒河滨城'])">仁恒河滨城</a>
          <a href="/sh-esf/?wd=汤臣湖庭" onclick="_hmt.push(['_trackEvent', '二手房热门搜索', 'click', '汤臣湖庭'])">汤臣湖庭</a>
        </p>
      </div>
    </div>
       <!-- 筛选条件 -->
    <div class="filter container">
      <div class="allfil">
        <dl>
          <dt>城区</dt>
          <dd>
            <a href="/sh-esf" class="current">不限</a>
            <a v-for="(city,index) in getDistrict" onclick="_hmt.push(['_trackEvent', '二手房城区','click','{$v['districtName']}'])" :key="index" @click="setCity(city)" :href="'/sh-esf/'+city.districtId">{{city.districtName}}</a>
          </dd>
        </dl>
        <!-- <dl>
          <dt>商圈</dt>
          <dd style="width:1070px">
            <a href="" class="current">不限</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房商圈','click','{$v['bizcircleName']}'])" href=""></a>
          </dd>
        </dl> -->
        <dl>
          <dt>居室</dt>
          <dd>
            <a href="" class="current">不限</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '一居'])" href="">一居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '二居'])" href="">二居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '三居'])" href="">三居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '四居'])" href="">四居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '五居'])" href="">五居及以上</a>
          </dd>
        </dl>
        <dl>
          <dt>售价</dt>
          <dd>
            <a href="" class="current">不限</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房售价','click', '1000万以下'])" href="">1000万以下</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房售价','click', '1000-1500万'])" href="">1000-1500万</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房售价','click', '1500-2000万'])" href="">1500-2000万</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房售价','click', '2000-3000万'])" href="">2000-3000万</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房售价','click', '3000-5000万'])" href="">3000-5000万</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房售价','click', '5000万以上'])" href="">5000万以上</a>
            <a class="price_cot">
              <input type="text" value="" maxlength=5/> -
              <input type="text" value="" maxlength=5/> 万
              <input type="button" value="确定" style="display: none;" class="price_btn" />
              <input type="hidden" value="">
            </a>
          </dd>
        </dl>
        <dl>
          <dt>面积</dt>
          <dd>
            <a href="" class="current">不限</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '100㎡以下'])" href="">100㎡以下</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '100-140㎡'])" href="">100-140㎡</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '140-180㎡'])" href="">140-180㎡</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '180-220㎡'])" href="">180-220㎡</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '220-280㎡'])" href="">220-280㎡</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '280-360㎡'])" href="">280-360㎡</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '360-420㎡'])" href="">360-420㎡</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '420-500㎡'])" href="">420-500㎡</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房面积','click', '500㎡以上'])" href="">500㎡及以上</a>
            <a class="area_cot">
              <input type="text" value="" maxlength=5/> -
              <input type="text" value="" maxlength=5/> ㎡
              <input type="button" value="确定" style="display: none;" class="area_btn" />
              <input type="hidden" value="">
            </a>
          </dd>
        </dl>
        <dl>
          <dt>产品</dt>
          <dd>
            <a href="" class="current">不限</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '高档住宅'])" href="">高档住宅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '叠拼别墅'])" href="">叠拼别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '联排别墅'])" href="">联排别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '独栋别墅'])" href="">独栋别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '双拼别墅'])" href="">双拼别墅</a>
          </dd>
        </dl>
        <div class="otherTerm" style="display: none;">
          <dl>
            <dt>朝向</dt>
            <dd>
              <a href="" class="current">不限</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房朝向','click', '东'])" href="">东</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房朝向','click', '南'])" href="">南</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房朝向','click', '西'])" href="">西</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房朝向','click', '北'])" href="">北</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房朝向','click', '南北'])" href="">南北</a>
            </dd>
          </dl>
          <dl>
            <dt>用途</dt>
            <dd>
              <a href="" class="current">不限</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房用途','click', '住宅'])" href="">住宅</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房用途','click', '商业'])" href="">商业</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房用途','click', '写字楼'])" href="">写字楼</a>
            </dd>
          </dl>
          <dl>
            <dt>装修</dt>
            <dd>
              <a href="" class="current">不限</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房装修','click', '毛坯'])" href="">毛坯</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房装修','click', '简装'])" href="">简装</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房装修','click', '精装'])" href="">精装</a>
            </dd>
          </dl>
          <dl>
            <dt>特色</dt>
            <dd class="tese">
              <a href="" class="current">不限</a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '满五'])" href="" class="checkBox">
                <input type="checkbox" />满五
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '满二'])" href="" class="checkBox">
                <input type="checkbox" />满二
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '全新房'])" href="" class="checkBox">
                <input type="checkbox" />全新房
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '花园'])" href="" class="checkBox">
                <input type="checkbox" />花园
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '露台'])" href="" class="checkBox">
                <input type="checkbox" />露台
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '地暖'])" href="" class="checkBox">
                <input type="checkbox" />地暖
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '恒温恒湿'])" href="" class="checkBox">
                <input type="checkbox" />恒温恒湿
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '带泳池'])" href="" class="checkBox">
                <input type="checkbox" />带泳池
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '明厨明卫'])" href="" class="checkBox">
                <input type="checkbox" />明厨明卫
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '合院'])" href="" class="checkBox">
                <input type="checkbox" />合院
                <label class=""></label>
              </a>
              <a onclick="_hmt.push(['_trackEvent', '二手房特色','click', '3D看房'])" href="" class="checkBox">
                <input type="checkbox" />3D看房
                <label class=""></label>
              </a>
            </dd>
          </dl>
        </div>
        <!--  {if empty($array['orientation'])&&empty($array['houseUseType'])&&empty($array['fitmentType'])&&empty($array['fiveYears']) && empty($array['twoYears']) && empty($array['isNewHouse']) && empty($array['isGarden']) && empty($array['isTerrace']) && empty($array['isFloorHeating']) && empty($array['stableTemperature']) && empty($array['isSwimmingPool']) && empty($array['isMingChef']) && empty($array['isCourtyard']) && empty($array['is720'])}
       <a href="javascript:void(0)" class="moreOther">更多筛选 ∨</a>
       {/if}
       {if !(empty($array['orientation'])&&empty($array['houseUseType'])&&empty($array['fitmentType'])&&empty($array['fiveYears']) && empty($array['twoYears']) && empty($array['isNewHouse']) && empty($array['isGarden']) && empty($array['isTerrace']) && empty($array['isFloorHeating']) && empty($array['stableTemperature']) && empty($array['isSwimmingPool']) && empty($array['isMingChef']) && empty($array['isCourtyard']) && empty($array['is720']))}
       <a href="javascript:void(0)" class="moreOther">点击收起 ∧</a>
       {/if} -->
      </div>
      <!--  {if !empty($is_id)|| !empty($array['keyWord']) }
     <div class="selected">
       您已选择：
       <div class="choice clearfix">
         {if !empty($array['keyWord'])}
         <b>{$array['keyWord']}</b>
         <a href=""><i></i></a>
         {/if}
         {loop $city $k $v}
         {if $v['districtId'] == $array['districtId'] }
         <b>{$v['districtName']}</b>
         <a href=""><i></i></a>
         {/if}
         {/loop}
         {loop $bizcirclelist $k $v}
         {if $v['bizcircleId'] == $array['bizcircleId'] }
         <b>{$v['bizcircleName']}</b>
         <a href=""><i></i></a>
         {/if}
         {/loop}
         {if !empty($array['bedRooms'])}
         {if $array['bedRooms'] == 1 }
         一居
         {elseif $array['bedRooms'] == 2}
         二居
         {elseif $array['bedRooms'] == 3}
         三居
         {elseif $array['bedRooms'] == 4}
         四居
         {elseif $array['bedRooms'] == 5}
         五居及以上
         {/if}
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['salePriceMin']) || !empty($array['salePriceMax'])}
         {if $array['salePriceMin'] == 0 && $array['salePriceMax'] == 1000 }
         <b>{$array['salePriceMax']}万以下</b>
         {elseif $array['salePriceMin'] == 5000 && $array['salePriceMax'] == 20000000000 }
         <b>{$array['salePriceMin']}万以上</b>
         {else}
         <b>{$array['salePriceMin']}-{$array['salePriceMax']}万</b>
         {/if}
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['areaMin']) || !empty($array['areaMax'])}
         {if $array['areaMin'] == 0 && $array['areaMax'] == 100}
         <b>{$array['areaMax']}㎡以下</b>
         {elseif $array['areaMin'] == 500 && $array['areaMax'] == 20000000000}
         <b>{$array['areaMin']}㎡以上</b>
         {else}
         <b>{$array['areaMin']}-{$array['areaMax']}㎡</b>
         {/if}
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['houseType'])}
         {if $array['houseType'] == 1 }
         高档住宅
         {elseif $array['houseType'] == 2 }
         叠拼别墅
         {elseif $array['houseType'] == 3 }
         联排别墅
         {elseif $array['houseType'] == 4 }
         独栋别墅
         {elseif $array['houseType'] == 5 }
         双拼别墅
         {/if}
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['orientation'])}
         {if $array['orientation'] == 1 }
         东
         {elseif $array['orientation'] == 2 }
         南
         {elseif $array['orientation'] == 3 }
         西
         {elseif $array['orientation'] == 4 }
         北
         {elseif $array['orientation'] == 10 }
         南北
         {/if}
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['houseUseType'])}
         {if $array['houseUseType'] == 1 }
         住宅
         {elseif $array['houseUseType'] == 2 }
         商业
         {elseif $array['houseUseType'] == 3 }
         写字楼
         {/if}
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['fitmentType'])}
         {if $array['fitmentType'] == 1 }
         毛坯
         {elseif $array['fitmentType'] == 2 }
         简装
         {elseif $array['fitmentType'] == 3 }
         精装
         {/if}
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['fiveYears'])}
         满五
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['twoYears'])}
         满二
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['isNewHouse'])}
         全新房
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['isGarden'])}
         花园
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['isTerrace'])}
         露台
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['isFloorHeating'])}
         地暖
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['stableTemperature'])}
         恒温恒湿
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['isSwimmingPool'])}
         带泳池
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['isMingChef'])}
         明厨明卫
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['isCourtyard'])}
         合院
         <a href=""><i></i></a>
         {/if}
         {if !empty($array['is720'])}
         3D看房
         <a href=""><i></i></a>
         {/if}
         <a href="/sh-esf" class="clear" style="margin-left: 20px;color: #c2c2c2;">清空条件</a>
       </div>
     </div>
     {/if} -->
    </div>
    <!-- 找到房源 -->
    <div class="find container clearfix">
      <div>
        <h4>为您找到
          <b>{{getHouseList.total}}</b>套上海豪宅</h4> |
        <p>
          <a href="">综合</a>
          <a href="">最新</a>
          <a href="">售价
            <i></i>
          </a>
          <a href="">面积
            <i></i>
          </a>
        </p>
      </div>
      <!--<a href="javascript:void(0)"><i></i>地图找房</a>-->
    </div>
    <!-- 房源列表 -->
    <div v-if="getHouseList.list.length>0" class="contBox">
      <div class="container">
        <ul>
          <li class="contList clearfix" v-for="(house, index) in getHouseList.list" :key="index">
            <!-- href="/sh-esf/{$v['housedelId']}.html" -->
            <a href="/sh-esf/house.housedelId" target="_blank" class="listImg">

              <img class='lazy_img' :src="house.titleImgUrl" :alt="house.bizcircleName+ house.resblockName+'二手豪宅出售'" :title="house.bizcircleName+ house.resblockName+'二手豪宅出售'" />

            </a>
            <div class="clearfix">
              <div class="leftSize">
                <h3>
                  <a href="/sh-esf/house.housedelId" target="_blank" :title="house.houseTitle">{{house.houseTitle}}</a>
                </h3>
                <ul>
                  <li>
                    <b class="js"></b>
                    <i>{{house.rooms}}</i>
                    <span v-if="house.rooms&&house.buildArea">|</span>
                    <i>{{house.buildArea}} ㎡</i>

                    <i v-if="house.beforeFew">前{{house.beforeFew}}后{{house.afterFew}}
                      <s class="question"></s>
                    </i>

                  </li>
                  <li>
                    <b class="dz"></b>
                    <a href="/sh-esf/house.housedelId" target="_blank">
                      <i>{{house.resblockName}}</i>
                    </a>
                    <span v-if="house.resblockName&&house.bizcircleName">|</span>
                    <a v-if="house.bizcircleName" href="'/sh-esf/'+house.districtId+'_'+house.bizcircleId">
                      <i>{{house.bizcircleName}}</i>
                    </a>

                  </li>
                  <li>
                    <b class="zz"></b>
                    <!-- 高档住宅 -->
                    <i v-if="house.houseType=='高档住宅'">{{house.houseType}}</i>
                    <i v-if="house.houseType=='高档住宅'">
                      <span v-if="house.floorType">{{house.floorType}}</span>
                      <span v-if="house.totalFloors">/{{house.totalFloors}}层</span>
                    </i>
                    <!-- 高档住宅end -->
                    <!-- 联排别墅 -->
                    <i v-if="house.houseType=='联排别墅'">{{house.houseType}}
                      <span v-if="house.doorType">-{{house.doorType}}</span>
                    </i>
                    <span v-if="house.houseTyp=='联排别墅'&&house.downFloors">|</span>
                    <i v-if="house.houseType=='联排别墅'&&house.upFloors&&house.downFloors">
                      <span>地上{{house.upFloors}}层</span>
                      <span>/地下{{house.downFloors}}层</span>
                    </i>
                    <!-- 联排别墅end -->
                    <!-- 独栋别墅||双拼别墅 -->
                    <i v-if="house.houseType=='独栋别墅'||house.houseType=='双拼别墅'">{{house.houseType}}</i>
                    <span v-if="(house.houseType=='独栋别墅'||house.houseType=='双拼别墅')&&house.downFloors">|</span>
                    <i v-if="house.houseType=='独栋别墅'||house.houseType=='双拼别墅'">
                      <span v-if="house.upFloors"> 地上{{house.upFloors}}层</span>
                      <span v-if="house.downFloors">/地下{{house.downFloors}}层</span>
                    </i>
                    <!-- 独栋别墅||双拼别墅end -->
                    <!-- 叠拼别墅 -->
                    <i v-if="house.houseType=='叠拼别墅'">{{house.houseType}}
                      <span v-if="house.stackType">-{{house.stackType}}</span>
                    </i>
                    <span v-if="house.houseType=='叠拼别墅'&&house.downFloors">|</span>
                    <i v-if="house.houseType=='叠拼别墅'">
                      <span v-if="house.upFloors">地上{{house.upFloors}}层</span>
                      <span v-if="house.downFloors">/地下{{house.downFloors}}层</span>
                    </i>
                    <!-- 叠拼别墅end -->
                  </li>
                </ul>
                <p class="label clearfix">
                  <label v-if="house.fiveYears=='102300000001'">满五</label>
                  <label v-if="house.twoYears=='102300000001'&&house.fiveYears=='102300000001'">满二</label>
                  <label v-if="house.isNewHouse=='102300000001'">全新房</label>
                  <label v-if="house.isGarden=='102300000001'">花园</label>
                  <label v-if="house.isTerrace=='102300000001'">露台</label>
                  <label v-if="house.isFloorHeating=='102300000001'">地暖</label>
                  <label v-if="house.stableTemperature=='102300000001'">恒温恒湿</label>
                  <label v-if="house.isMingChef=='102300000001'">明厨明卫</label>
                  <label v-if="house.isCourtyard=='102300000001'">合院</label>
                  <label v-if="house.isSwimmingPool=='102300000001'">带泳池</label>
                  <label v-if="house.isParkingSpace=='102300000001'">带车位</label>
                  <label v-if="house.isCarport=='102300000001'">带车库</label>
                </p>
              </div>
              <ul class="rightCern">
                <!--<li>加关注</li>-->
                <li>
                  <span>{{house.quotedPrice}}万</span>
                  <!--<b>38位客户看过此房</b>-->
                </li>
                <li v-if="house.is720=='102300000001'" class="threeD">
                  <a href="'/sh-esf/'+house.housedelId+'.html'" target="_blank">
                    <i class="threeD"></i>3D看房</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!--  {if !empty($pages)}
       {$pages}
     {/if} -->
      </div>
    </div>
    <div v-else class="noFindH">
      <div class="noResult">
        <h6>没有找到您要的内容，您可换个条件试试</h6>
        <p>手机号：
          <span>
            <input placeholder="请输入您的手机号" type="text">
            <!-- <b>获取验证码</b>-->
          </span>
        </p>
        <p style="text-align:center;color:#BABABA">
          我们承诺：保障客户隐私安全，绝不泄露客户任何信息！
        </p>
        <!--<p>验证码：
          <span><input type="text" placeholder="请输入验证码" /></span>
        </p>-->
        <input value="一键省心找房" class="findH" type="button">
      </div>
    </div>
    <!-- 新房推荐 -->
    <div v-if="getProjectRecommend.length>0" class="newHouse">
      <div class="container clearfix" id="one_recommended_view">
        <h5>新房推荐</h5>
        <div class="newImg clearfix">

          <dl v-for="(house,index) in getProjectRecommend" :key="index" style="padding-bottom: 0;">
            <!-- href="/sh-xf/lp{$v['resblockId']}-{$v['pkid']}.html" -->
            <a href="/sh-xf/lp.html" target="_blank">
              <dt>

                <img class='lazy_img' :src="house.titleImg" :alt="house.resblockName+'一手豪宅'" :title="house.resblockName+'一手豪宅'" />

                <p class="price" style="padding:0 0 28px;">
                  <span>{{house.resblockName}}</span>

                  <b v-if="house.unitPriceMin"> {{house.unitPriceMin}}元/㎡起 </b>

                </p>
                <p style="width: 100%;position: absolute;bottom: 0px;color: #ccc;padding:5px 0">
                  <span> {{house.districtName}} / {{house.bizcircleName}} </span>

                  <b v-if="house.houseType" title="">{{house.houseType}}</b>

                </p>
              </dt>
            </a>
          </dl>

        </div>
      </div>
    </div>
    <!-- 二手房推荐 -->
    <div v-if="getSecondRecommend.length>0&&getHouseList.list.length<=0" class="newHouse">
      <div class="container clearfix">
        <h5>二手豪宅推荐</h5>
        <div class="newImg clearfix seconeImg">
          <dl v-for="(house,index) in getSecondRecommend" :key="index" style="padding-bottom: 0;">
            <a href="/sh-esf/housedelId.html" target="_blank">
              <dt>

                <img class='lazy_img' v-lazy='house.titleImgUrl' data-src="~assets/img/default2.png" :alt="house.resblockName+'二手豪宅出售'" :title="house.resblockName+'二手豪宅出售'" />

                <p class="price" style="padding:0 0 28px;">
                  <span>{{house.resblockName}}</span>
                  <b>{{house.quotedPrice}}万</b>
                </p>
                <p style="width: 100%;position: absolute;bottom: 0px;color: #ccc;padding:5px 0">
                  <span v-if="house.houseType=='高档住宅'">
                    <span v-if="house.rooms">{{house.rooms}}</span>
                    <span v-if="house.buildArea&&house.rooms">/</span>
                    <span>{{house.buildArea}}㎡</span>
                  </span>
                  <b>{{house.houseType}}</b>

                  <span v-if="hosue.houseType!='高档住宅'">

                    <span v-if="house.buildArea">{{house.buildArea}}㎡</span>

                    <span v-if="house.buildArea&&house.upFloors">/</span>

                    <span>地上{{house.upFloors}}层</span>

                    <span>/地下{{house.downFloors}}层</span>

                  </span>
                  <b>{{house.houseType}}</b>

                </p>
              </dt>
            </a>
          </dl>
        </div>
      </div>
    </div>

    <!-- <div id="dd">{{getHouseList}}</div> -->
   
  </div>
</template>
<script>
import headers from '~/components/headers.vue'
import axios from '~/plugins/axios'
import { mapState, mapGetters, mapMutations } from 'vuex'
import localData from '../../util/localStore'
export default {
  data() {
    return {
      // 居室
      room: [
        {
          districtId: 'h1',
          districtName: '一居'
        },
        {
          districtId: 'h2',
          districtName: '二居'
        },
        {
          districtId: 'h3',
          districtName: '三居'
        },
        {
          districtId: 'h4',
          districtName: '四居'
        },
        {
          districtId: 'h5',
          districtName: '五居及以上'
        }
      ],
      // 售价
      price: [
        {
          districtId: '0p0-tp1000',
          districtName: '1000万以下一居'
        },
        {
          districtId: '0p1000-tp1500',
          districtName: '1000-1500万'
        },
        {
          districtId: '0p1500-tp2000',
          districtName: '1500-2000万'
        },
        {
          districtId: '0p2000-tp3000',
          districtName: '2000-3000万'
        },
        {
          districtId: '0p3000-tp5000',
          districtName: '3000-5000万'
        },
        {
          districtId: '0p5000-tp20000000000',
          districtName: '5000万以上'
        }
      ],
      // 面积
      area: [
        {
          districtId: 'au0-ad100',
          districtName: '100㎡以下'
        },
        {
          districtId: 'au100-ad140',
          districtName: '100-140㎡'
        },
        {
          districtId: 'au140-ad180',
          districtName: '140-180㎡'
        },
        {
          districtId: 'au180-ad220',
          districtName: '180-220㎡'
        },
        {
          districtId: 'au220-ad280',
          districtName: '220-280㎡'
        },
        {
          districtId: 'au280-ad360',
          districtName: '280-360㎡'
        },
        {
          districtId: 'au360-ad420',
          districtName: '360-420㎡'
        },
        {
          districtId: 'au420-ad500',
          districtName: '420-500㎡'
        },
        {
          districtId: 'au500-ad20000000000',
          districtName: '500㎡及以上'
        }
      ],
      // 产品
      product: [
        {
          districtId: 'cp1',
          districtName: '高档住宅'
        },
        {
          districtId: 'cp2',
          districtName: '叠拼别墅'
        },
        {
          districtId: 'cp3',
          districtName: '联排别墅'
        },
        {
          districtId: 'cp4',
          districtName: '独栋别墅'
        },
        {
          districtId: 'cp5',
          districtName: '双拼别墅'
        }
      ],
      // 朝向
      toward: [
        {
          districtId: 'c1',
          districtName: '东'
        },
        {
          districtId: 'c2',
          districtName: '南'
        },
        {
          districtId: 'c3',
          districtName: '西'
        },
        {
          districtId: 'c4',
          districtName: '北'
        },
        {
          districtId: 'c10',
          districtName: '南北'
        }
      ],
      // 用途
      purpose: [
        {
          districtId: 'y1',
          districtName: '住宅'
        },
        {
          districtId: 'y2',
          districtName: '商业'
        },
        {
          districtId: 'y3',
          districtName: '写字楼'
        }
      ],
      // 装修
      decoration: [
        {
          districtId: 'z1',
          districtName: '毛坯'
        },
        {
          districtId: 'z2',
          districtName: '简装'
        },
        {
          districtId: 'z3',
          districtName: '精装'
        }
      ],
      // 特色
      features: [
        {
          districtId: 'pa1',
          districtName: '满五'
        },
        {
          districtId: 'pb1',
          districtName: '满二'
        },
        {
          districtId: 'pc1',
          districtName: '全新房'
        },
        {
          districtId: 'pd1',
          districtName: '花园'
        },
        {
          districtId: 'pe1',
          districtName: '露台'
        },
        {
          districtId: 'pf1',
          districtName: '地暖'
        },
        {
          districtId: 'pg1',
          districtName: '恒温恒湿'
        },
        {
          districtId: 'ph1',
          districtName: '带泳池'
        },
        {
          districtId: 'pi1',
          districtName: '明厨明卫'
        },
        {
          districtId: 'pj1',
          districtName: '合院'
        },
        {
          districtId: 'pk1',
          districtName: '3D看房'
        }
      ]
    }
  },
  async asyncData({ store, route, params, error, env }) {
    let parm = {
      sortType: '',
      sortColumn: '',
      source: 400100000001,
      pageSize: 20,
      currentPage: '1',
      userId: 'SHG18011740042',
      useType: null,
      keyWord: '',
      maxBuildArea: null,
      minBuildArea: null,
      maxQuotedPrice: null,
      minQuotedPrice: null,
      cityCode: '310000'
    }

    store.commit('headerType/urlInfo', route.path)

    let [getDistrict, getSecondHouseList] = await Promise.all([
      axios.get(`${env.url}/landz-web-house/secondHand/getDistrict?cityCode=310000`),
      axios.post(`${env.url}/landz-web-house/secondHand/getHouseList`, parm)
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })
    return {
      getDistrict: getDistrict.data.result,
      getHouseList: getSecondHouseList.data.result.houseList, // 二手列表
      getProjectRecommend: getSecondHouseList.data.result.projectRecommend, // 新房推荐
      getSecondRecommend: getSecondHouseList.data.result.secondHandRecommend // 二手房推荐
    }
  },
  mounted() {
    // 城市存储
    if (!localData.getItem('cityProper')) {
      localData.setItem('cityProper', this.getDistrict)
    }
    // 居室
    if (!localData.getItem('roomProper')) {
      localData.setItem('roomProper', this.room)
    }
    // 售价
    if (!localData.getItem('priceProper')) {
      localData.setItem('priceProper', this.price)
    }
    // 面积
    if (!localData.getItem('areaProper')) {
      localData.setItem('areaProper', this.area)
    }
    // 产品
    if (!localData.getItem('productProper')) {
      localData.setItem('productProper', this.product)
    }
    // 朝向
    if (!localData.getItem('towardProper')) {
      localData.setItem('towardProper', this.toward)
    }
    // 用途
    if (!localData.getItem('purposeProper')) {
      localData.setItem('purposeProper', this.purpose)
    }
    // 装修
    if (!localData.getItem('decorationProper')) {
      localData.setItem('decorationProper', this.decoration)
    }
    // 特色
    if (!localData.getItem('featuresProper')) {
      localData.setItem('featuresProper', this.features)
    }
  },
  fetch({ app, store, params }) {
    // return app.$axios.get('http://my-api/stars')
    //   .then((res) => {
    //     store.commit('setStars', res.data)
    //   })
  },
  methods: {
    ...mapMutations({cityInfo: 'secondType/cityInfo'}),
    setCity(city) {
      console.log(this)
      this.cityInfo(city)
      // this.$store.commit(this.cityInfo, city)
      // console.log('ceshi')
      // console.log(this.$route)
      // :href="'/sh-esf/'+city.districtId"
      // this.router.push({path: '/sh-esf', params: city.districtId})
    }
  },
  computed: {
    /*  ...mapState([
      "searchInfo",
      "busines"
    ]), */
    ...mapState({
      searchInfo: state => state.secondType.searchInfo,
      busines: state => state.secondType.busines
    }),
    ...mapGetters({
      searchRuslt: 'secondType/searchRuslt'
    })
  },
  components: {
    headers
  }
}
</script>
<style>
@import "../../assets/css/secondHandList.css";
</style>
