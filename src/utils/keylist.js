import { ref } from 'vue'
//第一步
//定义键盘6列
//name 键位名称
//background 实际背景色 要保存的
//selectBackground 默认选中的背景色 不保存

export default ref([{
    name: ['Esc', 'none', 'F1', 'F2', 'F3', 'F4', 'none1', 'F5', 'F6', 'F7', 'F8', 'none1', 'F9', 'F10', 'F11', 'F12', 'none1', 'Prt', 'Pau', 'Scrl', 'none1', 'A1', 'A2', 'A3', 'Mode'],
    selected: [], background: [], selectBackground: []
}, {
    name: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'none1', 'Ins', 'Hom', 'PgUp', 'none1', 'NumLock', 'Num/', 'Num*', 'Num-'],
    selected: [], background: [], selectBackground: []
}, {
    name: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'none1', 'Del', 'End', 'PgDn', 'none1', 'Num7', 'Num8', 'Num9', 'Num+'],
    selected: [], background: [], selectBackground: []
},
{
    name: ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter', 'none', 'none1', 'none1', 'none1', 'none', 'none1', 'Num4', 'Num5', 'Num6',],
    selected: [], background: [], selectBackground: []
}, {
    name: ['L-Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'R-Shift', 'none1', 'none', '⬆', 'none', 'none1', 'Num1', 'Num2', 'Num3', 'Enter'],
    selected: [], background: [], selectBackground: []
}, {
    name: ['Ctrl', 'Cmd', 'Opt', 'Spacebar', 'Opt', 'Cmd', 'Fn1', 'Ctrl', 'none1', '⬅', '⬇', '➡', 'none1', 'Num0', 'Num.'],
    selected: [], background: [], selectBackground: []
}])