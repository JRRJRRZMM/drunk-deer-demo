<script setup>
import { ref, watch } from "vue";
import '@/assets/key.css'
//第一步 导入分装的键盘数据
import keyBoardList from "@/utils/keylist";

//第二步
//创建一个seTselected方法 用来遍历keyBoardList中selected的值为false background值为空
const seTselected = () => {
    // 为每一个数组添加一个selected，background，selectBackground属性
    //然后创建一个新数组 并且利用fill 填充固定值
    keyBoardList.value = keyBoardList.value.map(item => {
        return {
            ...item,
            selected: Array(item.name.length).fill(false),
            background: Array(item.name.length).fill('#615d5d'),
            selectBackground: Array(item.name.length).fill('#615d5d')
        };
    });
}
seTselected()
//第三步 
const selectedColor = ref('#000000') // 声明颜色选择器的默认颜色
const selectedKey = ref(false) // 默认颜色选择器不展开
//第四步 
//点击对应的键位 根据某一个组item 某一组下标num 和某一项的下标index
const btnKeySelect = (index, num) => {
    //取seleted的反值  可以确定是否选中 
    keyBoardList.value[num].selected[index] = !keyBoardList.value[num].selected[index]

    //这一步其实就是三目运算符各种判断
    //判断默认选中的背景色selectBackground == 如果当前selected选中则为#000000 否则 再去判断实际背景色是否等于一开始给的默认'#615d5d'  如果等于 就还是#615d5d 否则 说明已经修改了实际背景色 则赋值给selectBackground 作页面渲染
    keyBoardList.value[num].selectBackground[index] = keyBoardList.value[num].selected[index] ? '#000000' : keyBoardList.value[num].background[index] !== '#615d5d' ? keyBoardList.value[num].background[index] : '#615d5d'

    //显示颜色选择器
    selectedKey.value = true
}
//监听整个键位是否有未点击的 如果有则关闭颜色选择器
watch(
    () => keyBoardList.value,
    (newList) => {
        //是否返回有false

        if (isAllSelectedFalse(newList)) {
            //所有的键位没有被选中
            //关闭颜色选择器
            selectedKey.value = false
        } else {

        }
    },
    { deep: true }
);
const isAllSelectedFalse = (list) => list.every(item => item.selected.every(selected => !selected));
//监听颜色选择器中的颜色变化
//实际打开了选择器
const focusColor = () => {
    watch(selectedColor, (newList) => {
        //做循环 取出selected为true的当前项  
        keyBoardList.value.forEach((item) => {
            for (var i = 0; i < item.selected.length; i++) {
                if (item.selected[i]) {
                    //selected为true  则把实际背景background 和 选中的背景做赋值修改selectBackground
                    item.background[i] = newList
                    item.selectBackground[i] = newList
                }
            }

        });
    })
}

//当颜色选择器失去焦点  则已经没有选中项 因为已经修改了背景色 
const blurColor = () => {
    keyBoardList.value.forEach((item) => {
        item.selected = item.selected.map((item) => false);
    });
}

//重置样式
const reset = () => {
    seTselected()
}

</script>

<template>
    <div class="keyboard">
        <div class="keyflex">
            <button :class="['key', item]" :style="{ background: keyBoardList[0].background[index] }"
                v-for="(item, index) in keyBoardList[0].name" :key="index" @click="btnKeySelect(index, 0)">{{
                    item
                }}</button>
        </div>
        <div class="keyflex">
            <button :class="['key', item]" v-for="(item, index) in keyBoardList[1].name" :key="index"
                @click="btnKeySelect(index, 1)" :style="{ background: keyBoardList[1].selectBackground[index] }">{{ item
                }}</button>
        </div>
        <div class="keyflex">
            <button :class="['key', item, item === 'Num+' ? 'NumRight' : '']"
                v-for="(item, index) in keyBoardList[2].name" :key="index" @click="btnKeySelect(index, 2)"
                :style="{ background: keyBoardList[2].selectBackground[index] }">{{ item
                }}</button>
        </div>
        <div class="keyflex">
            <button :class="['key', item]"
                :style="{ background: keyBoardList[3].selectBackground[index] }, item === 'Enter' ? 'width:125px' : ''"
                v-for="(item, index) in keyBoardList[3].name" :key="index" @click="btnKeySelect(index, 3)">{{ item
                }}</button>
        </div>
        <div class="keyflex">
            <button :class="['key', item, item === 'Enter' ? 'EnterRight' : '']"
                v-for="(item, index) in keyBoardList[4].name" :key="index" @click="btnKeySelect(index, 4)"
                :style="{ background: keyBoardList[4].selectBackground[index] }">{{ item
                }}</button>
        </div>
        <div class="keyflex">
            <button :class="['key', item,]" v-for="(item, index) in keyBoardList[5].name" :key="index"
                @click="btnKeySelect(index, 5)" :style="{ background: keyBoardList[5].selectBackground[index] }">{{ item
                }}</button>
        </div>
    </div>
    <div v-show="selectedKey">
        <input type="color" v-model="selectedColor" @focus="focusColor" @blur="blurColor">
    </div>
    <div class="reset">
        <button @click="reset">重置</button>
    </div>
</template>

<style scoped lang="less"></style>