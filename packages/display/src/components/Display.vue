<template>
  <VForm ref="form" class="tce-root" @submit.prevent="submit">
    <div class="px-2 my-4">{{ data.question }}</div>
    <VInput
      :rules="[requiredRule]"
      :validation-value="selectedAnswer !== null"
      hide-details="auto"
      validate-on="submit"
    >
      <VItemGroup
        v-model="selectedAnswer"
        class="w-100 d-flex mb-3"
        selected-class="bg-blue-grey-lighten-4"
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
            :disabled="submitted"
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
    <VAlert
      v-if="submitted"
      :text="userState?.isCorrect ? 'Correct' : 'Incorrect'"
      :type="userState?.isCorrect ? 'success' : 'error'"
      class="mb-3"
      rounded="lg"
      variant="tonal"
    />
    <div class="d-flex justify-end">
      <VBtn v-if="!submitted" type="submit" variant="tonal">Submit</VBtn>
      <VBtn v-else variant="tonal" @click="submitted = false">Try Again</VBtn>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElementData } from '@tailor-cms/ce-true-false-manifest';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction']);

const form = ref<HTMLFormElement>();
const submitted = ref('isCorrect' in (props.userState ?? {}));
const selectedAnswer = ref<string[]>(props.userState?.response);

const submit = async () => {
  const { valid } = await form.value?.validate();
  if (valid) emit('interaction', { response: selectedAnswer.value });
};

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
    selectedAnswer.value = state.response;
    submitted.value = 'isCorrect' in state;
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
