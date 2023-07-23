<script>
  export let label = 'label';
  export let checked = false;
  export let title = null;
</script>

<div class="input-container">
  <label>
    <input class="nf" {title} type=checkbox bind:checked={checked} />
    {label}
  </label>
</div>

<style lang="scss">
  @import '../../styles/util/variables';

  label {
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  input[type=checkbox] {
    appearance: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.5rem;
    height: 24px;
    padding: 0;
    width: 24px;

    &::before {
      content: "\f62d";
    }

    &:checked {
      &::before {
        content: "\f631";
      }
    }
  }
</style>
