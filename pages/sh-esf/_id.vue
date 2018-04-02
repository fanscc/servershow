<template>
  <div>
    <headers></headers>
    <!-- 搜索 -->
    <div class="serachHouse">
      <div class="container clearfix" style="position: relative;">
        <p class="nowL">
          <a href="/">上海豪宅</a> >
          <a href="/sh-esf/">二手豪宅{{searchInfo.city.districtId?'出售':''}}
          </a>
          <a v-if="searchInfo.city.districtId" @mouseenter="showBusinessArea" :href="'/sh-esf/'+searchInfo.city.districtId" class="disN_a">
            > {{searchInfo.city.districtName}}
            <span>
              <img style="width:13px;height:13px;margin-left:5px;" src="~/assets/img/down.png" alt="">
            </span>
          </a>
          <a v-if="searchInfo.busines.districtId" :href="'/sh-esf/'+searchInfo.city.districtId+'_'+searchInfo.busines.districtId" class="bizN_a">
            >{{searchInfo.busines.districtName}}
            <span>
              <img style="width:13px;height:13px;margin-left:5px;" src="~/assets/img/down.png" alt="">
            </span>
          </a>
        </p>
        <ul class="disN pg_nav_city" ref="city">
          <li v-for="city in getDistrict" :key="city.districtId">
            <a :href="'/sh-esf/'+city.districtId">{{city.districtName}}
              <span style="display:none">二手豪宅</span>
            </a>
          </li>
        </ul>
        <ul class="bizN pg_nav_area">
          <li v-for="item in getBizcircle" :key="item.bizcircleId">
            <a :href="'/sh-esf/'+searchInfo.city.districtId+'_'+item.bizcircleId">{{item.bizcircleName}}
              <span style="display:none">二手豪宅</span>
            </a>
          </li>
        </ul>
        <div class="reason clearfix">
          <div class="sear">
            <!-- :value="queryStr.wd" @input="updateKeyWord"   @focus="infocus" -->
            <input id='search' @focus="infocus" type="text" placeholder="请输入楼盘名称/区域" v-model="currentWord" @keyup.enter="updateKeyWord(currentWord)" />
            <!-- <input type="button" class="searicon" /> -->
            <a :href="'/sh-esf/?wd='+currentWord" class="searicon" @click="updateKeyWord(wd)"></a>
          </div>
          <div class="pg_search_pv" style="display:none"></div>
          <div v-if="isShowWord" class="history_cot" style="position: absolute;width: 781px;border: 1px solid #E2E2E2;box-sizing:content-box;padding-right: 3px;padding-top:10px;">
            <span class="pg_history">
              <i>搜索历史</i>
              <i class="clear_history" style="float: right;color: #333;cursor: pointer;">清除历史</i>
              <img style="float: right;height: 16px;width: 15px;margin: 2px 5px 0 0;cursor:pointer" src='~/assets/img/garb.png' />
            </span>
            <ul class="second" style="display: block;min-height: 40px;overflow: hidden;">
              <li class="pg_href" v-for="(item,index) in wordData" :key="index">
                <a class="history_str_pv" :href="'/sh-esf/?wd='+item" target="_self">{{item}}</a>
              </li>
              <!-- <a v-for="(item,index) in wordData" :key="index" class="history_str_pv" :href="'/sh-esf/?wd='+item" target="_self" onclick="_hmt.push([&quot;_trackEvent&quot;, &quot;二手房历史搜索&quot;,&quot;click&quot;, &quot;阳光花园别墅&quot;])"><li class="pg_href">{{item}}</li></a> -->
            </ul>
          </div>
          <div v-if="isAssociation" class="history_cot" style="position: absolute;width: 781px;border: 1px solid #E2E2E2;box-sizing:content-box;padding-right: 3px;padding-top:10px;">
            <ul class="second" style="display: block;min-height: 40px;overflow: hidden;">
              <li class="pg_href" v-for="(item,index) in associativeData" :key="index">
                <a class="history_str_pv" :href="'/sh-esf/?wd='+item" target="_self">{{item}}</a>
              </li>
              <!-- <a v-for="(item,index) in wordData" :key="index" class="history_str_pv" :href="'/sh-esf/?wd='+item" target="_self" onclick="_hmt.push([&quot;_trackEvent&quot;, &quot;二手房历史搜索&quot;,&quot;click&quot;, &quot;阳光花园别墅&quot;])"><li class="pg_href">{{item}}</li></a> -->
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
            <a :href="'/sh-esf/'+getLimitPath('city')" class="current">不限</a>
            <a v-for="(city,index) in getDistrict" :class="{current:city.districtId===searchInfo.city.districtId}" onclick="_hmt.push(['_trackEvent', '二手房城区','click','{$v['districtName']}'])" :key="index" @click="setCity(city)" :href="'/sh-esf/'+getPath(city.districtId, 'city')">{{city.districtName}}</a>
          </dd>
        </dl>
        <dl v-if="getBizcircle">
          <dt>商圈</dt>
          <dd style="width:1070px">
            <a :href="'/sh-esf/'+getLimitPath('busines')" class="current">不限</a>
            <a v-for="(busines,index) in getBizcircle" :key="index" :href="'/sh-esf/'+getPath(busines.bizcircleId, 'busines')" :class="{current:busines.bizcircleId===searchInfo.busines.districtId}" onclick="_hmt.push(['_trackEvent', '二手房商圈','click',''])">{{busines.bizcircleName}}</a>
          </dd>
        </dl>
        <dl>
          <dt>居室</dt>
          <dd>
            <a :href="'/sh-esf/'+getLimitPath('room')" :class="{current:!searchInfo.room.districtId}">不限</a>
            <a :href="'/sh-esf/'+getPath(room.districtId, 'room')" v-for="(room,index) in roomData" :key="index" :class="{current:room.districtId===searchInfo.room.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click',''])">{{room.districtName}}</a>
            <!-- <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '一居'])" href="">一居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '二居'])" href="">二居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '三居'])" href="">三居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '四居'])" href="">四居</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房居室','click', '五居'])" href="">五居及以上</a> -->
          </dd>
        </dl>
        <dl>
          <dt>售价</dt>
          <dd>
            <a :href="'/sh-esf/'+getLimitPath('price')" :class="{current:!searchInfo.price.districtId}">不限</a>
            <a :href="'/sh-esf/'+getPath(price.districtId, 'price')" v-for="(price,index) in priceData" :key="index" :class="{current:price.districtId===searchInfo.price.districtId}" onclick="_hmt.push(['_trackEvent', '二手房售价','click', '1000万以下'])">{{price.districtName}}</a>
            <div class="price_cot">
              <input type="text" v-model="minPrice" maxlength="5"> -
              <input type="text" v-model="maxPrice"> 万
              <a :href="'/sh-esf/'+getPath(`0p${minPrice}-tp${maxPrice}`, 'price')" @click="addCustom('price')" v-show="minPrice&&maxPrice" class="price_btn">确认</a>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>面积</dt>
          <dd>
            <a :href="'/sh-esf/'+getLimitPath('area')" :class="{current:!searchInfo.area.districtId}">不限</a>
            <a :href="'/sh-esf/'+getPath(area.districtId, 'area')" v-for="(area,index) in areaData" :key="index" :class="{current:area.districtId===searchInfo.area.districtId}" onclick="_hmt.push(['_trackEvent', '二手房面积','click', '100㎡以下'])">{{area.districtName}}</a>
            <div class="price_cot">
              <input type="text" v-model="minArea" maxlength="5"> -
              <input type="text" v-model="maxArea">㎡
              <a :href="'/sh-esf/'+getPath(`au${minArea}-ad${maxArea}`, 'area')" v-show="minArea&&maxArea" class="price_btn">确认</a>
            </div>
            <!-- <a class="area_cot">
              <input type="text" value="" maxlength=5/> -
              <input type="text" value="" maxlength=5/> ㎡
              <input type="button" value="确定" style="display: none;" class="area_btn" />
              <input type="hidden" value="">
            </a> -->
          </dd>
        </dl>
        <dl>
          <dt>产品</dt>
          <dd>
            <a :href="'/sh-esf/'+getLimitPath('product')" :class="{current:!searchInfo.product.districtId}">不限</a>
            <a :href="'/sh-esf/'+getPath(product.districtId, 'product')" v-for="(product,index) in productData" :key="index" :class="{current:product.districtId===searchInfo.product.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click','++'])">{{product.districtName}}</a>
            <!-- <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '高档住宅'])" href="">高档住宅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '叠拼别墅'])" href="">叠拼别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '联排别墅'])" href="">联排别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '独栋别墅'])" href="">独栋别墅</a>
            <a onclick="_hmt.push(['_trackEvent', '二手房产品','click', '双拼别墅'])" href="">双拼别墅</a> -->
          </dd>
        </dl>
        <transition name="slide-fade">
          <div class="otherTerm" v-if="isShow">

            <dl>
              <dt>朝向</dt>
              <dd>
                <a :href="'/sh-esf/'+getLimitPath('toward')" :class="{current:!searchInfo.toward.districtId}">不限</a>
                <a :href="'/sh-esf/'+getPath(toward.districtId, 'toward')" v-for="(toward,index) in towardData" :key="index" :class="{current:toward.districtId===searchInfo.toward.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click','++'])">{{toward.districtName}}</a>
              </dd>
            </dl>
            <dl>
              <dt>用途</dt>
              <dd>
                <a :href="'/sh-esf/'+getLimitPath('purpose')" :class="{current:!searchInfo.purpose.districtId}">不限</a>
                <a :href="'/sh-esf/'+getPath(purpose.districtId, 'purpose')" v-for="(purpose,index) in purposeData" :key="index" :class="{current:purpose.districtId===searchInfo.purpose.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click','++'])">{{purpose.districtName}}</a>
              </dd>
            </dl>
            <dl>
              <dt>装修</dt>
              <dd>
                <a :href="'/sh-esf/'+getLimitPath('decoration')" :class="{current:!searchInfo.decoration.districtId}">不限</a>
                <a :href="'/sh-esf/'+getPath(decoration.districtId, 'decoration')" v-for="(decoration,index) in decorationData" :key="index" :class="{current:decoration.districtId===searchInfo.decoration.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click',''])">{{decoration.districtName}}</a>
              </dd>
            </dl>
            <dl>
              <dt>特色</dt>
              <dd>
                <a :href="'/sh-esf/'+getLimitPath('features')" :class="{current:!searchInfo.features.districtId}">不限</a>
                <!-- :href="'/sh-esf/'+getPath(features.districtId, 'features')" -->
                <a :href="'/sh-esf/'+getPath(features.districtId, 'features')" v-for="(features,index) in featuresData" :key="index" :class="{current:features.districtId===searchInfo.features.districtId}" onclick="_hmt.push(['_trackEvent', '二手房居室','click',''])" class="checkBox">
                  <input type="checkbox" :value="features.districtId" v-model="featuresBind" />{{features.districtName}}
                  <label :class="{filted:inFeatures(features.districtId)}"></label>
                </a>

              </dd>
            </dl>

          </div>
        </transition>
        <!-- <a href="javascript:void(0)" class="moreOther">更多筛选 ∨</a> -->

        <a href="javascript:void(0)" class="moreOther" @click="isShow = !isShow">{{isShow?'更多筛选 ∨':'点击收起 ∧'}}</a>

      </div>

      <div class="selected" v-if="keyword || searchResult.length>0">
        您已选择：
        <div class="choice clearfix">
          <a href="" v-if="keyword">{{keyword}}
            <i></i>
          </a>
          <a :href="'/sh-esf/'+getLimitPath(key)" v-if="value && key!=='features'" v-for="(value, key, index) in searchInfo" :key="index">{{value.districtName}}
            <i></i>
          </a>
          <a :href="'/sh-esf/'+getLimitPath('features', value.districtId)" v-if="value" v-for="(value, key, index) in searchInfo.features" :key="index">{{value.districtName}}
            <i></i>
          </a>
          <a href="/sh-esf" class="clear" style="margin-left: 20px;color: #c2c2c2;">清空条件</a>
        </div>
      </div>

    </div>
    <!-- 找到房源 -->
    <div class="find container clearfix">
      <div>
        <h4>为您找到
          <b>{{getHouseList.total}}</b>套上海豪宅</h4> |
        <p>
          <a :href="getComplex('综合')">综合</a>
          <a :href="getComplex('最新')">最新</a>
          <a :href="getComplex('其他','o')" key="售价">售价
            <i></i>
          </a>
          <a :href="getComplex('其他','m')" key="面积">面积
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

              <img class='lazy_img' v-lazy="house.titleImgUrl" data-src="/img/default2.png" :alt="house.bizcircleName+ house.resblockName+'二手豪宅出售'" :title="house.bizcircleName+ house.resblockName+'二手豪宅出售'" />

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

                <img class='lazy_img' :src='house.titleImg' data-src="~/assets/img/default2.png" :alt="house.resblockName+'一手豪宅'" :title="house.resblockName+'一手豪宅'" />

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

                <img class='lazy_img' :src='house.titleImgUrl' data-src="~assets/img/default2.png" :alt="house.resblockName+'二手豪宅出售'" :title="house.resblockName+'二手豪宅出售'" />

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

                  <span v-if="house.houseType!='高档住宅'">

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
    <!-- 123 -->
    {{featuresBind}} {{getHouseList}}
  </div>
</template>
<script>
import headers from '~/components/headers.vue'
import axios from '~/plugins/axios'
import { mapState, mapGetters, mapMutations } from 'vuex'
import localData from '../../util/localStore'
// import '../../assets/js/secondHandList'
export default {
  data() {
    return {
      result: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      // wd: '',
      isShow: false,
      isShowWord: false,
      isAssociation: false,
      associativeData: '',
      currentWord: '',
      wordData: ''
      // featuresBind: [],
    }
  },
  async asyncData({ app, store, params, query, error, env }) {
    console.log(query.wd)
    let names = [
      'city',
      'busines',
      'price',
      'room',
      'area',
      'features',
      'toward',
      'decoration',
      'product',
      'purpose'
    ]
    let searchData = {
      // 城区
      cityData: [],
      // 商圈
      businesData: [],
      // 居室
      roomData: [
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
      priceData: [
        {
          districtId: '0p0-tp1000',
          districtName: '1000万以下'
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
      areaData: [
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
      productData: [
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
      towardData: [
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
      purposeData: [
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
      decorationData: [
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
      featuresData: [
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
    let regex = /(\d{6})?_?(\d{3})?_?(0p\d+-tp\d+)?_?(h\d)?_?(au\d+?-ad\d+)?_?((?:p[a-z]1)*)?_?(c\d+)?_?(z\d)?_?(cp\d)?_?(y\d)?/gi
    let result = regex.exec(params.id)

    // console.log(store)
    // 参数赋值
    let parm = {
      districtId: null, // 城区
      bizcircleId: null, // 商圈
      salePriceMin: null, // 售价
      salePriceMax: null,
      bedRooms: null, // 居室
      areaMin: null, // 面积
      areaMax: null,
      fiveYears: null, // 是否满五
      twoYears: null, // 是否满二
      isNewHouse: null, // 是否全新房
      orientation: null, // 朝向
      fitmentType: null, // 装修
      houseType: null, // 产品
      isFurnitureCompleted: null, // 家具
      isEletricalCompleted: null, // 家电
      isGarden: null, // 是否带花园
      isTerrace: null, // 是否带露台
      isFloorHeating: null, // 是否地暖
      stableTemperature: null, // 有无恒温恒湿
      isSwimmingPool: null, // 是否有泳池
      isMingChef: null, // 是否明厨明卫
      isChineseDecoration: null, // 中式装修
      isWesternDecoration: null, // 欧式装修
      isCanLookAnyTime: null, // 随时可看
      isCourtyard: null, // 是否合院
      is720: null, // 是否有720
      sortType: '',
      sortColumn: '',
      source: 400100000001,
      pageSize: 20,
      currentPage: '1',
      userId: 'SHG18020730466',
      useType: null,
      keyWord: '',
      maxBuildArea: null,
      minBuildArea: null,
      maxQuotedPrice: null,
      minQuotedPrice: null,
      cityCode: '310000'
    }

    for (let i = 1; i <= 10; i++) {
      if (result[i]) {
        switch (i) {
          case 1: // 城区
            parm.districtId = result[i]
            break
          case 2: // 商圈
            parm.bizcircleId = result[i]
            break
          case 3: // 售价
            let regex3 = /0p(\d+)-tp(\d+)/
            let result1Data = regex3.exec(result[i])
            parm.salePriceMin = result1Data[1]
            parm.salePriceMax = result1Data[2]
            break
          case 4: // 居室
            let regex4 = /h(\d+)/
            let result4Data = regex4.exec(result[i])
            parm.bedRooms = result4Data[1]
            break
          case 5: // 面积
            let regex5 = /au(\d+)-ad(\d+)/
            let result5Data = regex5.exec(result[i])
            parm.areaMin = result5Data[1]
            parm.areaMax = result5Data[2]
            break
          case 6: // 特色
            if (/pa1/.test(result[i])) {
              parm.fiveYears = '102300000001'
              // store.commit('setFeatures', 'pa1')
              // store.commit('featuresInfo', {districtId: 'pa1', districtName: '满五'})
            }
            if (/pb1/.test(result[i])) {
              parm.twoYears = '102300000001'
              // store.commit('setFeatures', 'pb1')
              // store.commit('featuresInfo', {districtId: 'pb1', districtName: '满二'})
            }
            if (/pc1/.test(result[i])) {
              parm.isNewHouse = '102300000001'
              // store.commit('setFeatures', 'pc1')
              // store.commit('featuresInfo', {districtId: 'pc1', districtName: '全新房'})
            }
            if (/pd1/.test(result[i])) {
              parm.isGarden = '102300000001'
              // store.commit('setFeatures', 'pd1')
              // store.commit('featuresInfo', {districtId: 'pd1', districtName: '花园'})
            }
            if (/pe1/.test(result[i])) {
              parm.isTerrace = '102300000001'
              // store.commit('setFeatures', 'pe1')
              // store.commit('featuresInfo', {districtId: 'pe1', districtName: '露台'})
            }
            if (/pf1/.test(result[i])) {
              parm.isFloorHeating = '102300000001'
              // store.commit('setFeatures', 'pf1')
              // store.commit('featuresInfo', {districtId: 'pf1', districtName: '地暖'})
            }
            if (/pg1/.test(result[i])) {
              parm.stableTemperature = '102300000001'
              // store.commit('setFeatures', 'pg1')
              // store.commit('featuresInfo', {districtId: 'pg1', districtName: '恒温恒湿'})
            }
            if (/ph1/.test(result[i])) {
              parm.isSwimmingPool = '102300000001'
              // store.commit('setFeatures', 'ph1')
              // store.commit('featuresInfo', {districtId: 'ph1', districtName: '带泳池'})
            }
            if (/pi1/.test(result[i])) {
              parm.isMingChef = '102300000001'
              // store.commit('setFeatures', 'pi1')
              // store.commit('featuresInfo', {districtId: 'pi1', districtName: '明厨明卫'})
            }
            if (/pj1/.test(result[i])) {
              parm.isCourtyard = '102300000001'
              // store.commit('setFeatures', 'pj1')
              // store.commit('featuresInfo', {districtId: 'pj1', districtName: '合院'})
            }
            /* if (/pk1/.test(result[i])) {
              // 3D看房暂无
              parm.fiveYears = '102300000001'
            } */
            break

          case 7: // 朝向
            if (result[i]) {
              switch (result[i]) {
                case 'c1':
                  parm.orientation = '100500000001'
                  break
                case 'c2':
                  parm.orientation = '100500000002'
                  break
                case 'c3':
                  parm.orientation = '100500000003'
                  break
                case 'c4':
                  parm.orientation = '100500000004'
                  break
                case 'c5':
                  parm.orientation = '100500000005'
                  break
              }
            }
            parm.orientation = result[i]
            break
          case 8: // 装修
            if (result[i]) {
              switch (result[i]) {
                case 'z1':
                  parm.fitmentType = '105900000001'
                  break
                case 'z2':
                  parm.fitmentType = '105900000002'
                  break
                case 'z3':
                  parm.fitmentType = '105900000003'
                  break
              }
            }
            // parm.fitmentType = result[i]
            break
          case 9: // 产品
            if (result[i]) {
              switch (result[i]) {
                case 'cp1':
                  parm.houseType = '202900000001'
                  break
                case 'cp2':
                  parm.houseType = '202900000002'
                  break
                case 'cp3':
                  parm.houseType = '202900000003'
                  break
                case 'cp4':
                  parm.houseType = '202900000004'
                  break
                case 'cp5':
                  parm.houseType = '202900000005'
                  break
                case 'cp6':
                  parm.houseType = '202900000006'
                  break
              }
            }
            break
          case 10: // 用途 y1=117500000001,y2=117500000002,y3=117500000003
            if (result[i]) {
              switch (result[i]) {
                case 'y1':
                  parm.useType = '117500000001'
                  break
                case 'y2':
                  parm.useType = '117500000002'
                  break
                case 'y3':
                  parm.useType = '117500000003'
                  break
              }
            }
            break
        }
      }
    }
    // 参数赋值
    store.commit('secondType/keyWord', query.wd)
    if (query.wd) {
      parm.keyWord = query.wd
    }
    switch (query.soft) {
      case 't':
        parm.sortType = 'DESC'
        parm.sortColumn = 'createdTime'
        break
      case 'o1':
        parm.sortType = 'ASC'
        parm.sortColumn = 'quotedPrice '
        break
      case 'o2':
        parm.sortType = 'DESC'
        parm.sortColumn = 'quotedPrice '
        break
      case 'm1':
        parm.sortType = 'ASC'
        parm.sortColumn = 'buildArea'
        break
      case 'm2':
        parm.sortType = 'DESC'
        parm.sortColumn = 'buildArea'
        break
      default:
        parm.sortType = ''
        parm.sortColumn = ''
        break
    }
    let [getDistrict, getSecondHouseList, businessArea] = await Promise.all([
      axios.get(
        `${env.url}/landz-web-house/secondHand/getDistrict?cityCode=310000`
      ),
      axios.post(`${env.url}/landz-web-house/secondHand/getHouseList`, parm),
      axios.get(
        `${env.url}/landz-web-house/secondHand/getBizcircle?districtId=${
          result[1]
        }`
      )
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })
    searchData.cityData = getDistrict.data.result
    searchData.businesData = businessArea.data.result
    // 保存查询参数 ?wd=阳光花城&sort=t
    store.commit('secondType/setQueryStr', query)
    // 保存参数
    /*  for (let i = 1; i <= 10; i++) {
      // this.addPrams2Store(this.result[i], this.names[i - 1])
      let name =names[i]
      let params = result[i]
      let dataOption = searchData[name + "Data"]
      if (params && dataOption) {
        let id = ""
        let result = ""
        if (name === "features") {
          // id = /(p[a-z]1)/ig.exec(params)
          id = params.match(/(p[a-z]1)/gi)

          result = []
          for (let k = 0; k < id.length; k++) {
            result.push(
              dataOption.find(function(item) {
                return item.districtId === id[k]
              })
            )
          }
        } else {
          id = name === "city" || name === "busines"
              ? Number.parseInt(params)
              : params
          result = dataOption.find(function(item) {
            if (name === "busines") {
              // console.log(item)
              return item.bizcircleId === id
            } else {
              // console.log('districtId: ' + item.districtId)
              return item.districtId === id
            }
          })
          // 自定义售价

          if (!result) {
            if (name === "price") {
              id = /0p(\d+)-tp(\d+)/gi.exec(params)
              this.minPrice = Number.parseInt(id[1])
              this.maxPrice = Number.parseInt(id[2])
              result = {
                districtId: params,
                districtName: `${id[1]}-${id[2]}万`
              }
            }
            if (name === "area") {
              id = /au(\d+)-ad(\d+)/gi.exec(params)
              this.minArea = Number.parseInt(id[1])
              this.maxArea = Number.parseInt(id[2])
              result = {
                districtId: params,
                districtName: `${id[1]}-${id[2]}㎡`
              }
            }
          }
        }
        // console.log('售价')
        // console.log(result)
        // if (name === 'busines') {
        //   result = {
        //     districtId: result.bizcircleId,
        //     districtName: result.bizcircleName
        //   }
        // }
        this[name + "Info"](result)
      }
    } */
    for (let i = 1; i <= 10; i++) {
      addPrams2Store(result[i], names[i - 1])
    }

    function addPrams2Store(params, name) {
      let dataOption = searchData[name + 'Data']
      if (params && dataOption) {
        let id = ''
        let result = ''
        if (name === 'features') {
          // id = /(p[a-z]1)/ig.exec(params)
          id = params.match(/(p[a-z]1)/gi)

          result = []
          for (let k = 0; k < id.length; k++) {
            result.push(
              dataOption.find(function(item) {
                return item.districtId === id[k]
              })
            )
          }
        } else {
          id =
            name === 'city' || name === 'busines'
              ? Number.parseInt(params)
              : params
          result = dataOption.find(function(item) {
            if (name === 'busines') {
              // console.log(item)
              return item.bizcircleId === id
            } else {
              // console.log('districtId: ' + item.districtId)
              return item.districtId === id
            }
          })
          // 自定义售价

          if (!result) {
            if (name === 'price') {
              id = /0p(\d+)-tp(\d+)/gi.exec(params)
              this.minPrice = Number.parseInt(id[1])
              this.maxPrice = Number.parseInt(id[2])
              result = {
                districtId: params,
                districtName: `${id[1]}-${id[2]}万`
              }
            }
            if (name === 'area') {
              id = /au(\d+)-ad(\d+)/gi.exec(params)
              this.minArea = Number.parseInt(id[1])
              this.maxArea = Number.parseInt(id[2])
              result = {
                districtId: params,
                districtName: `${id[1]}-${id[2]}㎡`
              }
            }
          }
        }

        store.commit(`secondType/${name}Info`, result)
      }
    }

    /* let [getDistrict, getSecondHouseList, businessArea] = await Promise.all([
      app.$axios.get(
        `/api/landz-web-house/secondHand/getDistrict?cityCode=310000`
      ),
      app.$axios.post(`/api/landz-web-house/secondHand/getHouseList`, parm),
      app.$axios.get(
        `/api/landz-web-house/secondHand/getBizcircle?districtId=${
          result[1]
        }`
      )
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    }) */

    return {
      getBizcircle: businessArea.data.result,
      getDistrict: getDistrict.data.result,
      getHouseList: getSecondHouseList.data.result.houseList, // 二手列表
      getProjectRecommend: getSecondHouseList.data.result.projectRecommend, // 新房推荐
      getSecondRecommend: getSecondHouseList.data.result.secondHandRecommend, // 二手房推荐
      // 城区
      cityData: searchData.cityData,
      // 商圈
      businesData: searchData.businesData,
      // 居室
      roomData: searchData.roomData,
      // 售价
      priceData: searchData.priceData,
      // 面积
      areaData: searchData.areaData,
      // 产品
      productData: searchData.productData,
      // 朝向
      towardData: searchData.towardData,
      // 用途
      purposeData: searchData.purposeData,
      // 装修
      decorationData: searchData.decorationData,
      // 特色
      featuresData: searchData.featuresData
    }
  },
  async fetch({ store, route, params }) {
    console.log(this)
    // let { data } = await axios.get('http://my-api/stars')
    // store.commit('cityInfo', )
    // store.commit('setStars', data)
  },
  mounted() {
    // 匹配参数
    /*   let regex = /(\d{6})?_?(\d{3})?_?(0p\d+-tp\d+)?_?(h\d)?_?(au\d+?-ad\d+)?_?((?:p[a-z]1)*)?_?(c\d+)?_?(z\d)?_?(cp\d)?_?(y\d)?/gi

    this.result = regex.exec(this.$route.params.id)

    this.setQuery(this.$route.query) */

    // 如果有商圈ID查找商圈数据存入localstrage
    /*  localData.setItem("businesProper", this.getBizcircle)

    for (let i = 1; i <= 10; i++) {
      this.addPrams2Store(this.result[i], this.names[i - 1])
    } */
    console.log('mounted ' + this.$route.query.wd)
    this.currentWord = this.$route.query.wd
    this.wordData = localData.getItem('keyWordProper')
  },
  methods: {
    ...mapMutations({
      cityInfo: 'secondType/cityInfo',
      businesInfo: 'secondType/businesInfo',
      priceInfo: 'secondType/priceInfo',
      roomInfo: 'secondType/roomInfo',
      areaInfo: 'secondType/areaInfo',
      featuresInfo: 'secondType/featuresInfo',
      towardInfo: 'secondType/towardInfo',
      decorationInfo: 'secondType/decorationInfo',
      productInfo: 'secondType/productInfo',
      purposeInfo: 'secondType/purposeInfo',
      keyWord: 'secondType/keyWord',
      setQueryStr: 'secondType/setQueryStr'
    }),
    showBusinessArea() {
      // console.log(this.$refs.city.style.display = 'block')
      this.$refs.city.style.display = 'block'
    },
    hideBusinessArea() {
      this.$refs.city.style.display = 'none'
    },
    addPrams2Store(params, name) {
      let dataOption = localData.getItem(name + 'Proper')
      if (params && dataOption) {
        let id = ''
        let result = ''
        if (name === 'features') {
          // id = /(p[a-z]1)/ig.exec(params)
          id = params.match(/(p[a-z]1)/gi)

          result = []
          for (let k = 0; k < id.length; k++) {
            result.push(
              dataOption.find(function(item) {
                return item.districtId === id[k]
              })
            )
          }
        } else {
          id =
            name === 'city' || name === 'busines'
              ? Number.parseInt(params)
              : params
          result = dataOption.find(function(item) {
            if (name === 'busines') {
              // console.log(item)
              return item.bizcircleId === id
            } else {
              // console.log('districtId: ' + item.districtId)
              return item.districtId === id
            }
          })
          // 自定义售价

          if (!result) {
            if (name === 'price') {
              id = /0p(\d+)-tp(\d+)/gi.exec(params)
              this.minPrice = Number.parseInt(id[1])
              this.maxPrice = Number.parseInt(id[2])
              result = {
                districtId: params,
                districtName: `${id[1]}-${id[2]}万`
              }
            }
            if (name === 'area') {
              id = /au(\d+)-ad(\d+)/gi.exec(params)
              this.minArea = Number.parseInt(id[1])
              this.maxArea = Number.parseInt(id[2])
              result = {
                districtId: params,
                districtName: `${id[1]}-${id[2]}㎡`
              }
            }
          }
        }
        // console.log('售价')
        // console.log(result)
        // if (name === 'busines') {
        //   result = {
        //     districtId: result.bizcircleId,
        //     districtName: result.bizcircleName
        //   }
        // }
        this[name + 'Info'](result)
      }
    },
    addCustom(name) {
      let result = { districtId: '', districtName: '' }
      if (name === 'price') {
        result.districtId = `0p${this.minPrice}-tp${this.maxPrice}`
        result.districtName = `${this.minPrice}-${this.maxPrice}万`
        this[name + 'Info'](result)
      }
      if (name === 'area') {
        result.districtId = `au${this.minArea}-ad${this.maxArea}`
        result.districtName = `${this.minArea}-${this.maxArea}㎡`
        this[name + 'Info'](result)
      }
      // console.log('ceshi')
      // 路由跳转
      // const userId = '310101_401'
      // console.log(this.$router)
      // this.$router.push({ path: '/' })
    },
    setQuery(query) {
      this.setQueryStr(query)
    },
    inFeatures(id) {
      return this.$route.params.id.indexOf(id) !== -1
    },
    updateKeyWord(val) {
      console.log(localData.getItem('keyWordProper'))
      console.log(val)
      let keyWordData = localData.getItem('keyWordProper')
        ? localData.getItem('keyWordProper')
        : []
      let word = keyWordData.find(function(item) {
        return item === val
      })
      if (!word) {
        keyWordData.unshift(val)
        localData.setItem('keyWordProper', keyWordData)
      }
      // console.log(localData.getItem('keyWordProper'))
      // localData.setItem('keyWordProper', this.features)
    },
    infocus() {
      this.isShowWord = true
    },
    outfocus() {
      this.isShowWord = !false
    },
    getAssociative(value) {
      console.log(value)
      // ?cityCode=310000&type=二手房&resblockName=阳
      //  this.$axios.get(`/api/sh-esf/getAssociateResblock.html`, {
      if (value) {
        axios
          .get(`/api/landz-web-house/secondHand/getAssociateResblock`, {
            params: {
              cityCode: 310000,
              type: '二手房',
              resblockName: value
            }
          })
          .then(res => {
            console.log(res.data.suggestions.data)
            let data = res.data.suggestions.data
            if (data.length > 0) {
              this.isAssociation = true
              let arr = []
              data.forEach(function(item) {
                arr.push(item.resblockName)
              })
              this.associativeData = arr
            } else {
              this.isAssociation = false
            }
            this.$store.commit('secondType/keyWord', value)
          })
      } else {
        this.isAssociation = false
      }
    }
  },
  computed: {
    ...mapState({
      searchInfo: state => state.secondType.searchInfo,
      busines: state => state.secondType.busines,
      keyword: state => state.secondType.keyword,
      queryStr: state => state.secondType.queryStr,
      featuresBind: state => state.secondType.featuresBind
    }),
    ...mapGetters({
      searchResult: 'secondType/searchResult',
      getPath: 'secondType/getPath',
      getLimitPath: 'secondType/getLimitPath',
      getComplex: 'secondType/getComplex'
    }),
    wd: {
      get() {
        // return this.$store.state.keyword
        console.log('key word 1')
        return this.keyword
      },
      set(value) {
        console.log('key word 2')
        this.isShowWord = false
        this.isAssociation = true
        if (value && value !== this.keyword) {
          this.getAssociative(value)
        }

        // this.$store.commit("secondType/keyWord", value)

        // localData.setItem('keyWordProper', this.features)
      }
    }
  },
  watch: {
    currentWord: function(val, oldVal) {
      console.log('watch ' + this.isAssociation)
      this.isShowWord = false
      // this.isAssociation = true
      if (val && val !== this.keyword) {
        this.getAssociative(val)
      } else {
        this.isAssociation = false
      }
    }
  },
  components: {
    headers
  }
}
</script>
<style>
@import "../../assets/css/base.css";
@import "../../assets/css/secondHandList.css";
</style>