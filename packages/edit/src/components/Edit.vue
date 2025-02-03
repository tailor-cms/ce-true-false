<template>
  <QuestionContainer
    v-bind="{ elementData, embedElementConfig, isDisabled }"
    show-feedback
    @update="emit('update', $event)"
  >
    <div class="text-subtitle-2 mb-2">{{ title }}</div>
    <VInput
      v-slot="{ isValid }"
      :model-value="elementData.correct"
      :rules="correctValidation"
      class="mb-4"
    >
      <div>
        <VRadio
          v-for="correct in [true, false]"
          :key="correct"
          :error="isValid.value === false"
          :false-icon="isGradable ? 'mdi-circle-outline' : 'mdi-circle'"
          :label="correct ? 'True' : 'False'"
          :model-value="elementData.correct === correct"
          :readonly="isDisabled || !isGradable"
          color="primary"
          hide-details
          @click="emit('update', { correct })"
        />
      </div>
    </VInput>
  </QuestionContainer>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue';
import { Element } from '@tailor-cms/ce-true-false-manifest';
import isBoolean from 'lodash/isBoolean';
import { QuestionContainer } from '@tailor-cms/core-components';

const props = defineProps<{
  element: Element;
  embedElementConfig: any[];
  isFocused: boolean;
  isDisabled: boolean;
}>();
const emit = defineEmits(['save', 'update']);

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
.tce-container {
  text-align: left;
}
</style>
