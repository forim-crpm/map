
<template>
  <dialog class="Modal" :open="isRedirectionModalShown">
    <div class="Modal__head">
      <h1>Référencer une association</h1>
    </div>
    <div class="Modal__content">
      <p>Pour adresser votre demande de référencement, lorem ipsum</p>
    </div>
    <div class="Modal__footer">
      <button @click="close()">Annuler</button>
      <a href="" target="_blank">Accéder</a>
    </div>
  </dialog>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';
import { Vue, Component } from 'vue-facing-decorator'
import Button from '@/components/Button.vue';

@Component({
  components: { Button }
})
export default class RedirectionConfirmModal extends Vue {

  get isRedirectionModalShown() {
    return useAppStore().isRedirectionModalShown
  }

  close() {
    useAppStore().isRedirectionModalShown = false
  }
}
</script>

<style lang="less">
.Modal {
  width: 32rem;
  max-width: 100%;
  background: white;
  border-radius: 0.25rem;
  box-shadow: 0px 11px 15px 0px rgba(0, 0, 0, 0.20);
  position: fixed;
  inset: 0;
  margin: auto;
  z-index: @z-modal;
  border: none;

  .Modal__head {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 0.5rem;

    h1 {
      color: var(--black-087, rgba(0, 0, 0, 0.87));
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 2rem;
      letter-spacing: 0.01563rem;
    }
  }

  .Modal__content {
    display: flex;
    flex-flow: row nowrap;
    flex: 1 0 auto;
    padding: 1.5rem 1rem 2rem 1.5rem;
    // border-top: @mixin-divider-border;
    border-bottom: @mixin-divider-border;

    .Modal__ctn {

      &--right {
        max-width: 33rem;

        .Modal__titles {
          display: flex;
          padding: 1.5rem 1rem 2rem 1.5rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;

          h2 {
            font-size: @font-m;
            font-weight: 700;
            line-height: 2rem;
            color: @color-primary;
          }

          h3 {
            font-size: @font-s;
            font-weight: 600;
            line-height: 1.375rem;
          }
        }

        .Modal__contentDesc {
          display: flex;
          padding: 0rem 1rem 1rem 1.5rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;

          p {
            font-family: @font-secondary;
            color: @color-grey-3;
            font-size: 0.875rem;
            line-height: 1.375rem;
            letter-spacing: 0.00625rem;
          }
        }
      }

      &--left {
        display: flex;
        padding: 4.0625rem 1rem 2rem 3.5rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
        flex: 1 0 0;
        align-self: stretch;
        border-left: @mixin-divider-border;

        .Modal__actorsCtn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
          align-self: stretch;

          h3 {
            color: @color-black-faded-3;
            font-size: @font-s;
            font-family: @font-secondary;
            line-height: 1.375rem;
            letter-spacing: 0.00625rem;
          }

          .Modal__partnersCtn {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            gap: 2rem;
          }
        }
      }
    }
  }

  .Modal__footer {
    display: flex;
    padding: 0.5rem;
    align-items: flex-start;
    gap: 0.5rem;
    align-self: stretch;
    justify-content: space-between;

    button, a {
      display: flex;
      height: 2.25rem;
      padding: 0rem 1rem;
      align-items: center;
      gap: 1rem;
      color: var(--custom-primary, #2B5B39);
      text-align: center;
      font-size: @font-s;
      font-weight: 700;
      line-height: 2.25rem;
      letter-spacing: 0.07813rem;
      text-transform: uppercase;
      text-decoration: none;
    }
  }
}
</style>