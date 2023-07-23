<button class="tag" on:click>
  <slot></slot>
  <i class="nf nf-mdi-tag"></i>
</button>

<style lang="scss">
  @import '../../styles/util/variables';

  $tag-height: 25px;

  .tag {
    color: $white;
    cursor: pointer;
    background: $tag-background;
    border: none;
    border-radius: 3px;
    height: $tag-height;
    outline: none;
    padding: 2px 10px;
    position: relative;
  }
</style>
