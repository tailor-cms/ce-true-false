<template>
  <VForm ref="form" class="tce-root" @submit.prevent="submit">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="rich-text px-2 my-4" v-html="data.question"></div>
    <div v-if="data.hint" class="d-flex justify-end mb-4">
      <VTooltip
        v-model="showHint"
        :open-on-hover="false"
        location="bottom"
        max-width="350"
        close-on-back
        open-on-click
      >
        <template #activator="{ isActive, props: tooltipProps }">
          <VBtn
            v-click-outside="() => (showHint = false)"
            v-bind="tooltipProps"
            :active="isActive"
            :prepend-icon="`mdi-lightbulb-${isActive ? 'on' : 'outline'}`"
            size="small"
            text="Hint"
            variant="text"
            rounded
          />
        </template>
        {{ data.hint }}
      </VTooltip>
    </div>
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
      v-bind="alertProps"
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
import { computed, ref, watch } from 'vue';
import { ElementData } from '@tailor-cms/ce-true-false-manifest';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction']);

const form = ref<HTMLFormElement>();
const showHint = ref(false);
const submitted = ref(false);
const selectedAnswer = ref<boolean>(props.userState?.response ?? null);

const alertProps = computed(() => {
  const isGraded = 'isCorrect' in props.userState;
  const isCorrect = props.userState.isCorrect;

  if (!isGraded) return { text: 'Submitted', type: 'info' };
  if (isCorrect) return { text: 'Correct', type: 'success' };
  return { text: 'Incorrect', type: 'error' };
});

const submit = async () => {
  const { valid } = await form.value?.validate();
  if (valid) {
    submitted.value = true;
    emit('interaction', { response: selectedAnswer.value });
  }
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
    selectedAnswer.value = state.response ?? null;
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
