<template>
  <QuestionContainer
    :data="data"
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
      <VItemGroup
        v-model="selectedAnswer"
        class="w-100 d-flex ga-2"
        selected-class="bg-blue-grey-lighten-5"
        mandatory
      >
        <VItem
          v-for="value in [true, false]"
          :key="value"
          v-slot="{ toggle, isSelected, selectedClass }"
          :value="value"
        >
          <VCard
            :class="selectedClass"
            :disabled="isSubmitted"
            class="flex-grow-1 d-flex align-center px-4 py-3"
            color="blue-grey-darken-2"
            rounded="lg"
            variant="outlined"
            @click="toggle"
          >
            <VIcon size="x-large" start>{{ getIcon(value, isSelected) }}</VIcon>
            {{ value ? 'True' : 'False' }}
          </VCard>
        </VItem>
      </VItemGroup>
    </VInput>
  </QuestionContainer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ElementData } from '@tailor-cms/ce-true-false-manifest';
import { QuestionContainer } from '@tailor-cms/lx-components';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction']);

const isSubmitted = ref(!!props.userState.isSubmitted);
const selectedAnswer = ref<boolean>(props.userState?.response ?? null);

const isGraded = computed(() => 'isCorrect' in props.userState);

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

<style scoped>
.tce-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;

  .v-item-group {
    gap: 0.5rem;
  }
}
</style>
