// ==UserScript==
// @name              网页高亮关键字
// @name:zh-CN        网页高亮关键字
// @namespace         https://github.com/ChinaGodMan/UserScripts
// @version           1.1.2.72
// @description       对网页上的文字进行高亮显示，如果对你有帮助，可以随意修改使用
// @description:zh-CN 对网页上的文字进行高亮显示，如果对你有帮助，可以随意修改使用
// @author            zjs
// @include           *
// @grant             GM_addStyle
// @grant             GM_registerMenuCommand
// @grant             GM_setValue
// @grant             GM_getValue
// @require           https://cdn.jsdelivr.net/npm/vue@2.6.1/dist/vue.min.js
// @icon              data:image/png;base64,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
// @iconbak           https://github.com/ChinaGodMan/UserScripts/raw/main/docs/icon/Scripts%20Icons/icons8-mark-96.png
// @homepageURL       https://github.com/ChinaGodMan/UserScripts
// @license           MIT
// @downloadURL       
// @updateURL         
// ==/UserScript==
(function () {


    // 初始化
    function initialize() {
        let defaultWords = {
            'key_123': {
                limit: [],//'baidu'
                'info': '汉字测试',
                'words': ['我', '的', '关键字'],
                'color': '#85d228',
                'textcolor': '#3467eb'
            }
        }
        // 设置关键字默认值
        if (GM_getValue('key') === undefined || Object.keys(GM_getValue('key')).length == 0) {
            GM_setValue('key', defaultWords)
            // GM_setValue("key",this.defaultWords);
        }

        if (GM_getValue('word_stroke_dis') === undefined) {
            GM_setValue('word_stroke_dis', false)
        }

        let cache = GM_getValue('key')
        let need_save = false
        Object.keys(cache).forEach(key => {
            let defult = {
                limit: [],
                info: "",
                words: [],
                color: '#85d228',
                textcolor: '#3467eb'
            }
            Object.keys(defult).forEach((key2) => {
                if (cache[key][key2] === undefined) {
                    // console.log(key2)
                    cache[key][key2] = defult[key2]
                    need_save = true
                }
            })
        })
        if (need_save == true) {
            // console.log("need_save defult");
            key_save('key', cache)
        }
    }
    /**
     * @description: 遍历找出所有文本节点
     * @param {*} node
     * @return {*} 节点map
     */
    function textMap(node) {
        // 存储文本节点
        let nodeMap = new Map()

        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, (textNode) => {
            if (textNode.parentElement.nodeName === 'SCRIPT' |
                textNode.parentElement.nodeName === 'script' |
                textNode.parentElement.nodeName === 'style' |
                textNode.parentElement.nodeName === 'STYLE' |
                textNode.parentElement.className === 'mt_highlight' |
                document.querySelector('#mt_seting_box').contains(textNode)
            ) {
                return NodeFilter.FILTER_SKIP
            }

            if (textNode.data.length < 20) {
                return textNode.data.replace(/[\n \t]/g, '').length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }

            return NodeFilter.FILTER_ACCEPT
        })

        while ((textNode = walker.nextNode())) {
            nodeMap.set(textNode, textNode.data)
        }

        return nodeMap
    }
    
    function get_name(str)
    {
      // 添加要筛选的关键字
        // const [letters, numbers] = word.toLowerCase().split(/-|\d+/).filter(Boolean);
        const letters = str.toLowerCase().match(/[a-zA-Z]+/g);
        const numPart = str.match(/\d+/g); // 提取数字部分
        if (letters && numPart)
        {
            return `${letters[0]}-?${numPart[0]}`;
        }
        return str
    }


    // 高亮
    class HIGHTLIGHT {

        // 需要高亮的关键字
        /**通过规则新建关键字列表，解决一个关键字会存在多个分类中
         * 将{
         *  key1{
         *      words:[word1,word2]
         *      },
         *  key2{
         *      words:[word3,word4]
         *      }
         * }
         * 转换为map{
         *      word1:key1
         *      word2:key1
         *      word4:key2
         *      word3:key2
         * }
         * @description:
         * @return {map}map{
         *
         * classesKey=>分类标签,类型string
         *
         * infoList=>提示词,数组["汉字","字符"]
         *
         * }
         */
        static words() {

            // 转换
            let newWords = new Map
            Object.keys(GM_getValue('key')).forEach(classesKey => {

                let info = GM_getValue('key')[classesKey].info
                let words = GM_getValue('key')[classesKey].words
                let color = GM_getValue('key')[classesKey].color
                let limit = GM_getValue('key')[classesKey].limit
                let textcolor = GM_getValue('key')[classesKey].textcolor

                words.forEach(word => {
                    let infoList = []

                    // 检测是否被多个类目包含，被多个类目包含的关键字会有对应类目的信息
                    if (newWords.get(word + '')) {
                        infoList = newWords.get(word + '').infoList
                        infoList.push(info)
                    } else {
                        infoList = [info]
                    }
                    const regex = get_name(word); // 构建正则表达式

                    newWords.set(regex + '', {
                        classesKey,
                        infoList: infoList,
                        textcolor,
                        color,
                        limit
                    })
                })
            })

            // console.log(newWords);
            return newWords
        }

        // 检测正则
        static reg() {
            let url = window.location.href
            let doIt = false
            let wordsList = []
            let words = this.words()
            words.forEach((value, word) => {
                // console.log(value,word);
                // 过滤不匹配的
                if (value.limit.length == 0 || url.match(new RegExp(`${value.limit.join('|')}`, 'g'))) {
                    
                    const regex = get_name(word); // 构建正则表达式
                    // const regex = new RegExp(regexPattern, 'i');
                    // console.log(regex);
                    wordsList.push(regex)
                }
            })
            // 过滤后还需不需要检测
            wordsList.length ? doIt = true : doIt = false
            // console.log(doIt,wordsList);
            return {
                rule: new RegExp(`(${wordsList.join('|')})`, 'gi'),
                doIt
            }
        }


        // 高亮css
        static highlightStyle = `
                        .mt_highlight{
                            background-color: rgb(255, 21, 21);
                            border-radius: 2px;
                            box-shadow: 0px 0px 1px 1px rgba(0, 0, 0,0.1);
                            cursor: pointer;
                            color: white;

                            padding: 1px 1px;
                        }
                        `

        /**
         * @description: 返回需要被高亮的节点map{textNode,未来会被修改成目标的值}
         * @param {map} nodeMap
         * @return {void}
         */
        static highlight(nodeMap) {
            let words = this.words()
            let reg = this.reg()
            // 没有要高亮的关键字时不执行
            if (words.size && reg.doIt) {
                nodeMap.forEach((value, node) => {
                    // 正则检测是否符合规则

                    let newInnerHTML = value.replace(reg.rule, (word) => {
                        const regex = get_name(word); // 构建正则表达式

                        let classesKey = words.get(regex).classesKey
                        let infoList = words.get(regex).infoList
                        let color = words.get(regex).color
                        let textcolor = words.get(regex).textcolor

                        // 返回新节点模板
                        return `<span class="mt_highlight" classesKey="${classesKey}"  title="${infoList.join('\n')}" style="background: ${color}; color:${textcolor};">${word}</span>`
                    })
                    // 是否检测出了
                    if (value != newInnerHTML) {
                        // 节点替换
                        let newNode = document.createElement('span')
                        newNode.innerHTML = newInnerHTML
                        node.parentElement.replaceChild(newNode, node)
                        // console.log(node.parentElement.innerHTML);
                        // node.parentElement.innerHTML = newInnerHTML
                        // 点击复制
                        newNode.addEventListener('click', (e) => {
                            navigator.clipboard.writeText(e.target.innerText)
                        })
                        newNode.addEventListener('contextmenu', menu_del_mouseup_loose_fun);
                    }
                })
            }

        }

    }

    /**
     * @description: 动态检测新节点，并执行高亮
     * @return {*}
     */
    function watch() {
        // 选择需要观察变动的节点
        const targetNode = document.body

        // 观察器的配置（需要观察什么变动）
        const config = { attributes: false, childList: true, subtree: true, characterData: true }

        // 当观察到变动时执行的回调函数
        const callback = function (mutationsList, observer) {
            let nodeMap = new Map
            setTimeout(() => {
                mutationsList.forEach(node => { nodeMap.set(node.target) })
                nodeMap.forEach((value, node) => {
                    doOnce(node)
                })
            }, 1)
        }

        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(callback)

        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config)
    }


    // gui
    class GUI {
        // 模板
        static setingTemplate = String.raw`
        <div class="seting_box" v-show="showSeting">
            <!-- 顶部选项 -->
            <div class="option_box">
                <div @click="config_in_add">导入添加</div>
                <div @click="config_in">导入覆盖</div>

                <input type="file" class="config_file" accept=".json,.txt" @change="file_read($event)">

                <div @click="config_out">导出配置文件</div>
                <div @click="refresh">刷新</div>
                <div id="word_stroke" @click="word_stroke">划词关闭</div>
                <div class="close_seting" @click="close_seting">关闭</div>
            </div>

            <!-- 规则视图 -->
            <div class="rule_list_box" v-for="(value,key) in rule">

                <!-- 展示视图 -->
                <div class="show_box" v-show="!edit[key]" >

                    <!-- 左边 -->
                    <div class="show_left">

                        <!-- 网站作用域 -->
                        <div class="words_box"  @click="editOn(key)">
                            <span v-for="(word) in value.limit" :style="{'background': value.color, 'color': value.textcolor}">
                                {{word}}
                            </span>
                            <!-- 没有限制 -->
                            <span v-if="! value.limit.length" :style="{'background': value.color, 'color': value.textcolor}">
                                不限制
                            </span>
                        </div>

                        <!-- 类目 -->
                        <div class="info_box" @click="editOn(key)" :style="{'background': value.color, 'color': value.textcolor}">
                            {{value.info}}
                        </div>
                        <!-- 关键字 -->
                        <div class="words_box"  @click="editOn(key)">
                            <span v-for="(word) in value.words" :style="{'background': value.color, 'color': value.textcolor}">
                                {{word}}
                            </span>
                        </div>
                    </div>

                    <!-- 分割线 -->
                    <div class="line"></div>

                    <!-- 修改颜色和删除 -->
                    <div class="rule_set_box">
                        <div class="color_box">
                            <input type="color"
                                :colorKey="key"
                                v-model="value.color"
                                @change="colorChange(key,value.color,value.textcolor)"
                            >
                        </div>

                        <div class="textcolor_box">
                            <input type="color"
                                :colorKey="key"
                                v-model="value.textcolor"
                                @change="colorChange(key,value.color,value.textcolor)"
                            >
                        </div>
                        <div class="del" @click.stop="del_key(key)">删除</div>
                    </div>
                </div>

                <!-- 编辑视图 -->
                <div class="eidt_box" v-show="edit[key]">
                    <div class="eidt_left">
                        <!-- 修改作用域 -->
                        <textarea :limit_key="key" :value="value.limit.toString().replace(/,/g,' ')"></textarea>
                        <!-- 修改类目信息 -->
                        <textarea :info_key="key" :value="value.info"></textarea>
                        <!-- 修改关键字 -->
                        <textarea :words_key="key" :value="value.words.toString().replace(/,/g,' ')"></textarea>
                    </div>

                    <!-- 分割线 -->
                    <div class="line"></div>

                    <!-- 确定 取消 -->
                    <div class="eidt_right">
                        <div class="del" @click="editOff(key)">取消</div>
                        <div class="del" @click="ruleUpdate(key)">确定</div>
                    </div>

                </div>

            </div>

            <!-- 添加新规则 -->
            <div class="add" @click="add_key">+</div>
        </div>

        `
        // 模板css
        static setingStyle = `
        body {
            --mian_width: 480px;
            --mian_color: #189fd8;
            --radius: 5px;
            --info_color: #eaeaea;
            --font_color: #676767;
          }
          .seting_box {
            width: 500px;
            max-height: 800px;
            overflow: auto;
            background: white;
            border-radius: 5px;
            position: fixed;
            transform: translate(-50%, 0);
            top: 50px;
            left: 50%;
            border: 1px solid rgba(0, 0, 0, 0.1);
            padding: 15px 5px;
            flex-direction: column;
            align-items: center;
            z-index: 10000;
            display: flex;
            box-shadow: 0 1px 5px 5px rgba(0, 0, 0, 0.1);
          }
          .option_box {
            width: var(--mian_width);
            display: flex;
            justify-content: space-between;
          }
          .option_box div {
            display: flex;
            height: 20px;
            align-items: center;
            padding: 5px 10px;
            background: var(--mian_color);
            color: white;
            border-radius: var(--radius);
            cursor: pointer;
          }
          .rule_list_box {
            width: var(--mian_width);
            border-radius: var(--radius);
            margin-top: 10px;
            padding: 5px 0px;
            box-shadow: 0 0 5px 0px #e2e2e2;
            cursor: pointer;
          }
          .rule_list_box .show_box {
            display: flex;
            justify-content: space-between;
          }
          .rule_list_box .show_box .show_left {
            width: 410px;
          }
          .rule_list_box .show_box .show_left > div {
            margin-top: 5px;
          }
          .rule_list_box .show_box .show_left > div:nth-child(1) {
            margin-top: 0px;
          }
          .rule_list_box .show_box .show_left .info_box {
            margin-left: 5px;
            margin-right: 5px;
            padding: 2px 5px;
            min-height: 22px;
            color: white;
            border-radius: var(--radius);
            background-color: var(--mian_color);
            display: flex;
            align-items: center;
          }
          .rule_list_box .show_box .show_left .words_box {
            margin-top: 0px;
            /* border: 1px solid black; */
            min-height: 20px;
            display: flex;
            flex-wrap: wrap;
          }
          .rule_list_box .show_box .show_left .words_box span {
            background-color: var(--info_color);
            color: white;
            padding: 2px 5px;
            border-radius: var(--radius);
            margin-left: 5px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            height: 20px;
          }
          .rule_list_box .show_box .rule_set_box {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0px 5px;
          }
          .rule_list_box .show_box .rule_set_box .color_box  .textcolor_box {
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .rule_list_box .show_box .rule_set_box .color_box   .textcolor_box input {
            width: 50px;
            height: 25px;
            border-radius: var(--radius) !important;
            padding: 0px;
          }
          .rule_list_box .eidt_box {
            padding: 0px 5px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .rule_list_box .eidt_box .eidt_left {
            width: 400px;
          }
          .rule_list_box .eidt_box .eidt_left textarea {
            width: 100% !important;
            min-height: 30px !important;
            border: none;
            outline: none;
            color: var(--font_color);
            background-color: var(--info_color);
            border-radius: var(--radius);
            margin-top: 5px;
            padding: 5px;
          }
          .rule_list_box .eidt_box .eidt_left textarea:nth-child(1) {
            margin-top: 0px;
          }
          .rule_list_box .eidt_box .eidt_right {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
          .rule_list_box .line {
            width: 1px;
            background-color: rgba(0, 0, 0, 0.1);
          }
          .rule_list_box .del {
            background-color: var(--mian_color);
            color: white;
            border-radius: var(--radius);
            padding: 0px 10px;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .add {
            width: var(--mian_width);
            height: 30px;
            background: #189fd8;
            color: white;
            display: flex;
            justify-content: center;
            border-radius: 5px;
            padding: 5px 0px;
            margin-top: 10px;
            align-items: center;
            font-size: 35px;
            font-weight: 100;
            cursor: pointer;
          }
          .bt {
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
          input {
            border: none;
            padding: 0px;
            border-radius: 5px;
            box-shadow: none;
          }
          .config_file {
            display: none;
          }
@media (max-width: 768px) {

    .option_box {
        width: 95%;

    }
    .option_box div {
        padding: 5px;
        font-size: 14px; /* 修改按钮字体大小 */
    }

    .rule_list_box {
        width: 95%;
    }
    .rule_list_box .show_box .show_left {
        width: 70%;
    }
    .rule_list_box .eidt_box .eidt_left {
        width: 70%;
    }
    .rule_list_box .option_box div {
        padding: 3px; /* 修改按钮内边距 */
        font-size: 12px; /* 修改按钮字体大小 */

    }
    .seting_box {
        width: 90%; /* 容器宽度为视口宽度的90% */
        max-height: 80vh; /* 最大高度为视口高度的80% */
        top: 10%; /* 顶部距离为视口高度的10% */
        bottom: 10%; /* 底部距离为视口高度的10% */
        transform: translate(-50%, 0); /* 居中显示 */
        left: 50%; /* 水平居中 */
          z-index: 10000; /* 设置一个较高的层叠顺序 */
    }

}`
        // 开发用
        static devCss() {
            GM_xmlhttpRequest({
                method: 'get',
                url: 'http://127.0.0.1:1145',
                responseType: 'blob',
                onload: (res) => {
                    // console.log(res.responseText);
                    GM_addStyle(res.responseText)
                },
                onerror: (error => {
                    console.log('该页无法链接')
                })
            })
        }

        static create() {
            // 获取根节点
            let seting_box = document.querySelector('#mt_seting_box')
            seting_box.innerHTML = this.setingTemplate

            // 创建根节点样式
            GM_addStyle(this.setingStyle)
            // this.devCss()

            // 创建响应式ui
            const mt_Vue = new Vue({
                el: '#mt_seting_box',
                data() {
                    return {
                        rule: GM_getValue('key'),
                        edit: this.addEdit(GM_getValue('key')),
                        showSeting: false,
                        config_add: false,
                        file_is_txt: false,
                        word_stroke_dis: GM_getValue('word_stroke_dis')
                    }
                },

                watch: {
                    showSeting(n) {
                        // console.log(22333);
                    }
                },

                methods: {
                    // 关闭设置
                    close_seting() {
                        this.showSeting = false
                    },

                    // 开启设置
                    open_seting() {
                        this.showSeting = true
                        //console.log(2233)
                    },
                    // 添加属性开关
                    addEdit(rules) {
                        let a = {}
                        Object.keys(rules).forEach(key => {
                            a[key] = false
                        })
                        return a
                    },

                    // 打开编辑
                    editOn(key) {
                        this.edit[key] = true
                    },

                    // 关闭编辑
                    editOff(key) {
                        this.edit[key] = false
                    },

                    // 颜色更新
                    colorChange(key, color, textcolor) {
                        document.querySelectorAll(`.mt_highlight[classesKey="${key}"]`).forEach(node => {
                            node.style.background = color
                            node.style.color = textcolor
                        })
                        // 保存到油猴中
                        key_save('key', this.rule)
                    },

                    // 更新规则
                    ruleUpdate(key) {
                        let newInfo = document.querySelector(`textarea[info_key=${key}]`).value
                        let newWords = (document.querySelector(`textarea[words_key=${key}]`).value.split(' '))
                        let newLimit = (document.querySelector(`textarea[limit_key=${key}]`).value.split(' '))

                        // 去除空格
                        newWords = Array.from(new Set(newWords))
                            .filter(word => { return word != ' ' & word.length > 0 })
                        newLimit = Array.from(new Set(newLimit))
                            .filter(word => { return word != ' ' & word.length > 0 })
                        // console.log(newInfo,newWords);
                        this.rule[key].info = newInfo
                        this.rule[key].words = newWords
                        this.rule[key].limit = newLimit

                        this.editOff(key)

                        // 保存到油猴中
                        key_save('key', this.rule)
                    },

                    // 添加新规则
                    add_key() {
                        let key = 'key_' + Math.floor(Math.random() * 10000000000)
                        this.$set(this.rule, key, {
                            info: '',
                            words: [],
                            color: '#dc6c75',
                            textcolor: '#3467eb',
                            limit: []
                        })

                        this.$set(this.edit, key, false)

                        // 保存到油猴中
                        key_save('key', this.rule)
                        // console.log(2233)
                    },

                    // 删除规则
                    del_key(key) {
                        let ready = confirm('确认删除，该操作不可恢复')

                        if (ready && Object.keys(this.rule).length > 1) {
                            this.$delete(this.rule, key)
                            this.$delete(this.edit, key)
                        } else if (ready && Object.keys(this.rule).length < 2) {
                            alert('至少保留一个')
                        }

                        // 保存到油猴中
                        key_save('key', this.rule)
                    },

                    // 复制到粘贴板
                    copy() {
                        navigator.clipboard.writeText(JSON.stringify(this.rules))
                    },

                    // 获取配置覆盖
                    config_in() {
                        document.querySelector('.config_file').click()
                        this.config_add = false
                    },
                    // 获取配置添加
                    config_in_add() {
                        document.querySelector('.config_file').click()
                        this.config_add = true
                    },

                    // 解析配置
                    importFileTxt(ev) {
                        return new Promise((resolve, reject) => {
                            const fileDom = ev.target,
                            file = fileDom.files[0]

                            // 格式判断
                            console.log(file.type);
                            if (file.type !== 'text/plain') {
                                reject('文件类型错误')
                            }
                            // 检验是否支持FileRender
                            if (typeof FileReader === 'undefined') {
                                reject('当前浏览器不支持FileReader')
                            }

                            // 执行后清空input的值，防止下次选择同一个文件不会触发onchange事件
                            ev.target.value = ''

                            // 执行读取json数据操作
                            const reader = new FileReader()
                            reader.readAsText(file) // 读取的结果还有其他读取方式，我认为text最为方便

                            reader.onerror = (err) => {
                                reject('文件解析失败', err)
                            }

                            reader.onload = () => {
                                const resultData = reader.result
                                if (resultData) {
                                    try {
                                        const importData = resultData
                                        this.file_is_txt = true
                                        resolve(importData)
                                    } catch (error) {
                                        reject('读取数据解析失败', error)
                                    }
                                } else {
                                    reject('读取数据解析失败', error)
                                }
                            }
                        })
                    },
                    // 解析配置
                    importFileJSON(ev) {
                        return new Promise((resolve, reject) => {
                            const fileDom = ev.target,
                                file = fileDom.files[0]

                            // 格式判断
                            if (file.type !== 'application/json') {
                                alert('仅允许上传json文件')
                                reject('仅允许上传json文件')
                            }
                            // 检验是否支持FileRender
                            if (typeof FileReader === 'undefined') {
                                alert('当前浏览器不支持FileReader')
                                reject('当前浏览器不支持FileReader')
                            }

                            // 执行后清空input的值，防止下次选择同一个文件不会触发onchange事件
                            ev.target.value = ''

                            // 执行读取json数据操作
                            const reader = new FileReader()
                            reader.readAsText(file) // 读取的结果还有其他读取方式，我认为text最为方便

                            reader.onerror = (err) => {
                                alert('json文件解析失败', err)
                                reject('json文件解析失败', err)
                            }

                            reader.onload = () => {
                                const resultData = reader.result
                                if (resultData) {
                                    try {
                                        const importData = JSON.parse(resultData)
                                        resolve(importData)
                                    } catch (error) {
                                        alert('读取数据解析失败', error)
                                        reject('读取数据解析失败', error)
                                    }
                                } else {
                                    alert('读取数据解析失败', error)
                                    reject('读取数据解析失败', error)
                                }
                            }
                        })
                    },

                    // 导入本地配置
                    file_read(e) {
                        this.file_is_txt = false
                        this.importFileTxt(e).then(res => {
                            console.log("importFileTxt", res) 
                            var parts = res.split(/[\n,]/);
                            // console.log(parts);
                            let cache = GM_getValue('key')
                            
                            let add_new = {
                                limit: [],
                                info: '',
                                words: [],
                                color: '#85d228',
                                textcolor: '#0f100f'
                            }
                            parts.forEach(part => {
                                if (part != '')
                                {
                                    add_new.words.push(part)
                                }
                            })
                            cache['key_' + Math.floor(Math.random() * 10000000000)] = add_new
                            // console.log(cache);
                            key_save('key', cache)
                            this.rule = GM_getValue('key')
                            this.edit = this.addEdit(add_new)
                        });
                        if (this.file_is_txt) {
                            return
                        }
                        this.importFileJSON(e).then(res => {
                            // 合并还是覆盖
                            if (this.config_add) {
                                let cache = {}
                                Object.keys(GM_getValue('key')).forEach(key => {
                                    cache['key_' + Math.floor(Math.random() * 10000000000)] = GM_getValue('key')[key]
                                })
                                cache = { ...cache, ...res }
                                // console.log(cache)
                                key_save('key', cache)
                            } else {
                                key_save('key', res)
                            }
                            initialize()
                            this.rule = GM_getValue('key')
                            this.edit = this.addEdit(res)
                        })
                    },

                    // 导出配置
                    config_out() {
                        function exportJson(name, data) {
                            let blob = new Blob([data]) //  创建 blob 对象
                            let link = document.createElement('a')
                            link.href = URL.createObjectURL(blob) //  创建一个 URL 对象并传给 a 的 href
                            link.download = name //  设置下载的默认文件名
                            link.click()
                        }
                        let cache = {}
                        cache['key'] = GM_getValue('key')
                        cache['word_stroke_dis'] = GM_getValue('word_stroke_dis')
                        exportJson('mt_hight_light_config.json', JSON.stringify(cache))
                    },

                    // 刷新
                    refresh() {
                        location.reload()
                    },
                    // 刷新
                    word_stroke() {
                        if (this.word_stroke_dis) {
                            document.getElementById('word_stroke').innerHTML = "划词关闭";
                            // console.log("划词关闭");
                            this.word_stroke_dis = false;
                            document.addEventListener('mouseup', mouseup_loose_fun);
                        } else {
                            document.getElementById('word_stroke').innerHTML = "划词开启";
                            // console.log("划词开启");
                            this.word_stroke_dis = true;
                            document.removeEventListener('mouseup', mouseup_loose_fun);
                        }
                        GM_setValue('word_stroke_dis', this.word_stroke_dis)
                    }

                },

                mounted() {
                    GM_registerMenuCommand('打开设置', this.open_seting)
                    // 点击其他区域关闭设置
                    document.body.addEventListener('click', (e) => {
                        // 检查是否是移动设备
                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            if (!document.querySelector('#mt_seting_box').contains(e.target)) {
                                this.close_seting()
                            }
                        }
                    })

                }
            })
            //
        }
    }


    ///////////////////////////////////////////////////////////
    // vue根节点
    let seting_box = document.createElement('div')  // 创建一个节点
    seting_box.setAttribute('id', 'mt_seting_box') // 设置一个属性
    document.body.appendChild(seting_box)

    GM_addStyle(HIGHTLIGHT.highlightStyle)

    // 初始化数据
    initialize()
    console.log(GM_getValue('key'))

    // 静态页面的检测
    let nodeMap = textMap(document.body)
    // console.log(nodeMap);
    HIGHTLIGHT.highlight(nodeMap)
    nodeMap.clear()

    // 减少节点的重复检测
    let doOnce = ((wait) => {
        let timer = null
        // 存储动态更新的节点
        let elMap = new Map

        return (el) => {
            // 添加节点
            elMap.set(el)
            if (!timer) {
                timer = setTimeout(() => {
                    // console.log(elMap);
                    elMap.forEach((value, el) => {
                        setTimeout(() => {
                            let nodeMap = textMap(el)
                            HIGHTLIGHT.highlight(nodeMap)
                            nodeMap = null
                        }, 1)
                    })
                    elMap.clear()
                    timer = null
                }, wait)
            }
        }
    })(100)
    // 动态更新内容的检测
    watch()

    // 创建ui
    GUI.create()

    function save_word(key_id, str){
        let cache = GM_getValue('key')
        Object.keys(cache).forEach(key => {
            if (key == key_id) {
                cache[key].words.push(str)
                // console.log(cache[key].words)
            }
        })
        key_save('key', cache)
    }

    function del_word(key_id, str){
        let cache = GM_getValue('key')
        Object.keys(cache).forEach(key => {
            if (key == key_id && cache[key_id].words.length > 0) {
                for (let i = 0; i < cache[key_id].words.length; i++) {
                    if (get_name(cache[key_id].words[i]) == str)
                    {
                        console.log(cache[key_id].words[i])
                        cache[key_id].words.splice(i, 1);
                        break
                    }
                }
            }
        })
        key_save('key', cache)
    }
    // 创建功能菜单
    function create_savediv() {
        // 创建保存功能的 div  
        Object.keys(GM_getValue('key')).forEach(classesKey => {
            let color = GM_getValue('key')[classesKey].color
            let textcolor = GM_getValue('key')[classesKey].textcolor
            const saveDiv = document.createElement('div');
            saveDiv.textContent = '保存到' + classesKey;
            saveDiv.id = 'divid_' + classesKey;
            saveDiv.style.cursor = 'pointer'; // 设置光标为手型  
            saveDiv.style.padding = '5px';
            saveDiv.style.backgroundColor = color; // 按钮背景色  
            saveDiv.style.color = textcolor; // 按钮文字颜色  
            saveDiv.style.textAlign = 'center';
            saveDiv.style.borderRadius = '3px';
            select_fun_menu.appendChild(saveDiv);
            
            document.getElementById('divid_' + classesKey)?.addEventListener('click', (event) => {
                // console.log("divid_" + classesKey);
                if (select_text) {
                    // console.log("save", select_text);
                    save_word(classesKey, select_text);
                    select_text = ""; // 清空选中的文本
                    // alert('保存成功: ' + select_text);
                    select_fun_menu.style.display = 'none'; // 隐藏菜单
                    let nodeMap = textMap(document.body)
                    HIGHTLIGHT.highlight(nodeMap)
                    nodeMap.clear()
                } else {
                    // alert('没有选中文本！');
                }
            });
        })
    }

    const select_fun_menu = document.createElement('div');
    select_fun_menu.id = 'custom-context-select_fun_menu';
    select_fun_menu.style.position = 'absolute';//
    select_fun_menu.style.backgroundColor = '#ffffff';
    select_fun_menu.style.border = '1px solid black';
    select_fun_menu.style.zIndex = '1000';
    select_fun_menu.style.padding = '10px';
    select_fun_menu.style.display = 'none';
    // <div id="div_save" style="cursor: pointer; margin-bottom: 5px;">处理文本</div>
    select_fun_menu.innerHTML = `
        <div style="cursor: pointer;" onclick="document.getElementById('custom-context-select_fun_menu').style.display='none'">关闭</div>
    `;
    document.body.appendChild(select_fun_menu);
    const menu_del = document.createElement('div');
    menu_del.id = 'custom-context-menu_del';
    menu_del.style.position = 'absolute';//
    menu_del.style.backgroundColor = '#ffffff';
    menu_del.style.border = '1px solid black';
    menu_del.style.zIndex = '1000';
    menu_del.style.padding = '10px';
    menu_del.style.display = 'none';
    menu_del.innerHTML = `
        <div id="div_mouseupdel" style="cursor: pointer; margin-bottom: 5px;">删除</div>
        <div style="cursor: pointer;" onclick="document.getElementById('custom-context-menu_del').style.display='none'">关闭</div>
    `;
    document.body.appendChild(menu_del);
    create_savediv();
    let select_text = ""; // 用于存储选中的文本
    let select_class = ""; // 用于存储选中的class
    // 处理鼠标松开事件
    function mouseup_loose_fun(event) {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            select_text = selectedText; // 存储当前选中的文本  
            select_fun_menu.style.top = `${event.pageY}px`;
            select_fun_menu.style.left = `${event.pageX}px`;
            select_fun_menu.style.display = 'block';
            let nodeMap = textMap(document.body)
            HIGHTLIGHT.highlight(nodeMap)
            nodeMap.clear()
            // console.log(selectedText);
            // 点击其他地方隐藏菜单
            // document.addEventListener('click', () => {
            //     select_fun_menu.style.display = 'none';
            // }, { once: true });
        }
        else
        {
            select_fun_menu.style.display = 'none'; // 隐藏菜单  
        }
    }

    function menu_del_mouseup_loose_fun(event) {
        if (event.target.tagName === 'SPAN' && event.target.classList.contains('mt_highlight')) {
            event.preventDefault();
            menu_del.style.top = `${event.pageY}px`;
            menu_del.style.left = `${event.pageX}px`;
            menu_del.style.display = 'block';
            // console.log("tagName=",event.target.tagName);
            // console.log("classesKey=", event.target.getAttribute('classeskey'));
            // console.log("innerText=",event.target.innerText);
            select_text = event.target.innerText
            select_class =  event.target.getAttribute('classeskey')
            // 点击其他地方隐藏菜单
            document.addEventListener('click', () => {
                menu_del.style.display = 'none';
            }, { once: true });
        }
    }
    document.getElementById('div_mouseupdel')?.addEventListener('click', (event) => {
        // console.log("div_mouseupdel tagName=",event.target.tagName);
        // console.log("div_mouseupdel innerText=",deltext);
        const deltext = select_text
        const delstr = get_name(select_text)
        del_word(select_class, delstr)
        select_text = ""; // 清空选中的文本
        select_class = ""; // 清空选中的class
        // alert('要删除的文本: ' + deltext); // 这里可以替换成删除操作
        menu_del.style.display = 'none'; // 隐藏菜单
        // 获取所有带有highlight类名的span元素
        const highlightedSpans = document.querySelectorAll('span.mt_highlight');
        // 循环移除类名
        highlightedSpans.forEach(span => {
            // span.classList.remove('mt_highlight');
            // span.parentNode.removeChild(span);
            if (span.innerText == deltext) {
                span.removeAttribute('classeskey');
                span.removeAttribute('style');
                span.removeAttribute('class');
                // console.log("span.innerText=", span.innerText);
                // console.log("parentNode.innerText=", span.parentNode.innerText);
                // console.log("parentNode.innerText=", span.parentNode.parentNode.innerText);
                // let newNode = document.createElement('span')
                // newNode.innerHTML = span.innerText
                // node.parentElement.replaceChild(newNode, node)
            }
        });
    });

    if (GM_getValue('word_stroke_dis')) {
        document.getElementById('word_stroke').innerHTML = "划词开启";
    } else {
        document.getElementById('word_stroke').innerHTML = "划词关闭";
        document.addEventListener('mouseup', mouseup_loose_fun);
    }
    
    // 点击菜单外部时隐藏菜单
    // document.addEventListener('click', (event) => {
    //     if (!select_fun_menu.contains(event.target)) {
    //         // select_fun_menu.style.display = 'none';
    //     }
    // });
    document.addEventListener('keydown', (event)=> {
        // console.log('按下的键码为：', event.keyCode);
        // console.log('按下的字符为：', event.key);
        // 可以在这里添加更多根据按键进行的操作逻辑，比如判断按下的是不是回车键执行提交操作等
        // select_fun_menu.style.display = 'none';
        // console.log('keydown', event.key);
    });
/*
    // 防止菜单因为用户点击菜单项而消失
    document.addEventListener('contextmenu', (event) => {
    const customMenu = document.getElementById('custom-context-select_fun_menu');
       if (customMenu) {
           event.preventDefault();
       }
    });
*/
/*
    // 定时检查内容的变化
    let lastValue = GM_getValue('key');
    function check_GM(){
        const newValue = GM_getValue('key');
        // 检查值是否有变化
        console.log("check_GM");
        if (newValue !== lastValue) {
            lastValue = newValue; // 更新最后的值
            // 更新显示
            // console.log('值已更新: ${newValue }')
            let nodeMap = textMap(document.body)
            // console.log(nodeMap);
            HIGHTLIGHT.highlight(nodeMap)
            nodeMap.clear()
        }
    }
    setInterval(check_GM, 4000); // 每3秒检查一次
*/
    // 添加双击事件监听器
    document.addEventListener("dblclick", function (event) {
        if (event.button === 0) {
            // console.log("在扩展全局范围内鼠标左键双击了");
            console.log("双击位置：", event.clientX, event.clientY);
            let nodeMap = textMap(document.body)
            HIGHTLIGHT.highlight(nodeMap)
            nodeMap = null
        }
    });

    // 添加visibilitychange事件监听器
    document.addEventListener('visibilitychange', (event) => {
        if (document.visibilityState === 'visible') {
            // console.log('标签页获得焦点');
            let nodeMap = textMap(document.body)
            HIGHTLIGHT.highlight(nodeMap)
            nodeMap = null
        } else {
            // console.log('标签页失去焦点');
        }
    });
    
    const nasWebDAVUrl = ""; // 替换为实际的 NAS WebDAV 地址
    const username = ""; // NAS 上用于 WebDAV 访问的用户名
    const password = ""; // 对应的密码
    async function saveDataToNAS() {
        if (nasWebDAVUrl !="" && username !="" && password!="") {
            let cache = {}
            cache['key'] = GM_getValue('key')
            cache['word_stroke_dis'] = GM_getValue('word_stroke_dis')
            const data = JSON.stringify(cache); // JSON.stringify 处理后的对象等
            const url = nasWebDAVUrl + "/key.json"; // 假设保存的文件名，可以根据需求修改
            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
            headers.append('Content-Type', 'text/plain');
    
            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: headers,
                    body: data
                });
                if (response.ok) {
                    console.log('数据已成功通过 WebDAV 保存到 NAS 服务器');
                } else {
                    console.error('通过 WebDAV 保存数据到 NAS 服务器出错，状态码：', response.status);
                }
            } catch (error) {
                console.error('发生错误：', error);
            }
        }
    }
    
    function key_save(key, val) {
        GM_setValue(key, val)
        saveDataToNAS()
    }
    
}
)()
