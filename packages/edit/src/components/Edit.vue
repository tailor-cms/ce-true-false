<template>
  <QuestionContainer
    v-bind="{
      type: manifest.name,
      icon: manifest.ui.icon,
      elementData,
      embedElementConfig,
      isDirty,
      isDisabled,
    }"
    show-feedback
    @cancel="updateData(element.data)"
    @save="save"
    @update="updateData($event)"
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
          v-for="value in [true, false]"
          :key="value"
          :error="isValid.value === false"
          :false-icon="isGradable ? 'mdi-circle-outline' : 'mdi-circle'"
          :label="value ? 'True' : 'False'"
          :model-value="elementData.correct === value"
          :readonly="isDisabled || !isGradable"
          color="primary"
          hide-details
          @click="elementData.correct = value"
        />
      </div>
    </VInput>
  </QuestionContainer>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, reactive, watch } from 'vue';
import manifest, {
  Element,
  ElementData,
} from '@tailor-cms/ce-true-false-manifest';
import cloneDeep from 'lodash/cloneDeep';
import isBoolean from 'lodash/isBoolean';
import isEqual from 'lodash/isEqual';
import { QuestionContainer } from '@tailor-cms/core-components';

const emit = defineEmits(['save']);
const props = defineProps<{
  element: Element;
  embedElementConfig: any[];
  isFocused: boolean;
  isDisabled: boolean;
}>();

const isGradable = computed(() => props.element.data.isGradable);
const elementData = reactive<ElementData>(cloneDeep(props.element.data));

const isDirty = computed(() => !isEqual(elementData, props.element.data));

const title = computed(() =>
  isGradable.value ? 'Select correct answer' : 'Options',
);

const save = () => emit('save', elementData);

const updateData = (data: ElementData) => {
  Object.assign(elementData, cloneDeep(data));
};

const correctValidation = computed(() => {
  if (!isGradable.value) return [];
  return [
    (val?: boolean) => isBoolean(val) || 'Please choose the correct answer',
  ];
});

watch(() => props.element.data, updateData);
</script>

<style lang="scss" scoped>
.tce-container {
  text-align: left;
}
</style>
