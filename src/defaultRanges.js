import dayjs from 'dayjs';

const defineds = {
  startOfWeek: dayjs().startOf('isoWeek'),
  endOfWeek: dayjs().endOf('isoWeek'),
  startOfLastWeek: dayjs()
    .subtract(7, 'day')
    .startOf('day'),
  endOfLastWeek: dayjs()
    .subtract(7, 'day')
    .endOf('isoWeek'),
  startOfToday: dayjs().startOf('day'),
  endOfToday: dayjs().endOf('day'),
  startOfYesterday: dayjs()
    .subtract(1, 'day')
    .startOf('day'),
  endOfYesterday: dayjs()
    .subtract(1, 'day')
    .endOf('day'),
  startOfMonth: dayjs().startOf('month'),
  endOfMonth: dayjs().endOf('month'),
  startOfLastMonth: dayjs()
    .subtract(1, 'month')
    .startOf('month'),
  endOfLastMonth: dayjs()
    .subtract(1, 'month')
    .endOf('month'),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      definedRange.startDate.isSame(range.startDate, 'day') &&
      definedRange.endDate.isSame(range.endDate, 'day')
    );
  },
};

export function createStaticRanges(ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: 'Today',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: 'Yesterday',
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
    }),
  },

  {
    label: 'This Week',
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
  },
  {
    label: 'Last Week',
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
  },
  {
    label: 'This Month',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: 'Last Month',
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
  },
]);

export const defaultInputRanges = [
  {
    label: 'days up to today',
    range(value) {
      return {
        startDate: defineds.startOfToday.add((Math.max(Number(value), 1) - 1) * -1, 'day'),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!dayjs(range.endDate).isSame(defineds.endOfToday, 'day')) return '-';
      if (!range.startDate) return '∞';
      return dayjs(defineds.endOfToday).diff(defineds.endOfToday, range.startDate, 'day') + 1;
    },
  },
  {
    label: 'days starting today',
    range(value) {
      const today = dayjs();
      return {
        startDate: today,
        endDate: today.add(Math.max(Number(value), 1) - 1, 'day'),
      };
    },
    getCurrentValue(range) {
      if (!dayjs(defineds.startOfToday).isSame(dayjs(range.startDate), 'day')) return '-';
      if (!range.endDate) return '∞';
      return dayjs(range.endDate).diff(defineds.startOfToday, 'day') + 1;
    },
  },
];
