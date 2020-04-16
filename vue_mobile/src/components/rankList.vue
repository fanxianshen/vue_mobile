<template>
  <!--=S 活动Part2 -->
  <div class="page_rank">
    <!--==S 榜单 -->
    <div class="section_mod mod_rank">
      <div class="mod_v2 bd">
        <!-- 只适用这个项目,加个背景 -->
        <div v-show="showRank">
          <!--===S 榜单头部 -->
          <div class="rank_header">
            <P class="rank_header_title">&lt;榜單前50名均能享受儲值返點福利&gt;</P>
            <img
              class="rank_header_img"
              @click="showRank = !showRank"
              src="../img/reward_header.png"
            >
            <!-- <div class="rank_header_btn" @click="showRank = !showRank">點擊查看</div> -->
          </div>
          <!--===E 榜单头部 -->
          <!--===S 榜单列表 -->
          <div id="rank"></div>
          <div class="pb_mod_ranklist">
            <div class="list_hd">
              <span>排名</span>
              <span>頭像/暱稱</span>
              <span>儲值金幣</span>
            </div>
            <div class="list_bd">
              <div class="list_con">
                <!--S item -->
                <listItemV1
                  v-for="(item, index) in list"
                  :item="item"
                  :itemNo="item.sort"
                  :cls="getCls(index)"
                  :key="`${tabIndex}_${index}`"
                />
                <!--E item -->
              </div>
              <loading :isCenter="true" v-show="isLoading"/>
              <div class="mod_empty" v-show="isEmpty">暫無數據</div>
            </div>
            <mizPagination v-show="!isEmpty">
              <template slot-scope="props">
                <div class="pagination_btn first" @click="handleChangePage('home')">首頁</div>
                <div class="pagination_btn prev" @click="handleChangePage('up')">上一頁</div>
                <div class="pagination_btn next" @click="handleChangePage('down')">下一頁</div>
              </template>
            </mizPagination>
            <a id="toTop" href="#rank"></a>
            <div class="rank_list_bg2"></div>
          </div>
          <!--===E 榜单列表 -->
        </div>
        <!--===S 规则 -->
        <div v-show="!showRank" class="rule_content">
          <div class="rule_header">
            <div class="rule_header_img" @click="showRank = !showRank">
              <img src="../img/return_rank.png">
            </div>
            <div class="rule_rank">
              <div class="rule_num_content">
                <div>
                  <p class="opc7">當前排名</p>
                  <p class="rank_num" v-if="myLevel.rank != 0">{{myLevel.rank}}</p>
                  <p class="rank_num" v-else>200+</p>
                </div>
                <div>
                  <p class="opc7">可領取返還金幣</p>
                  <p class="rank_num">{{parseInt(myLevel.reward)}}</p>
                </div>
              </div>
            </div>
            <p class="rank_notice">榜單每小時刷新一次，您還沒有上榜，再接再厲哦！</p>
          </div>
          <div class="rule_text">
            <img src="../img/rule_content.jpg">
          </div>
          <div class="rule_reward">
            <img src="../img/rule_reward01.jpg">
            <img src="../img/rule_reward02.jpg">
            <img src="../img/rule_reward03.jpg">
          </div>
        </div>
        <!--===E 规则 -->
      </div>
    </div>
    <!--==E 榜单 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import dayjs from "dayjs";
import mizPagination from "../components/common/mizPagination";
import { ACTIVITYID, REQUESTDOMAIN } from "CONFIG/config";
import { apiGetPlayerSort } from "../api";
import loading from "CMT/loading";
import listItemV1 from "./common/listItemV1";
import { rankType } from "../js/data";

export default {
  components: {
    listItemV1,
    loading,
    mizPagination,
  },
  data() {
    return {
      tabIndex: 0, // 0最强拳手，1拳王之王
      list: [], // 列表
      isLoading: false, // 加载中
      subActivity: null, // 最强拳王榜单子活动
      pager: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
      myRank: {},
      isOver: false,
      cacheRankData: {}, // 缓存类别/分页/列表 cacheRankData[tabIndex] = {page, list}
      showRank: true,
    };
  },
  computed: {
    ...mapState({
      personal: (state) => state.mizData.personal, // 用户信息
      allSubActivity: (state) => state.mizData.allSubActivity, // 子活动列表
      isReady: (state) => state.mizData.isReady, // 请求完成
    }),
    // 是否空数据
    isEmpty() {
      return !this.isLoading && this.pager.total === 0;
    },
    myLevel() {
      let data = { rank: 0, reward: 0 };
      if (this.myRank.id) {
        data.rank = this.myRank.sort;
        data.reward = this.rewardGold(this.myRank.sort);
      }
      return data;
    },
  },
  mounted() {
    if (this.isReady) {
      this.getSubAct();
    }
  },
  methods: {
    // 获取样式名
    getCls(index) {
      let itemNo = this.getItemNo(index);

      return itemNo < 4 ? `top${itemNo}` : "";
    },
    // 获取样式名
    getMyCls(index) {
      index = index + 1;
      let len = 4;

      return index < len ? `top${index}` : "";
    },
    // 序号
    getItemNo(num) {
      let { page, pageSize } = this.pager;

      return num + 1 + (page - 1) * pageSize;
    },
    // 获取对应的子活动
    getSubAct() {
      // 7:普通，2:排行榜-赠送, 3:排行榜-获得,6:消费
      // 11：双十一抽奖排行榜
      for (let i = 0; i < this.allSubActivity.length; i++) {
        let rel = this.allSubActivity[i];
        // 双十一抽奖排行榜
        if (rel.type === rankType) {
          this.subActivity = rel;
        }
      }
      // 获取数据
      this.getCacheRankData();
    },
    // 从缓存中获取
    async getCacheRankData(isNew) {
      if (!ACTIVITYID) {
        return Promise.reject("没有配置活动ID");
      }
      if (!this.subActivity) {
        return;
      }

      let data = {};
      let timestamp = 0;
      let cacheRankData = this.cacheRankData;

      // 缓存初始化
      // 大榜
      if (!cacheRankData[this.tabIndex]) {
        cacheRankData[this.tabIndex] = {};
      }

      // 是否来自分页点击，是则重新读取
      isNew = isNew || false;

      // 读取缓存
      data = cacheRankData[this.tabIndex][timestamp];
      // 从接口读取
      if (!data || isNew) {
        this.list = [];
        this.isLoading = true;
        // 分页点击不需要重置页码
        if (!isNew) {
          this.pager.page = 1;
        }
        // 获取数据
        data = await this.handleGetRank();
        this.pager.total = data.total || 0;
        // 生成缓存数据
        data = Object.assign({}, data, { page: this.pager.page });
        // 写入缓存
        cacheRankData[this.tabIndex][timestamp] = data;
      }
      console.log("data.list", data);
      // 重置变量
      this.pager.page = data.page;
      this.pager.total = data.total;
      this.list = data.list;

      this.myRank = data.player;
      this.isLoading = false;
    },
    // 获取排行榜数据
    handleGetRank(relActivityId, page) {
      let timestamp = 0;
      let callApi = apiGetPlayerSort; // 个人榜接口
      let { pageSize } = this.pager;
      let data = {};

      page = page || this.pager.page;

      data = {
        param: {
          playerId: this.personal.id, // 用户id
          activityId: ACTIVITYID, // 主活动id
          relActivityId: this.subActivity.id, // 子活动id
          page,
          pageSize,
        },
      };

      // 排行榜不能为普通类型
      data.type = timestamp; // 日期时间戳

      // 排行榜非普通类型
      return callApi(data);
    },
    // 分页切换
    handleChangePage(to) {
      if (to == "home") {
        this.pager.page = 1;
      } else if (to == "up") {
        if (this.pager.page == 1) {
          return;
        }
        this.pager.page = this.pager.page - 1;
      } else if (to == "down") {
        if (
          this.pager.page == Math.ceil(this.pager.total / this.pager.pageSize)
        ) {
          return;
        } else {
          this.pager.page++;
        }
      }
      document.getElementById("toTop").click();
      this.getCacheRankData(true);
    },
    //返还金币
    rewardGold(rank) {
      let rewardGold = 0;
      if (1 <= rank && rank <= 3) {
        rewardGold = this.myRank.gold * 0.05;
      } else if (4 <= rank && rank <= 10) {
        rewardGold = this.myRank.gold * 0.03;
      } else if (11 <= rank && rank <= 20) {
        rewardGold = this.myRank.gold * 0.02;
      } else if (21 <= rank && rank <= 50) {
        rewardGold = this.myRank.gold * 0.01;
      }
      return rewardGold;
    },
  },
  watch: {
    isReady(val) {
      if (val) {
        this.getSubAct();
      }
    },
  },
};
</script>
<style lang="scss">
@import "../style/rankList";
</style>
