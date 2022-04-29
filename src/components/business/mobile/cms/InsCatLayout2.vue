<template>
<div>
    <div class="catTree" v-if="catData.length">
        <el-tree :data="catData" :props="defaultProps" node-key="Id" @node-click="handleNodeClick" :current-node-key="catData[0] ? catData[0].Id : 0" :check-on-click-node="true"></el-tree>
    </div>
    <div class="cmsList" :class="{'hasTree': catData.length}">
        <ul>
            <li v-for="(cms,index) in cmsData" :key="index">
                <router-link :to="'/cms/content/'+cms.Id">
                    <div class="cover">
                        <img :src="cms.Cover" />
                    </div>
                    <div class="introduce">
                        <p class="title">{{cms.Title}}</p>
                        <p class="desc">{{cms.Desc}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCatLayout1 extends Vue {
    @Prop({ default: () => [] }) private catData!: object[]; // cms目录数据
    @Prop({ default: () => [] }) private cmsData!: object[]; // cms内容数据

    // 树形控件配置选项
    defaultProps: object = {
      children: 'Children',
      label: 'Name'
    };

    handleNodeClick (data) {
      console.log(data, 'handleNodeClick');
      this.$emit('changeCatSelect', data.Id);
    }
}
</script>

<style lang="less">
.catTree {
    .el-tree {
        border: 2px solid @base_color;
        border-radius: 5px;
        div[role="treeitem"] {
            .el-tree-node__content {
                height: auto;
                padding: 10px;

                &:hover {
                    background-color: unset;
                }
            }

            &.is-current {
                >.el-tree-node__content {
                    background-color: @base_color;
                    color: #fff;
                }
            }
        }

        > div[role="treeitem"] {
            border-bottom: 2px solid @base_color;

            &:last-child {
                border-bottom: 0;
            }
        }
    }
}
</style>

<style scoped lang="less">
.cmsList {
    width: 95%;
    margin: 2rem auto;

    li {
        border-bottom: 1px solid fade(@base_color,50%);

        &:last-child {
            border-bottom: 0;
        }

        a {
            display: flex;
            justify-content: space-between;
            padding: 1.5rem 1rem;

            .cover {
                width: 25%;
                img {
                    max-width: 100%;
                }
            }

            .introduce {
                width: 70%;

                .title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: #000;
                }

                .desc {
                    font-size: 1.2rem;
                    color: #535353;
                }
            }
        }

        &:first-child {
            a {
                padding-top: 0;
            }
        }
    }
}
</style>
