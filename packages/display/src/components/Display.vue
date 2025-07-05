<template>
  <QuestionContainer
    :data="element.data"
    :feedback="feedback"
    :is-correct="userState.isCorrect"
    :is-graded="isGraded"
    :is-submitted="isSubmitted"
    allowed-retake
    @retry="isSubmitted = false"
    @submit="submit"
  >
    <div class="text-subtitle-2 mb-2">Select one:</div>
    <VInput
      :rules="[requiredRule]"
      :validation-value="selectedAnswer !== null"
      hide-details="auto"
      validate-on="submit"
    >
      <VItemGroup v-model="selectedAnswer" class="w-100 d-flex ga-2" mandatory>
        <VItem
          v-for="value in [true, false]"
          :key="value"
          v-slot="{ toggle, isSelected }"
          :value="value"
        >
          <VCard
            v-bind="isSubmitted ? {} : { onClick: toggle }"
            :class="{ readonly: isSubmitted, selected: isSelected }"
            :color="isSelected ? 'primary-darken-1' : 'white'"
            :variant="isSelected ? 'tonal' : 'flat'"
            class="flex-grow-1 d-flex align-center px-4 py-3"
            border
            rounded
          >
            <VIcon color="primary-darken-1" size="x-large" start>
              {{ getIcon(value, isSelected) }}
            </VIcon>
            {{ value ? 'True' : 'False' }}
          </VCard>
        </VItem>
      </VItemGroup>
    </VInput>
  </QuestionContainer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Element } from '@tailor-cms/ce-true-false-manifest';
import { pick } from 'lodash-es';
import { QuestionContainer } from '@tailor-cms/lx-components';

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits(['interaction']);

const isSubmitted = ref(!!props.userState.isSubmitted);
const selectedAnswer = ref<boolean>(props.userState?.response ?? null);

const isGraded = computed(() => 'isCorrect' in props.userState);
const feedback = computed(() => {
  const feedback = props.element.data.feedback;
  if (selectedAnswer.value === null) return;
  return pick(feedback, selectedAnswer.value ? 0 : 1);
});

const submit = () => emit('interaction', { response: selectedAnswer.value });

const getIcon = (value: boolean, isSelected: boolean) => {
  if (isSelected) return value ? 'mdi-check-circle' : 'mdi-close-circle';
  return value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline';
};

const requiredRule = (val: string | boolean | number) => {
  return !!val || 'You have to select an answer.';
};

watch(
  () => props.userState,
  (state = {}) => {
    selectedAnswer.value = state.response ?? null;
    isSubmitted.value = !!state.isSubmitted;
  },
  { deep: true },
);
</script>

<style lang="scss" scoped>
.v-input .selected.v-card {
  border: 1px solid color-mix(in srgb, currentColor 36%, transparent);
}
</style>
