<template>
<div class="get-treasure">
    <div>
        不支持嵌套子事件列表。可以新建一个事件，添加相应的子事件，再将subEvents中的内容复制到数组中。
    </div>
</div>
</template>

<script>
    export default {
        name: 'get-treasure',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                gainEvent: []
            }, this.subEvent.detail)
        },
    }
</script>