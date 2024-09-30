<template>
  <VForm
    ref="form"
    class="tce-container"
    validate-on="submit"
    @submit.prevent="save"
  >
    <VTextarea
      v-model="elementData.question"
      :readonly="isDisabled"
      :rules="[requiredRule]"
      class="my-3"
      label="Question"
      rows="3"
      auto-grow
    />
    <div class="text-subtitle-2 mb-2">Select correct answer</div>
    <VRadioGroup
      id="correct-answer"
      v-model="elementData.correct"
      :rules="[(val: any) => val ?? 'Please choose the correct answer']"
      density="comfortable"
    >
      <VRadio
        v-for="value in [true, false]"
        :key="value"
        :error="correctAnswerValidation"
        :label="value ? 'True' : 'False'"
        :readonly="isDisabled"
        :value="value"
        color="primary"
        hide-details
      />
    </VRadioGroup>
    <div v-if="!isDisabled" class="d-flex justify-end">
      <VBtn :disabled="isDirty" variant="text" @click="cancel">Cancel</VBtn>
      <VBtn :disabled="isDirty" class="ml-2" type="submit" variant="tonal">
        Save
      </VBtn>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, reactive, ref, watch } from 'vue';
import { Element, ElementData } from '@tailor-cms/ce-true-false-manifest';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

const emit = defineEmits(['save']);
const props = defineProps<{
  element: Element;
  isFocused: boolean;
  isDisabled: boolean;
}>();

const form = ref<HTMLFormElement>();
const elementData = reactive<ElementData>(cloneDeep(props.element.data));

const isDirty = computed(() => isEqual(elementData, props.element.data));
const correctAnswerValidation = computed(() => {
  const radioGroup = form.value?.items.find(
    (it: any) => (it.id = 'correct-answer'),
  );
  return radioGroup?.isValid === false;
});

const save = async () => {
  const { valid } = await form.value?.validate();
  if (valid) emit('save', elementData);
};

const cancel = () => {
  Object.assign(elementData, cloneDeep(props.element.data));
  form.value?.resetValidation();
};

const requiredRule = (val: string | boolean | number) => {
  return !!val || 'The field is required';
};

watch(
  () => props.element.data,
  (data) => Object.assign(elementData, cloneDeep(data)),
);
</script>

<style lang="scss" scoped>
.tce-container {
  text-align: left;
}
</style>
