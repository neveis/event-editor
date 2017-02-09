<template>
<div class="branch">
    <div>
        不支持嵌套子事件列表。可以新建一个事件再通过手动修改来设置。
    </div>
</div>
</template>

<script>
    export default {
        name: 'branch',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                conditions: [],
                branch: [],
                randomRef: 1
            }, this.subEvent.detail)
        },
    }
</script>