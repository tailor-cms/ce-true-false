<template>
  <div class="question-form">
    <div class="text-title-small mb-2">{{ title }}</div>
    <VInput
      v-slot="{ isValid }"
      :model-value="elementData.correct"
      :rules="correctValidation"
      class="mb-4"
    >
      <div>
        <VRadio
          v-for="correct in [true, false]"
          :key="String(correct)"
          :error="isValid.value === false"
          :false-icon="isGradable ? 'mdi-circle-outline' : 'mdi-circle'"
          :label="correct ? 'True' : 'False'"
          :model-value="elementData.correct === correct"
          :readonly="isReadonly || !isGradable"
          color="primary"
          hide-details
          @click="emit('update', { correct })"
        />
      </div>
    </VInput>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { Element, ElementData } from '@tailor-cms/ce-true-false-manifest';
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

const title = computed(() =>
  isGradable.value ? 'Select correct answer' : 'Options',
);

const correctValidation = computed(() => {
  if (!isGradable.value) return [];
  return [
    (val?: boolean) => isBoolean(val) || 'Please choose the correct answer',
  ];
});
</script>

<style lang="scss" scoped>
.question-form {
  text-align: left;
}
</style>
