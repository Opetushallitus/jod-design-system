import { DateView, DayTableCellState } from '@zag-js/date-picker';
import { DatePickerAriaRoleDescriptions } from './Datepicker';

export interface DatepickerTranslationOptions {
  selectedDayPrefix?: string;
}

export const getDatepickerTranslations = (
  viewTranslations: Record<DateView, { next: string; view: string; prev: string }>,
  dayCell: (state: DayTableCellState) => string,
  trigger: (open: boolean) => string,
  roleDescriptions: DatePickerAriaRoleDescriptions,
  options?: DatepickerTranslationOptions,
) => {
  const selectedDayPrefix = options?.selectedDayPrefix;

  return {
    nextTrigger: (view: DateView) => viewTranslations[view].next,
    viewTrigger: (view: DateView) => viewTranslations[view].view,
    prevTrigger: (view: DateView) => viewTranslations[view].prev,
    dayCell: (state: DayTableCellState) =>
      state.selected && selectedDayPrefix ? `${selectedDayPrefix} ${dayCell(state)}` : dayCell(state),
    trigger,
    roleDescriptions,
  };
};
