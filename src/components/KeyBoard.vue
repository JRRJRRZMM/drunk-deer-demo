<script setup>
import { ref, watch } from "vue";
//第一步 导入分装的键盘数据 和样式
import '@/assets/key.css'
import Keyboard from "@/utils/keylist";
const selectedColor = ref('#000000') // 声明颜色选择器的默认颜色
const selectedKey = ref(false) // 默认颜色选择器不展开
//第二步  点击键盘某一键位  做选中，背景色等处理
const btnKeySelect = (item) => {
    item.selected = !item.selected
    item.selectBackground = item.selected ? '#000000' : item.background !== '#615d5d' ? item.background : '#615d5d'
    //显示颜色选择器
    selectedKey.value = true
}
//第三步监听整个键位是否有未点击的 如果有则关闭颜色选择器
watch(
    Keyboard,
    (newList) => {
        //是否返回有false
        const allSelectedFalse = newList.every(key => !key.selected);
        if (allSelectedFalse) {
            selectedKey.value = false
        }
    },
    { deep: true }
);

//第四步监听颜色选择器中的selectedColor变化
const keyboardTrue = (newList) => {
    //做循环 取出selected为true的当前项  
    Keyboard.value.forEach((item) => {
        if (item.selected) {
            //selected为true  则把实际背景background 和 选中的背景做赋值修改selectBackground
            item.background = newList
            item.selectBackground = newList
        }
    });
}
const focusColor = () => {
    watch(selectedColor, (newList) => {
        keyboardTrue(newList)
    })
}
focusColor()
//第五步当颜色选择器失去焦点 统一做不选中处理 
const blurColor = () => {
    Keyboard.value.forEach((item) => {
        item.selected = false;
    });
}

//第六步重置样式
const reset = () => {
    seTselected()
}
const seTselected = () => {
    Keyboard.value.forEach((item) => {
        item.selected = false;
        item.background = item.selectBackground = '#615d5d'
    });
}
</script>

<template>
    <div class="keyboard">
        <div class="keyflex">
            <button
                :class="['key', item.name, item.name + index, item.name === 'Num+' ? 'NumRight' : '', item.name + index === 'Enter94' ? 'EnterRight' : '']"
                :style="{ background: item.selectBackground }" v-for="(item, index) in Keyboard " :key="index"
                @click="btnKeySelect(item)">{{
                    item.name
                }}</button>
        </div>
    </div>
    <div v-show="selectedKey">
        <input type="color" v-model="selectedColor" @blur="blurColor">
    </div>
    <div class="reset">
        <button @click="reset">重置</button>
    </div>
</template>

<style scoped lang="less"></style>