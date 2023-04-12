<template>
    <li class="ReSearchItem">
        <div class="category" :class="{'titleBg': !isOpen}">
          <div class="InnerBox">
            {{searchGroup.Name}}
              <i class="el-icon-minus topA"  @click="isOpen = !isOpen" v-if="!isOpen"></i>
              <i class="el-icon-plus topA" @click="isOpen = !isOpen" v-else></i>
          </div>
        </div>
          <transition name="fade">
          <ul :class="{'selectBg': !isOpen,'open':isOpen}">
            <li>
                <input type="checkbox" :id="searchGroup.Name+'-All'" v-model="isAll" @click="checkAll($event,searchGroup)"  style="display:none;">
                <label :for="searchGroup.Name+'-All'" >{{$t('Message.All')}}</label>
            </li>
            <li v-for="(child, index2) in (searchType === 1 ? searchGroup.AttrValues : searchType === 2 ? searchGroup.Children : [])" :key="index2" class="prentLi">
                <input type="checkbox" :id="child.Name+index2" :value="child.Id" v-model="checkedValue" @click="selectAttr(searchGroup)"  style="display:none;">
                <label :for="child.Name+index2">{{child.Name}}</label>
                 <i class="el-icon-plus clickBtn" v-if="child.Children.length > 0"></i>
                <ul v-if="child.Children.length > 0" class="childUl">
                  <li v-for="(child2,index3) in  (searchType === 1 ? child.AttrValues : searchType === 2 ? child.Children : [])" :key="index3">
                        <input type="checkbox" :id="child2.Name+index3" :value="child2.Id" v-model="checkedValue" @click="selectAttr(searchGroup)" style="display:none;">
                        <label :for="child2.Name+index3">{{child2.Name}}</label>
                  </li>
                </ul>
            </li>
        </ul>
        </transition>
    </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
export interface attrItem {
  Id: number,
  Vals: number[]
}
@Component
export default class InsAdvancedSearch extends Vue {
    @Prop({ default: () => {} }) private searchGroup!: any;
    @Prop({ default: () => [] }) private defaultSelected!: number[];
    @Prop({ default: 1 }) private searchType!: number; // 搜索数据类型（1 => 产品属性， 2 => 产品目录）

    isOpen: boolean = false; // 是否展开
    isAll: boolean = false; // 是否全选
    checkedValue: number[] = []; // 选中的产品属性值
    selectedAttrs: attrItem[] = []; // 选中的产品属性值
    childIsOpen:boolean = false;
    //  全选（产品属性）
    checkAll (e, attr) {
      console.log('checkAll');
      let a = e.target.checked;
      if (e.target.checked) {
        this.checkedValue = [];
        if (this.searchType === 1) {
          attr.AttrValues.forEach(element => {
            this.checkedValue.push(element.Id);
          });
          this.$emit('changeSelect', attr.Id, this.checkedValue);
        } else if (this.searchType === 2) {
          console.log('产品目录全选');
          attr.Children.forEach(element => {
            this.checkedValue.push(element.Id);
          });
          this.$emit('changeSelect', attr.Id, this.checkedValue);
        }
      } else {
        this.checkedValue = [];
        this.$emit('changeSelect', attr.Id, this.checkedValue);
      }
    }

    //  单属性选择（产品属性）
    selectAttr (item) {
      console.log(item, '单属性选择（产品属性）');
      setTimeout(() => {
        if (this.searchType === 1) {
          if (this.checkedValue.length !== this.searchGroup.AttrValues.length) {
            this.isAll = false;
          } else {
            this.isAll = true;
          }
          this.$emit('changeSelect', item.Id, this.checkedValue);
        } else if (this.searchType === 2) {
          console.log(item.Id, '改变的产品目录id');
          if (this.checkedValue.length !== this.searchGroup.Children.length) {
            this.isAll = false;
          } else {
            this.isAll = true;
          }
          this.$emit('changeSelect', item.Id, this.checkedValue);
        }
      }, 1);
    }

    created () {
      $('.clickBtn').on('click', function() {
        $(this).parents('.prentLi').find('.childUl').toggle();
        $(this).toggleClass('el-icon-minus');
      });
      if (this.defaultSelected.length) {
        if (this.searchType === 1) {
          if (this.defaultSelected.length === this.searchGroup.AttrValues.length) {
            this.isAll = true;
          }
        } else if (this.searchType === 2) {
          if (this.defaultSelected.length === this.searchGroup.Children.length) {
            this.isAll = true;
          }
        }
        this.checkedValue = this.defaultSelected;
      }
    }
}
</script>
<style scoped lang="less">
.titleBg {
  background: #c6b17b;
  color: #fff;
}
.selectBg {
  background: #5a5548;
  color: #fff;
}
.ReSearchItem {
      .colorstyle {
        color: @base_color;
      }
      .viewall {
        border: 1px solid @base_color;
        border-radius: 2rem;
        margin-top: 1rem;
        label {
          color: @base_color!important;
        }
      }
      .category {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-self: start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        height: 3.5rem;
        line-height: 3.5rem;
        font-family: 'PoppinsBold', 'Microsoft YaHei';
        .InnerBox {
          width: 90%;
          margin: 0 auto;
          position: relative;
          font-size: 20px;
          color: #fff;
            i{
              position: absolute;
              right: 0px;
              top: 1rem;
              font-size: 1.4rem;
              cursor: pointer;
            }
        }
    }

     >ul {
       transition: all 3s;
        >li {
            width: 90%;
            padding-left: 5%;
            padding-right: 5%;
            padding-top: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #2c2d31;
            position: relative;
            >ul{
                display:none;
                margin-top: 10px;
              >li{
                padding-top: 10px;
                padding-bottom: 10px;
                input[type="checkbox"]:checked {
                    border: 1px solid #fefefe;
                    background-image: url('/images/mobile/checked.png'); /*复选框的背景图*/
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: auto;

                    &+label {
                        text-decoration: underline;
                        color: #c6b17b;
                    }
                }
              }
            }
            & .childIsOpen {
                display: none;
                transition: all 3s;
            }
            input[type="checkbox"] {
                width: 18px;
                height: 18px;
                background-color: #fff;
                -webkit-appearance:none;
                border: 1px solid #cccccc;
                outline: none;
            }

            input[type="checkbox"]:checked {
                border: 1px solid #fefefe;
                background-image: url('/images/mobile/checked.png'); /*复选框的背景图*/
                background-repeat: no-repeat;
                background-position: center;
                background-size: auto;

                &+label {
                    text-decoration: underline;
                    color: #c6b17b;
                }
            }

            label {
            font-size: 18px;
            color: #fefefe;
            width: 90%;
            margin: 0 auto;
            cursor: pointer;
              &:hover {
                  color: #c6b17b;
                  text-decoration: underline;
                  cursor: pointer;
              }
            }
        }

        .topA {
            position: absolute;
            font-size: 26px;
            right: 18px;
            top: 18px;
            cursor: pointer;
        }
        .clickBtn {
            position: absolute;
            font-size: 26px;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }
        &.open {
                display: none;
                transition: all 3s;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
