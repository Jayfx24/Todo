import { format, endOfWeek, startOfWeek } from 'date-fns';

export const formatDate = (date) => format(date, 'yyyy-MM-dd');

export const getToday = () => formatDate(new Date());

export const getEndOfWeek = () => formatDate(endOfWeek(new Date(), { weekStartsOn: 1 }));

export const getStartOfWeek = () => formatDate(startOfWeek(new Date(), { weekStartsOn: 1 }));

