<template>
<div class="show-option">
    <div>
        不支持嵌套子事件列表。可以新建一个事件再通过手动修改来设置。
    </div>
    <div>
        其中message相当于对话事件detail中的内容。options则是子事件列表的数组。
    </div>
</div>
</template>

<script>
    export default {
        name: 'show-option',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                message: {},
                options: []
            }, this.subEvent.detail)
        },
    }
</script>