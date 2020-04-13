<template>
  <Edit :id="Number(id)"/>
</template>

<script>
import Edit from '@/components/Edit'

export default {
  props: {
    id: {
      required: true
    }
  },
  components: {
    Edit
  }
}
</script>

<style lang="scss" scoped></style>
