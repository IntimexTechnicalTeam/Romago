<template>
  <div id="container" class="EventList">
    <div class="top-row">
      <a href="javascript:;" class="preDay" @click="goPreDay"><i class="el-icon-arrow-left"></i><span>Previous Day</span></a>
      <p class="date">{{currentDate}}</p>
      <a href="javascript:;" class="nextDay" @click="goNextDay"><span>Next Day</span><i class="el-icon-arrow-right"></i></a>
      <!-- <el-button icon="el-icon-arrow-left" @click="goPreDay">Previous Day</el-button>
      <el-button @click="goNextDay">Next Day<i class="el-icon-arrow-right"></i></el-button> -->
    </div>

    <div class="list" v-if="eventList.length">
      <ul>
        <li v-for="(event, index) in eventList" :key="index">
          <div class="event-top">
            <p class="event-title">{{event.title}}</p>
            <a href="javascript:;" class="more" @click="goDetail(event)">{{$t('Calendar.KnowMore')}}</a>
          </div>
          <div class="desc">
            <p class="time"><span>{{$t('Calendar.Time')}}:</span> {{event.start}} ~ {{event.end}}</p>
            <p class="venue"><span>{{$t('Calendar.Venue')}}:</span> {{event.Venue}}</p>
          </div>
          <!-- <div>
            <p>{{event.title}}</p>
            <p>日期: {{currentDate}}</p>
          </div>
          <a href="javascript:;" class="more" @click="goDetail(event.id)">了解更多</a> -->
        </li>
      </ul>
    </div>

    <div class="noList" v-else>
      <p>{{$t('Calendar.NoEvent')}}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {

  }
})
export default class EventList extends Vue {
    preDay: string = '';
    nextDay: string = '';
    eventList: object[] = [];

    // 前一天
    goPreDay () {
      let pre = new Date(new Date(this.currentDate).getTime() - 24 * 60 * 60 * 1000); // 前一天
      this.preDay = this.FormatDate(pre);
      this.$router.push({ name: 'eventList', params: { date: this.preDay } });
    }

    // 后一天
    goNextDay () {
      let next = new Date(new Date(this.currentDate).getTime() + 24 * 60 * 60 * 1000); // 后一天
      this.nextDay = this.FormatDate(next);
      this.$router.push({ name: 'eventList', params: { date: this.nextDay } });
    }

    // 日期格式化（YYYY-MM-DD）
    FormatDate (date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let result = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
      return result;
    }

    // 获取当天活动列表
    getEvents () {
      let param = this.currentDate.split('-');
      this.$Api.calendar.getListByCond({ Year: parseInt(param[0]), Month: parseInt(param[1]), Day: parseInt(param[2]) }).then(result => {
        if (result.Succeeded) {
          this.eventList = result.ReturnValue.Data || [];
        } else {
          this.$message(result.Message);
        }
      });
    }

    // 了解更多
    goDetail (event) {
      if (event.FormUrl) {
        if (event.IsNewWindow) {
          window.open(event.FormUrl);
        } else {
          window.location.href = event.FormUrl;
        }
      } else {
        this.$router.push({ name: 'eventDetail', params: { id: event.id } });
      }
    }

    get currentDate () {
      return this.$route.params.date;
    }

    mounted () {
      this.getEvents();
    }

    @Watch('currentDate', { deep: true })
    onDayChange () {
      this.getEvents();
    }
}
</script>
<style scoped lang="less">
.EventList {
  width: 1200px;
  margin:  0 auto;
  padding: 50px 10px 100px;

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .date {
      font-size: 18px;
    }

    a {
      display: inline-block;
      padding: 10px 15px;
      background-color: fade(@base_color,90%);
      border-color: fade(@base_color,90%);
      border-radius: 5px;
      color: #fff;
      font-size: 16px;

      i.el-icon-arrow-left {
        margin-right: 5px;
      }

      i.el-icon-arrow-right {
        margin-left: 5px;
      }
    }
  }

  .list {
    li {
      font-size: 16px;
      padding: 25px;
      margin-bottom: 30px;
      border-radius: 5px;
      box-shadow: 0px 0px 5px #dadada;

      &:last-child {
        margin-bottom: 0;
      }

      .event-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 15px;
        .event-title {
          font-size: 18px;
        }
      }

      .desc {
        padding: 15px 0;
        p {
          padding: 10px 0;
          font-size: 17px;
          display: flex;

          span {
            margin-right: 15px;
            flex-shrink: 0;
          }
        }
      }

      .more {
        font-size: 16px;
        background-color: fade(@base_color,20%);
        color: @base_color;
        display: block;
        padding: 8px 20px;
        border-radius: 30px;
      }
    }
  }

  .noList {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 5px #dadada;

    p {
      font-size: 20px;
    }
  }
}
</style>
