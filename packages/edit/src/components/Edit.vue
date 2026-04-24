<template>
  <div class="question-form mb-4">
    <template v-if="isGradable">
      <div class="text-title-small mb-2">Select correct answer</div>
      <VRadioGroup
        :model-value="elementData.correct"
        :readonly="isReadonly"
        :rules="correctValidation"
        color="primary"
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
        <div
          v-for="label in ['True', 'False']"
          :key="label"
          class="d-flex align-center pa-2"
        >
          <VIcon color="primary" start>mdi-circle</VIcon>
          {{ label }}
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
