<template>
  <div class="question-form mb-4">
    <template v-if="isGradable">
      <div class="text-title-small mb-2">Select correct answer</div>
      <VRadioGroup
        :model-value="elementData.correct"
        :readonly="isReadonly"
        :rules="correctValidation"
        hide-details="auto"
        @update:model-value="(correct) => emit('update', { correct })"
      >
        <VRadio :value="true" label="True" />
        <VRadio :value="false" label="False" />
      </VRadioGroup>
    </template>
    <template v-else>
      <div class="text-title-small mb-2">Options</div>
      <div class="d-flex flex-column">
        <div class="d-flex align-center pa-1">
          <VAvatar
            class="font-weight-bold ma-1 mr-3"
            color="surface-container-high"
            icon="mdi-check"
            size="small"
          >
            <VIcon icon="mdi-check" size="small" />
          </VAvatar>
          True
        </div>
        <div class="d-flex align-center pa-1">
          <VAvatar
            class="font-weight-bold ma-1 mr-3"
            color="surface-container-high"
            size="small"
          >
            <VIcon icon="mdi-close" size="small" />
          </VAvatar>
          False
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Element, ElementData } from '@tailor-cms/ce-true-false-manifest';
import { computed } from 'vue';
import { isBoolean } from 'lodash-es';

const props = defineProps<{
  element: Element;
  embedElementConfig: any[];
  isDragged: boolean;
  isFocused: boolean;
  isReadonly: boolean;
}>();

const emit = defineEmits<{
  update: [data: Partial<ElementData>];
}>();

const elementData = computed(() => props.element.data);
const isGradable = computed(() => elementData.value.isGradable);

const correctValidation = [
  (val?: boolean | null) =>
    isBoolean(val) || 'Please choose the correct answer',
];
</script>

<style lang="scss" scoped>
.question-form {
  text-align: left;
}
</style>
