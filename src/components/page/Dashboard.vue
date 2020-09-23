<template>
  <div>
    <el-row :gutter="20">
      <!-- 第一行 左边 -->
      <el-col :span="8">
        <!-- 用户信息面板 -->
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../../assets/img/user.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2020-06-11</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>南京</span>
          </div>
        </el-card>
        <!-- 进度条面板 -->
        <el-card shadow="hover" style="height:252px;">
          <div id="progressBar"></div>
        </el-card>
      </el-col>
      <!-- 第一行 右边 -->
      <el-col :span="16">
        <!-- 访问、消息、数量 -->
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{pv}}</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{mv}}</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{nv}}</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 待办事项 -->
        <el-card shadow="hover" style="height:403px;">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 第二行 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <h2 class="title_table">{{ msg.AnimatBar_msg }}</h2>
          <div id="AnimatBar" style="margin-top: 10px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <h2 class="title_table">{{ msg.lineChart_msg }}</h2>
          <div id="lineChart" style="margin-top: 10px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 第三行 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <h2 class="title_table">{{ msg.keywords_msg }}</h2>
          <div id="keywChart" style="margin-top: 25px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
           <h2 class="title_table">{{ msg.barChart_msg }}</h2>
           <div id="barChart" style="margin-top: 25px;"></div>
        </el-card>
      </el-col>
    </el-row>

      <!-- 第四行 -->
    <el-row :gutter="20">
      <el-card shadow="hover" style="height:683px;">
        <el-calendar v-model="value"></el-calendar>
      </el-card>
    </el-row>

  </div>
</template>

<script>
  import {
    DataSet
  } from '@/api/index'
  import bus from '../common/bus';
  import {
    fetch_diamond,
    fetch_keywords,
    fetch_AnimatBar
  } from '@/api/index';

  export default {
    name: 'dashboard',
    data() {
      return {
        value: new Date(),
        pv:134, //访问量
        mv:623, //消息量
        nv:579, //数量
        name: localStorage.getItem('ms_username'),
        todoList: [{
            title: '直营酒店对检查结果制定实际可行的整改方审定批',
            status: false
          },
          {
            title: '对于直营酒店汇报周报、月报、及各类工作事项进行一审阅批示。',
            status: false
          },
          {
            title: '考核考评周期为每月一次,上月25日至本月26日,考评权重及结果将纳入月度绩效。',
            status: false
          },
          {
            title: '直营酒店对考评结果分析,并组织团队进行总结',
            status: false
          },
          {
            title: 'SJU酒店内容整改',
            status: true
          },
          {
            title: '将直营酒店每月考评结果通过OA系统进行公布',
            status: true
          }
        ],
        data: [{
            name: '2018/09/04',
            value: 1083
          },
          {
            name: '2018/09/05',
            value: 941
          },
          {
            name: '2018/09/06',
            value: 1139
          },
          {
            name: '2018/09/07',
            value: 816
          },
          {
            name: '2018/09/08',
            value: 327
          },
          {
            name: '2018/09/09',
            value: 228
          },
          {
            name: '2018/09/10',
            value: 1065
          }
        ],
        msg: {
          barChart_msg: "",
          lineChart_msg: "",
          keywords_msg: "",
          AnimatBar_msg: "",
        },
        chart: null,
        G2_data: [{
            genre: "周一",
            sold: 575
          },
          {
            genre: "周二",
            sold: 515
          },
          {
            genre: "周三",
            sold: 620
          },
          {
            genre: "周四",
            sold: 750
          },
          {
            genre: "周五",
            sold: 850
          },
          {
            genre: "周六",
            sold: 750
          },
          {
            genre: "周日",
            sold: 989
          }
        ]
      };
    },
    created(){
      // this.headImg();
    },
    computed: {
      role() {
        let authority = localStorage.getItem('authority');
        if(authority == 1){
          return this.role = '超级管理员';
        }else if(authority == 2){
          return this.role = '经理';
        }else if(authority == 3){
          return this.role = '酒店前台';
        }
        // return this.name === 'admin' ? '超级管理员' : '普通用户';
      },
    },
    mounted() {
      this.init_progressBar();
      this.init_barChart();
      this.init_lineChart();
      this.init_keywords();
      this.init_AnimatBar();
    },
    methods: {
      changeDate() {
        const now = new Date().getTime();
        this.data.forEach((item, index) => {
          const date = new Date(now - (6 - index) * 86400000);
          item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        });
      },
      
      headImg(){
        let authority = localStorage.getItem('authority');
        if(authority == 1){
          return this.headImg = '../../assets/img/user.jpg'
        }else if(authority == 2){
          return this.headImg = '../../assets/img/img.jpg'
        }else if(authority == 3){
          return this.headImg = '../../assets/img/img.jpg'
        }
      },

      //进度条形图
      init_progressBar(){
        function getTypeColor(type) {
          if (type === '全年销售额达标程度') { return '#1890ff'; }
        }
        const data = [
          { class: '全年销售额达标程度', country: '第四季度', type: '1', value: 90.8 },
          { class: '全年销售额达标程度', country: '第四季度', type: '2', value: 9.2 },
          { class: '全年销售额达标程度', country: '第三季度', type: '1', value: 72.9 },
          { class: '全年销售额达标程度', country: '第三季度', type: '2', value: 27.1 },
          { class: '全年销售额达标程度', country: '第二季度', type: '1', value: 63.6 },
          { class: '全年销售额达标程度', country: '第二季度', type: '2', value: 36.4 },
          { class: '全年销售额达标程度', country: '第一季度', type: '1', value: 80.3 },
          { class: '全年销售额达标程度', country: '第一季度', type: '2', value: 19.7 },
        ];
        const progress_chart = new this.$G2.Chart({
          container: 'progressBar',
          autoFit: true,
          height: 230,
          padding: [25, 25, 25, 70]
        });

        progress_chart.data(data);
        progress_chart.legend(false);
        progress_chart.tooltip({
          showMarkers: false
        });
        progress_chart.facet('rect', {
          fields: ['class'],
          columnTitle: {
            offsetY: -15,
            style: {
              fontSize: 14,
              fontWeight: 300,
              fill: '#404040e3'
            }
          },
          eachView: (view, facet) => {
            view.coordinate().transpose();

            if (facet.columnIndex === 0) {
              view.axis('country', {
                tickLine: null,
                line: null,
              });
              view.axis('value', false);
            } else {
              view.axis(false);
            }
            const color = getTypeColor(facet.columnValue);
            view
              .interval()
              .adjust('stack')
              .position('country*value')
              .color('type', [color, '#ebedf0'])
              .size(20)
              .label('value*type', (value, type) => {
                if (type === '2') {
                  return null;
                }
                const offset = (value < 30) ? 10 : -4;
                return {
                  offset,
                };
              });
            view.interaction('element-active');
          }
        });
        progress_chart.render();
      },

      //柱状图
      init_barChart() {
        //创建一个初始化的函数
        this.msg.barChart_msg = "酒店销量柱状图";
        const barChart = new this.$G2.Chart({
          container: "barChart",
          autoFit: true,
          height: 400
        })
        barChart.source(this.G2_data);
        barChart.scale('sales', {
          nice: true,
        });
        barChart.tooltip({
          showMarkers: false
        });
        barChart
          .interval()
          .position("genre*sold")
          .color("genre");
        this.chart = barChart
        this.chart.render()
      },

      // 折线散点图
      init_lineChart() {
        this.msg.lineChart_msg = "酒店人流量密度图";
        fetch_diamond(this.query)
          .then((data) => {
            const lineChart = new this.$G2.Chart({
              container: 'lineChart',
              autoFit: true,
              height: 400,
            });

            lineChart.data(data);
            lineChart.scale({
              carat: {
                alias: '克拉数',
                min: 0,
                max: 4,
                sync: true,
              },
              price: {
                alias: '人数',
                sync: true,
                nice: true,
              },
            });

            lineChart.point().position('carat*price').shape('circle');

            [
              'boxcar',
              'cosine',
              'epanechnikov',
              'gaussian',
              'quartic',
              'triangular',
              'tricube',
              'triweight',
              'uniform',
            ].forEach((method, i) => {

              const dv = new DataSet.View().source(data);
              dv.transform({
                type: 'kernel-smooth.regression',
                method,
                fields: ['carat', 'price'],
                as: ['carat', 'price'],
                bandwidth: 0.5,
                extent: [0, 4],
              });

              const view = lineChart.createView();
              view.data(dv.rows);
              view.axis(false);
              view
                .line()
                .position('carat*price')
                .color(view.getTheme().colors20[i]);
            });

            lineChart.render();
          });
      },

      //词云
      getTextAttrs(cfg) {
        return {
          ...cfg.style,
          fontSize: cfg.data.size,
          text: cfg.data.text,
          textAlign: 'center',
          fontFamily: cfg.data.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic'
        };
      },
      init_keywords() {
        this.msg.keywords_msg = "SJU酒店词云";
        let _this = this;
        // 给 point 注册一个词云的 shape
        this.$G2.registerShape('point', 'cloud', {
          draw(cfg, container) {
            const attrs = _this.getTextAttrs(cfg);
            const textShape = container.addShape('text', {
              attrs: {
                ...attrs,
                x: cfg.x,
                y: cfg.y
              }
            });
            if (cfg.data.rotate) {
              _this.$G2.Util.rotate(textShape, cfg.data.rotate * Math.PI / 180);
            }
            return textShape;
          }
        });
        fetch_keywords(this.query)
          .then(data => {
            const dv = new DataSet.View().source(data);
            const range = dv.range('value');
            const min = range[0];
            const max = range[1];
            const imageMask = new Image();
            imageMask.crossOrigin = '';
            imageMask.src = 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ';
            imageMask.onload = () => {
              dv.transform({
                type: 'tag-cloud',
                fields: ['name', 'value'],
                imageMask,
                font: 'Verdana',
                size: [600, 400], // 宽高设置最好根据 imageMask 做调整
                padding: 0,
                timeInterval: 5000, // max execute time
                rotate() {
                  let random = ~~(Math.random() * 4) % 4;
                  if (random === 2) {
                    random = 0;
                  }
                  return random * 90; // 0, 90, 270
                },
                fontSize(d) {
                  return ((d.value - min) / (max - min)) * (32 - 8) + 8;
                }
              });
              const keyw_chart = new this.$G2.Chart({
                container: 'keywChart',
                autoFit: false,
                width: 600, // 宽高设置最好根据 imageMask 做调整
                height: 400,
                padding: 0
              });
              keyw_chart.data(dv.rows);
              keyw_chart.scale({
                x: {
                  nice: false
                },
                y: {
                  nice: false
                }
              });
              keyw_chart.legend(false);
              keyw_chart.axis(false);
              keyw_chart.tooltip({
                showTitle: false,
                showMarkers: false
              });
              keyw_chart.coordinate().reflect();
              keyw_chart.point()
                .position('x*y')
                .color('text')
                .shape('cloud')
                .state({
                  active: {
                    style: {
                      fillOpacity: 0.4
                    }
                  }
                });
              keyw_chart.interaction('element-active');
              keyw_chart.render();
            };
          });



      },

      //动态图标
      init_AnimatBar() {
        this.msg.AnimatBar_msg = "中国GDP状态图";
        let _this = this;
        this.$G2.registerAnimation('label-appear', (element, animateCfg, cfg) => {
          const label = element.getChildren()[0];
          const coordinate = cfg.coordinate;
          const startX = coordinate.start.x;
          const finalX = label.attr('x');
          const labelContent = label.attr('text');

          label.attr('x', startX);
          label.attr('text', 0);

          const distance = finalX - startX;
          label.animate((ratio) => {
            const position = startX + distance * ratio;
            const text = (labelContent * ratio).toFixed(0);

            return {
              x: position,
              text,
            };
          }, animateCfg);
        });

        this.$G2.registerAnimation('label-update', (element, animateCfg, cfg) => {
          const startX = element.attr('x');
          const startY = element.attr('y');
          // @ts-ignore
          const finalX = cfg.toAttrs.x;
          // @ts-ignore
          const finalY = cfg.toAttrs.y;
          const labelContent = element.attr('text');
          // @ts-ignore
          const finalContent = cfg.toAttrs.text;

          const distanceX = finalX - startX;
          const distanceY = finalY - startY;
          const numberDiff = +finalContent - +labelContent;

          element.animate((ratio) => {
            const positionX = startX + distanceX * ratio;
            const positionY = startY + distanceY * ratio;
            const text = (+labelContent + numberDiff * ratio).toFixed(0);

            return {
              x: positionX,
              y: positionY,
              text,
            };
          }, animateCfg);


        });

        function handleData(source) {
          source.sort((a, b) => {
            return a.value - b.value;
          });

          return source;
        }

        fetch_AnimatBar(this.query)
          .then(data => {
            let count = 0;
            let AnimatBar_chart;
            let interval;

            function countUp() {
              if (count === 0) {
                AnimatBar_chart = new _this.$G2.Chart({
                  container: 'AnimatBar',
                  autoFit: true,
                  height: 400,
                  padding: [20, 60]
                });
                // @ts-ignore
                AnimatBar_chart.data(handleData(Object.values(data)[count]));
                AnimatBar_chart.coordinate('rect').transpose();
                AnimatBar_chart.legend(false);
                AnimatBar_chart.tooltip(false);
                // AnimatBar_chart.axis('value', false);
                AnimatBar_chart.axis('city', {
                  animateOption: {
                    update: {
                      duration: 1000,
                      easing: 'easeLinear'
                    }
                  }
                });
                AnimatBar_chart.annotation().text({
                  position: ['95%', '90%'],
                  content: Object.keys(data)[count],
                  style: {
                    fontSize: 40,
                    fontWeight: 'bold',
                    fill: '#ddd',
                    textAlign: 'end'
                  },
                  animate: false,
                });
                AnimatBar_chart
                  .interval()
                  .position('city*value')
                  .color('city')
                  .label('value', (value) => {
                    // if (value !== 0) {
                    return {
                      animate: {
                        appear: {
                          animation: 'label-appear',
                          delay: 0,
                          duration: 1000,
                          easing: 'easeLinear'
                        },
                        update: {
                          animation: 'label-update',
                          duration: 1000,
                          easing: 'easeLinear'
                        }
                      },
                      offset: 5,
                    };
                    // }
                  }).animate({
                    appear: {
                      duration: 1000,
                      easing: 'easeLinear'
                    },
                    update: {
                      duration: 1000,
                      easing: 'easeLinear'
                    }
                  });

                AnimatBar_chart.render();
              } else {
                AnimatBar_chart.annotation().clear(true);
                AnimatBar_chart.annotation().text({
                  position: ['95%', '90%'],
                  content: Object.keys(data)[count],
                  style: {
                    fontSize: 40,
                    fontWeight: 'bold',
                    fill: '#ddd',
                    textAlign: 'end'
                  },
                  animate: false,
                });
                // @ts-ignore
                AnimatBar_chart.changeData(handleData(Object.values(data)[count]));
              }

              ++count;

              if (count === Object.keys(data).length) {
                clearInterval(interval);
              }
            }

            countUp();
            interval = setInterval(countUp, 1200);
          });




      },

      
    }
  };
</script>


<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .title_table{
    text-align: center;
    color: #404040e3;
    font-size: 25px;
    font-weight: 400;
  }
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .todo-item {
    font-size: 14px;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }

  /* .schart {
    width: 100%;
    height: 300px;
  } */
</style>