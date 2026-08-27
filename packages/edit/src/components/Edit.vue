<template>
  <div class="question-form mb-6">
    <template v-if="isGradable">
      <div class="text-label-large mb-2">Select correct answer</div>
      <div class="mb-4">
        <VRadioGroup
          :model-value="elementData.correct"
          :readonly="isReadonly"
          :rules="correctValidation"
          color="secondary"
          hide-details="auto"
          @update:model-value="(correct) => emit('update', { correct })"
        >
          <VRadio :value="true" label="True" />
          <VRadio :value="false" label="False" />
        </VRadioGroup>
      </div>
    </template>
    <template v-else>
      <div class="text-label-large mb-2">Options</div>
      <VList class="d-flex flex-column py-0" density="compact">
        <VListItem class="d-flex align-center px-2">
          <VAvatar
            class="text-label-medium mr-2"
            color="surface-container-highest"
            icon="mdi-check"
            rounded="lg"
            size="small"
          />
          True
        </VListItem>
        <VListItem class="d-flex align-center px-2">
          <VAvatar
            class="text-label-medium mr-2"
            color="surface-container-highest"
            icon="mdi-close"
            rounded="lg"
            size="small"
          />
          False
        </VListItem>
      </VList>
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
