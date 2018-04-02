<template>
  <div>
    <headers></headers>
    <!-- 面包屑 -->
    <div class="onehandBox">
      <div class="locating container clearfix" style="padding-bottom:10px;">
        <p style="background: rgba(0,0,0,.5);line-height: 19px;border-radius: 2px;padding: 0 2px;margin:0;">
          <a href="/">上海豪宅</a> &gt;
          <a href="/sh-xf">一手豪宅出售</a> &gt;
          <a href="/sh-xf/110112">{{resblockInfo.districtName}}豪宅出售</a>&gt;
          <a href="/sh-xf/110112_195">{{resblockInfo.bizcircleName}}豪宅出售</a> &gt;
          <a href="/sh-xf/lp4986-2701.html">{{resblockInfo.resblockName}}</a>
        </p>
      </div>
      <!-- 项目介绍 -->
      <div class="project container clearfix" style="height: 360px;">
        <div class="proInfo_min" style="width: 150px;color: #fff;height: 31px;display: none;position: absolute;border-radius: 5px;">
          <span class="pg_min" style="position: absolute;width: 150px;height: 31px;display: inline-block;font-size: 14px;left: 0px;color: #fff;line-height: 31px;font-weight: bold;text-align: center;background:url(~assets/img/icon.png) no-repeat 0px -151px;">新房简介</span>
        </div>
        <div class="proInfo" style="font-size: 12px;" id="proInfo_view">
          <h4 class="proBtn">新房简介</h4>
          <div class="proCont clearfix" style="left: 0px;">
            <b class="slide">×</b>
            <div class="selling">
              <span v-if="resblockInfo.isSale == '102300000001'">在售</span>
              <span v-if="resblockInfo.isSale !== '102300000001'">售罄</span>
              <h5>
                <span class="name" :title="resblockInfo.resblockName">{{resblockInfo.resblockName}}</span>
                <span class="nocommission">免佣金</span>
              </h5>
              <p>
                <b v-show="resblockInfo.salePriceMin==resblockInfo.salePriceMax&&resblockInfo.salePriceMin&&resblockInfo.salePriceMax">{{resblockInfo.salePriceMin}}万</b>
                <b v-show="resblockInfo.salePriceMin!==resblockInfo.salePriceMax">{{resblockInfo.salePriceMin?resblockInfo.salePriceMin:''}}{{resblockInfo.salePriceMin&&resblockInfo.salePriceMax?'~':''}}{{resblockInfo.salePriceMax?resblockInfo.salePriceMax:''}}{{resblockInfo.salePriceMin||resblockInfo.salePriceMax?'万':''}}</b>
              </p>
            </div>
            <div class="sellCont">
              <ul>
                <li class="clearfix">
                  <label v-if="resblockInfo.isSelfGarden==102300000001">自带公园</label>
                  <label v-if="resblockInfo.isGardenHouse==102300000001">花园洋房</label>
                  <label v-if="resblockInfo.isCourtyard==102300000001">合院</label>
                  <label v-if="resblockInfo.isSelfBusiness==102300000001">自带商业</label>
                  <label v-if="resblockInfo.isLake==102300000001">临湖</label>
                  <label v-if="resblockInfo.isNewWind==102300000001">新风系统</label>
                  <label v-if="resblockInfo.stableTemperature==102300000001">恒温恒湿</label>
                  <label v-if="resblockInfo.isHotSpring==102300000001">温泉入户</label>
                </li>
                <li class="lookMap" :loacation="resblockInfo.projectLocation" :name="resblockInfo.resblockName" :qname="resblockInfo.projectLocation"
                  :data-mapx="resblockInfo.mapX" :data-mapy="resblockInfo.mapY">
                  <a href="javascript:void(0)" :title="resblockInfo.projectLocation">
                    <span>项目区位</span>：
                    <strong v-if="resblockInfo.projectLocation" class="pg_quwei">{{resblockInfo.projectLocation||'--'}}</strong>
                    <b>
                      <img v-if="resblockInfo.projectLocation" src="~assets/img/pg_quwei.png" style="margin-top:2px;">
                    </b>
                  </a>
                </li>
                <li>
                  <span>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品</span>：{{resblockInfo.houseTypeInfo}}</li>
                <li>
                  <span>在售户型</span>：{{resblockInfo.mainHouseType}}</li>
                <li>
                  <a href="javascript:void(0)" style="cursor:default">
                    <span>房屋用途</span>：{{resblockInfo.houseUseType}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="share" style="background: rgba(0,0,0,1);border-radius: 5px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;">
          <!--<a href="javascript:void(0)">
                  <b class="gz"></b>
                  <span>加关注</span>
              </a>-->
          <a href="javascript:void(0)" class="pg_yuyue" @click="bookViewCondition = true">
            <b class="yy"></b>
            预约看房
          </a>
          <a href="javascript:void(0)" class="pg_fx">
            <b class="fx"></b>
            分享
          </a>
        </div>
        <p class="album">
          <span></span>
          楼盘相册 (
          <b>{{getResblockPictureList.pictureCount}}</b>张)
        </p>
        <div id="qrcode" style="position: absolute;right: 31px;top: 42px;display: none;border:6px solid #fff ;border-radius:2px;"></div>
      </div>

    </div>
    <!-- 楼盘照片 -->
    <style>
      .oneHandFocus>div span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-width: 1220px;
        height: 480px;
        background-size: cover;
      }

    </style>
    <!-- 顶部banner -->
    <div class="oneHandFocus">
      <div class="banner_bac">
        <span :style="{background: 'url('+ getResblockPictureList.defaultPicture +') center center no-repeat' }"></span>
      </div>
      <!--注释  相册信息来 sh-xf/getResblockPictureList.html 取 或者  -->
    </div>
    <!-- 免佣金 -->
    <div class="nocommission container" style="margin-top:2px;margin-bottom:32px">
      <a href="/activePage.html" target="_blank">
        <img src="~assets/img/nocommission.png" alt="">
      </a>
    </div>
    <!-- 分类标题 -->
    <div class="titleNav container clearfix">
      <h3 data-id="index_1" class="current">楼盘动态</h3>
      <h3 data-id="index_2">楼盘相册</h3>
      <h3 data-id="index_7">楼盘卖点</h3>
      <h3 data-id="index_3">户型信息</h3>
      <h3 data-id="index_4">楼盘信息</h3>
      <!-- <h3 data-id="index_5">鸟瞰图</h3> -->
      <h3 data-id="index_5">周边配套</h3>
      <h3 data-id="index_6">带看顾问</h3>
    </div>
    <!-- 楼盘动态 -->
    <div class="contBor index_1">
      <div class="buildSport container" style="border-bottom:1px solid #ddd;">
        <h4>楼盘动态</h4>
        <div>
          <div class="sportCont" v-if="resblockDynamicList.length">
            <div class="sportList clearfix">
              <dl v-for="item in resblockDynamicList">
                <dt>
                  <img v-if="item.activityType =='302100000001'" src="~assets/img/icon_d1.png" />
                  <img v-if="item.activityType =='302100000005'" src="~assets/img/icon_d2.png" />
                </dt>
                <dd>
                  <div v-if="item.activityType == '302100000001'">
                    <h5>
                      <i v-if="item.activityName" class="overflow_hidden_width340" :title="item.activityName">{{item.activityName}}</i>
                      <span v-if="item.isLandzOnly =='102300000001'" class="vertical-align-top">丽兹独享</span>
                    </h5>
                    <p>
                      <span>专场时间：</span>
                      <span :title="item.specialTime" class="overflow_hidden">{{item.specialTime}}</span>
                    </p>
                    <p>
                      <span>邀约话术：</span>
                      <span :title="item.inviteWord" class="overflow_hidden">{{item.inviteWord}}</span>
                    </p>
                    <p>
                      <span>专场地点：</span>
                      <span :title="item.address" class="overflow_hidden">{{item.address}}</span>
                    </p>
                  </div>
                  <div v-if="item.activityType == '302100000005'">
                    <h5>
                      <i v-if="item.activityName" class="overflow_hidden_width340" :title="item.activityName">{{item.activityName}}</i>
                      <span v-if="item.isLandzOnly =='102300000001'" class="vertical-align-top">丽兹独享</span>
                    </h5>
                    <p title="{$v['activityInfo']}">
                      <span>优惠内容：</span>
                      <span :title="item.activityInfo" class="overflow_hidden">
                        {{item.activityInfo||'--'}}
                      </span>
                    </p>
                    <p v-if="item.webLabel">外网标签：{{item.webLabel}}</p>
                    <p>
                      <span>发布时间：</span>
                      <span :title="item.releaseTime" class="overflow_hidden">{{item.releaseTime}}}</span>
                    </p>
                  </div>
                </dd>
              </dl>
            </div>


          </div>
          <p class="noSport" v-if="!resblockDynamicList.length">
            <b></b>
            <span>咨询顾问，获取新房最新动态</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 楼盘相册 -->
    <div class="buildSport container" id="picture_cot_view" total="40">
      <h4 class="index_2">楼盘相册</h4>
      <div class="picture clearfix">
        <dl :filetype="item.fileType" v-for="(item,index) in resblockPictureVoList">
          <dt>
            <a href="javascript:void(0)">
              <img class="lazy_img" src="~assets/img/default2.png" :data-src="item.fileUrl" :alt="`${resblockInfo.resblockName}楼盘相册`" :title="`${resblockInfo.resblockName}楼盘相册`">
            </a>
          </dt>
          <dd class="pg1">新房现场图
            <span v-if="item.fileType==1">（{{getResblockPictureList.fileType1}}）</span>
            <span v-if="item.fileType==4">（{{getResblockPictureList.fileType4}}）</span>
            <span v-if="item.fileType==3">（{{getResblockPictureList.fileType2}}）</span>
            <span v-if="item.fileType==2">（{{getResblockPictureList.fileType2}}）</span>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 楼盘卖点 -->
    <div class="buildNews">
      <div class="buildSport container">
        <h4 class="index_7">楼盘卖点</h4>
        <div class="houseDet sellpoint">
          <ul class="intrLong">
            <li class="item" :title="resblockInfo.saleLocation">
              <label>地理优势</label>
              <b>{{resblockInfo.saleLocation||'--'}}</b>
            </li>
            <li class="item" :title="resblockInfo.saleTransport">
              <label>交通优势</label>
              <b>{{resblockInfo.saleTransport||'--'}}</b>
            </li>
            <li class="item" :title="resblockInfo.saleSuport">
              <label>配套优势</label>
              <b>{{resblockInfo.saleSuport||'--'}}</b>
            </li>
            <li class="item" :title="resblockInfo.saleGreen">
              <label>园林绿化</label>
              <b>{{resblockInfo.saleGreen||'--'}}</b>
            </li>
            <li class="item" :title="resblockInfo.saleBuildStyle">
              <label>景观亮点</label>
              <b>{{resblockInfo.saleBuildStyle||''}}</b>
            </li>
            <li class="item" :title="resblockInfo.saleSpecialValue">
              <label>楼盘特点</label>
              <b>{{resblockInfo.saleSpecialValue||'--'}}</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 户型信息 -->
    <div class="buildNews contBor" id="huxing_view">
      <div class="buildSport container">
        <h4 class="index_3">户型信息</h4>
        <div class="hxTitle clearfix">
          <h5 class="current">全部户型
            <span> ( 4 )</span>
          </h5>
          <h5 bedrooms="5">5居及以上
            <span> ( 4 )</span>
          </h5>
          <!-- <span class="last_h5" style="float: right;" bedRooms='6'>
                  <input type="checkbox" value="0" class="check_view_state" id="checkbox-1" style="display: none;">
                  <label for="checkbox-1"></label>
                  <span class="status">只看在售</span>
              </span> -->
        </div>
        <div class="hxBox">
          <a href="javascript:void(0)" class="goLeft" style="display:none"></a>

          <ul class="imglist clearfix" style="width: 1020px;">
            <li data-type="7" housetypeid="7870" salestatus="302700000001">
              <dl>
                <dt style="cursor: pointer;">
                  <img style="width: 195px;height: 260px;" class="lazy_img" src="~assets/img/testImg.jpg" data-src="http://timage.lizihang.com/group1/M00/0C/0F/rBAOJ1mAXRyETjA8AAAAAJMPFkI469.jpg.675x900.wbp.jpg"
                    onerror="javascript:this.src='~assets/img/testImg.jpg'" alt="格拉斯小镇户型信息" title="格拉斯小镇户型信息">
                  <i class="saleStatus">在售</i>
                </dt>
                <dd>
                  <div>
                    <h6>
                      3260万
                    </h6>
                    <p class="clearfix">
                      <span>
                        独栋别墅 </span>
                      <em> 455.28㎡</em>
                    </p>
                    <p class="clearfix">
                      <span style="display: inline-block;max-width: 197px;overflow: hidden;text-overflow: ellipsis;">
                        地上2层 / 地下1层
                      </span>
                    </p>
                  </div>
                </dd>
              </dl>
            </li>
            <li data-type="6" housetypeid="7876" salestatus="302700000001">
              <dl>
                <dt style="cursor: pointer;">
                  <img style="width: 195px;height: 260px;" class="lazy_img" src="~assets/img/testImg.jpg" data-src="http://timage.lizihang.com/group1/M00/0C/28/rBAOKFmAYl-EP6U3AAAAAEc8f5A098.jpg.675x900.wbp.jpg"
                    onerror="javascript:this.src='~assets/img/testImg.jpg'" alt="格拉斯小镇户型信息" title="格拉斯小镇户型信息">
                  <i class="saleStatus">在售</i>
                </dt>
                <dd>
                  <div>
                    <h6>
                      3650~4005万
                    </h6>
                    <p class="clearfix">
                      <span>
                        独栋别墅 </span>
                      <em> 534.66㎡</em>
                    </p>
                    <p class="clearfix">
                      <span style="display: inline-block;max-width: 197px;overflow: hidden;text-overflow: ellipsis;">
                        地上2层 / 地下1层
                      </span>
                    </p>
                  </div>
                </dd>
              </dl>
            </li>
            <li data-type="8" housetypeid="7877" salestatus="302700000001">
              <dl>
                <dt style="cursor: pointer;">
                  <img style="width: 195px;height: 260px;" class="lazy_img" src="~assets/img/testImg.jpg" data-src="http://timage.lizihang.com/group1/M00/0C/0E/rBAOJ1mAW2yELyT9AAAAAKmAnGg106.jpg.675x900.wbp.jpg"
                    onerror="javascript:this.src='~assets/img/testImg.jpg'" alt="格拉斯小镇户型信息" title="格拉斯小镇户型信息">
                  <i class="saleStatus">在售</i>
                </dt>
                <dd>
                  <div>
                    <h6>
                      6000~6100万
                    </h6>
                    <p class="clearfix">
                      <span>
                        独栋别墅 </span>
                      <em> 805.79㎡</em>
                    </p>
                    <p class="clearfix">
                      <span style="display: inline-block;max-width: 197px;overflow: hidden;text-overflow: ellipsis;">
                        地上2层 / 地下1层
                      </span>
                    </p>
                  </div>
                </dd>
              </dl>
            </li>
            <li data-type="6" housetypeid="7863" salestatus="302700000001">
              <dl>
                <dt style="cursor: pointer;">
                  <img style="width: 195px;height: 260px;" class="lazy_img" src="~assets/img/testImg.jpg" data-src="http://timage.lizihang.com/group1/M00/0B/B4/rBAOKFk9ZbWEFwsmAAAAAPKSVhc923.jpg.675x900.wbp.jpg"
                    onerror="javascript:this.src='~assets/img/testImg.jpg'" alt="格拉斯小镇户型信息" title="格拉斯小镇户型信息">
                  <i class="saleStatus">在售</i>
                </dt>
                <dd>
                  <div>
                    <h6>
                      3110~3300万
                    </h6>
                    <p class="clearfix">
                      <span>
                        独栋别墅 </span>
                      <em> 441.26㎡</em>
                    </p>
                    <p class="clearfix">
                      <span style="display: inline-block;max-width: 197px;overflow: hidden;text-overflow: ellipsis;">
                        地上2层 / 地下1层
                      </span>
                    </p>
                  </div>
                </dd>
              </dl>
            </li>
          </ul>
          <a href="javascript:void(0)" class="goRight" style="display:none"></a>
        </div>
      </div>
    </div>
    <!-- 楼盘信息 -->
    <div class="buildNews">
      <div class="buildSport container">
        <h4 class="index_4">楼盘信息</h4>
        <div class="houseDet">
          <ul class="all">

            <li class="keep clearfix">
              <span>
                <label>占地面积</label>：
                <b>
                  {{resblockInfo.buildSpace ? resblockInfo.buildSpace + '㎡' : '--'}}
                </b>
              </span>
              <span>
                <label>建筑面积</label>：
                <b>
                  {{resblockInfo.buildArea ? resblockInfo.buildArea + '㎡' : '--'}}
                </b>
              </span>
              <span>
                <label>建筑类型</label>：
                <b>
                  {{resblockInfo.constType || '--'}}
                </b>
              </span>
            </li>
            <li class="keep clearfix">
              <span>
                <label>总&nbsp;&nbsp;户&nbsp;数</label>：
                <b>
                  {{resblockInfo.houseCount ? resblockInfo.houseCount + '户' : '--'}}
                </b>
              </span>
              <span>
                <label>物&nbsp;&nbsp;业&nbsp;费</label>：
                <b>
                  {{resblockInfo.propertyFee ? resblockInfo.propertyFee + '元/㎡/月' : '--'}}
                </b>
              </span>
              <span>
                <label>人车分流</label>：
                <b>
                  {{resblockInfo.isSplit || '--'}}
                </b>
              </span>
            </li>

            <li class="keep clearfix">
              <span>
                <label>供暖方式</label>：
                <b>
                  {{resblockInfo.giveHeatType || '--'}}
                </b>
              </span>
              <span>
                <label>采暖方式</label>：
                <b>
                  {{resblockInfo.takeHeatType || '--'}}
                </b>
              </span>
              <span>
                <label>车&nbsp;&nbsp;位&nbsp;数</label>：
                <b style="vertical-align: middle;">
                  {{resblockInfo.carCount || '--'}}
                </b>
              </span>
            </li>
            <li class="keep clearfix">
              <span>
                <label>开&nbsp;&nbsp;发&nbsp;商</label>：
                <b style="width:900px;white-space: normal;vertical-align: top;" title="北京海港房地产开发有限公司">
                  {{resblockInfo.developerCompany || '--'}}
                </b>
              </span>
            </li>
            <li class="keep clearfix">
              <span>
                <label>物业公司</label>：
                <b style="width:900px;white-space: normal;vertical-align: top;" title="鲁能物业管理有限公司">
                  {{resblockInfo.propertyCompany || '--'}}
                </b>
              </span>
            </li>

            <li class="clearfix" style="display:none">
              <span>
                <label>建筑设计</label>：
                <b title="北京建筑设计研究院">
                  {{resblockInfo.buildDesign || '--'}}
                </b>
              </span>
              <span>
                <label>园林设计</label>：
                <b title="北京星河园林工程有限公司">
                  {{resblockInfo.landscapeDesign || '--'}}
                </b>
              </span>
              <span>
                <label>建筑年代</label>：
                <b>
                  {{resblockInfo.buildYear || '--'}}
                </b>
              </span>
            </li>
            <li class="clearfix" style="display:none">
              <span>
                <label>拿地时间</label>：
                <b>
                  {{resblockInfo.getAreaTime || '--'}}
                </b>
              </span>
              <span>
                <label>车&nbsp;&nbsp;位&nbsp;比</label>：
                <b style="vertical-align: middle;">
                  {{resblockInfo.carRate || '--'}}
                </b>
              </span>

            </li>
            <li class="clearfix" style="display:none">
              <span>
                <label>会&nbsp;&nbsp;&nbsp;&nbsp;所</label>：
                <b>
                  {{resblockInfo.clubName || '--'}}
                </b>
              </span>
            </li>
            <a href="javascript:void(0)" class="btn downIt"></a>
          </ul>
        </div>
      </div>
    </div>
    <!-- 周边配套 -->
    <div class="contBor">
      <div class="decscri container" style="position: relative;">
        <h4 class="index_5">周边配套</h4>
        <div class="mapBox" id="allmap">
        </div>
        <!-- <div id="r-result" style="position: absolute;top:149px;right: 0;width:200px"></div> -->
        <div class="tabBox">
          <ul class="aroundType">
            <li class="LOGCLICK selectTag" data-key="地铁,公交">交通</li>
            <li class="LOGCLICK" data-key="幼儿园,小学,初中,高中,大学">教育</li>
            <li class="LOGCLICK" data-key="医院,药店">医疗</li>
            <li class="LOGCLICK" data-key="银行,餐饮,购物">生活</li>
            <li class="LOGCLICK" data-key="公园,运动健身">娱乐</li>
          </ul>
          <ul class="itemTagBox clearfix">
            <li class='selectTag'>地铁</li>
            <li>公交</li>
          </ul>
          <!-- <div id="r-result"></div> -->
          <div class="aroundList">
            <ul class="itemBox">

            </ul>
          </div>
        </div>
        <div id="mapImg2"></div>
      </div>
    </div>
    <!-- 看房记录 -->
    <div class="decscri container seeBuild" id="seeBuild_view">
      <h4 class="clearfix index_6">带看顾问  <p>客户看房 <i>8008</i>次</p>  </h4>
    </div>
    <!-- 新房推荐 -->
    <div class="newHouse newgetHotRecommend_cot first_newHouse">
      <div class="container clearfix">
        <h5>新房推荐</h5>
        <oneHandRec :projectRecommendList='projectRecommendList'></oneHandRec>
      </div>
    </div>
    <!-- 二手豪宅推荐 -->
    <div class="newHouse">
      <div class="container clearfix">
        <h5>二手房推荐</h5>
        <secondHandRec :hotRecommend='hotRecommend'></secondHandRec>
      </div>
    </div>
    <!-- 预约看房 -->
    <bookView v-show="bookViewCondition" @hidebookView="bookViewCondition = false"></bookView>
  </div>
</template>
<script>
import headers from '~/components/headers'
import oneHandRec from '~/components/recommended/onehand'
import secondHandRec from '~/components/recommended/secondhand'
import bookView from '~/components/bookView'
import axios from '~/plugins/axios'
// import qs from 'qs'
export default {
  head() {
    return this.$setSeo(`${this.resblockInfo.resblockName}楼盘_上海${this.resblockInfo.resblockName}新房房价_楼盘信息_地址_户型_周边配套|图片-丽兹行官网`, '上海楼盘信息，上海楼盘信息网，上海新开楼盘，上海高档住宅出售信息、上海别墅楼盘、上海豪宅楼盘', `上海豪宅新房出售-丽兹行官网为您提供上海一手豪宅别墅最新楼盘出售信息：${this.resblockInfo.resblockName}开盘信息，上海${this.resblockInfo.resblockName}新房房价、${this.resblockInfo.resblockName}信息、地址、户型以及周边配套、图片等。更多上海豪宅别墅新开楼盘信息就上丽兹行上海站`)
  },
  async asyncData ({
    params,
    error,
    store,
    route,
    env
  }) {
    console.log(route.matched[0].name)
    store.commit('headerType/urlInfo', route.path)
    let _data = params.id.split('-')
    let [resblockId, prjInfoId] = [_data[0].replace('lp', ''), _data[1].replace('.html', '')]
    let data = {
      cityCode: '310000',
      prjInfoId: prjInfoId,
      resblockId: resblockId,
      userId: '',
      source: 400100000001
    }
    let [resblockInfo, getResblockPictureList] = await Promise.all([
      // 楼盘基本信息
      axios.post(`${env.url}/landz-web-project/resblockInfo/getResblockDetails`, data),
      // 楼盘相册的图片
      axios.post(`${env.url}/landz-web-project/resblockInfo/getResblockPictureList`, {
        cityCode: '310000',
        prjInfoId: prjInfoId,
        resblockId: resblockId
      })
    ]).catch(err => {
      error({
        statusCode: 400,
        message: err
      })
    })
    // 楼盘相册的处理
    let resblockPictureVoList = []
    let [fileType1, fileType2, fileType3, fileType4] = [0, 0, 0, 0]
    for (const item of getResblockPictureList.data.result.resblockPictureVoList) {
      if (item.fileType === '1' && !fileType1) {
        fileType1 = 1
        resblockPictureVoList.push(item)
      } else if (item.fileType === '2' && !fileType2) {
        fileType2 = 1
        resblockPictureVoList.push(item)
      } else if (item.fileType === '3' && !fileType3) {
        fileType3 = 1
        resblockPictureVoList.push(item)
      } else if (item.fileType === '4' && !fileType4) {
        fileType4 = 1
        resblockPictureVoList.push(item)
      }
    }
    return {
      resblockInfo: resblockInfo.data.result.resblockInfo,
      resblockDynamicList: resblockInfo.data.result.resblockDynamicList,
      getResblockPictureList: getResblockPictureList.data.result,
      resblockPictureVoList: resblockPictureVoList,
      // 新房推荐
      // projectRecommendList: projectRecommendList,
      // 城区 商圈id
      districtId: resblockInfo.data.result.resblockInfo.districtId,
      bizcircleId: resblockInfo.data.result.resblockInfo.bizcircleId,
      // 楼盘id
      resblockId: resblockId,
      // 项目id
      prjInfoId: prjInfoId
    }
  },
  data () {
    return {
      hotRecommend: [],
      projectRecommendList: [],
      bookViewCondition: false
    }
  },
  components: {
    headers,
    oneHandRec,
    secondHandRec,
    bookView
  },
  methods: {
    // 获取新房推荐
    getHotRecommend () {
      axios.post('/api/landz-web-project/resblockInfo/getHotRecommend', {
        cityCode: '310000',
        resblockId: this.resblockId,
        prjInfoId: this.prjInfoId,
        districtId: this.districtId,
        bizcircleId: this.bizcircleId
      })
        .then((res) => {
          console.log(res)
          this.hotRecommend = res.data.result
        })
    },
    // 二手房推荐
    getProjectRecommendList () {
      axios.post('/api/landz-web-project/list/getProjectRecommendList', {
        cityCode: '310000',
        resblockId: this.resblockId
      })
        .then((res) => {
          this.projectRecommendList = res.data.result
        })
    }
    // 初始化地图
    // 隐藏预约看房
    // hidebookView (message) {
    //   this.bookViewCondition =false
    // }
  },
  created () {
    this.$nextTick(() => {
      // this.getHotRecommend()
    })
    this.getHotRecommend()
    this.getProjectRecommendList()
  }
}
</script>
<style>
  @import '../../assets/css/imgScroll.css';
  @import '../../assets/css/detailsStyle.css';
  @import '../../assets/css/oneDetails.css';
  .oneHandFocus>div span {
    background: url('http://image.lizihang.com/group1/M00/0B/9D/rBAOJ1k-S0qEP1JFAAAAAHz5Dn4197.jpg.1920x480.jpg') center center no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1220px;
    height: 480px;
    background-size: cover;
  }

  .sellpoint li b {
    width: 778px;
    white-space: normal;
    vertical-align: top;
  }

</style>
