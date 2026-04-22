<template>
  <div class="tce-true-false">
    <div class="text-title-small mb-2">Select one:</div>
    <VInput
      :rules="[requiredRule]"
      :validation-value="selectedAnswer !== null"
      hide-details="auto"
      validate-on="submit"
    >
      <VItemGroup v-model="selectedAnswer" class="w-100 d-flex ga-2" mandatory>
        <VItem
          v-for="value in [true, false]"
          :key="String(value)"
          v-slot="{ toggle, isSelected }"
          :value="value"
        >
          <VCard
            v-bind="isSubmitted ? {} : { onClick: toggle }"
            :class="{ readonly: isSubmitted, selected: isSelected }"
            :color="isSelected ? 'primary' : 'transparent'"
            :variant="isSelected ? 'tonal' : 'flat'"
            class="flex-grow-1 d-flex align-center px-4 py-3"
            border
          >
            <VIcon color="primary-darken-1" size="large" start>
              {{ getIcon(value, isSelected) }}
            </VIcon>
            {{ value ? 'True' : 'False' }}
          </VCard>
        </VItem>
      </VItemGroup>
    </VInput>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Element } from '@tailor-cms/ce-true-false-manifest';

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits<{
  'user-input': [data: { response: boolean }];
}>();

const isSubmitted = ref(!!props.userState?.isSubmitted);
const selectedAnswer = ref<boolean | null>(props.userState?.response ?? null);

watch(selectedAnswer, (val) => {
  if (val !== null) emit('user-input', { response: val });
});

const getIcon = (value: boolean, isSelected: boolean | undefined) => {
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
.tce-true-false {
  text-align: left;
}

.v-input .selected.v-card {
  border: 1px solid color-mix(in srgb, currentColor 36%, transparent);
}
</style>
