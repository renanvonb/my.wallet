export type FilterPreset = 'today' | 'week' | 'month' | 'year' | 'all';

export interface DateRange {
    start: Date;
    end: Date;
}

/**
 * Get date range based on preset filter and reference date
 */
export const getDateRange = (preset: FilterPreset, referenceDate: Date = new Date()): DateRange => {
    // Clone reference date to avoid mutations affecting UI state
    const start = new Date(referenceDate);
    const end = new Date(referenceDate);

    switch (preset) {
        case 'today':
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            break;

        case 'week':
            // Sunday as start of week
            const dayOfWeek = start.getDay(); // 0 is Sunday
            start.setDate(start.getDate() - dayOfWeek);
            start.setHours(0, 0, 0, 0);

            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);
            break;

        case 'month':
            start.setDate(1);
            start.setHours(0, 0, 0, 0);

            end.setMonth(end.getMonth() + 1);
            end.setDate(0); // Last day of current month
            end.setHours(23, 59, 59, 999);
            break;

        case 'year':
            start.setMonth(0, 1); // Jan 1st
            start.setHours(0, 0, 0, 0);

            end.setMonth(11, 31); // Dec 31st
            end.setHours(23, 59, 59, 999);
            break;

        case 'all':
            start.setFullYear(2020, 0, 1); // January 1, 2020
            // End is already based on referenceDate, but for 'all' typically we want 'now' as end? 
            // Or maybe end of reference year? Usually 'all' means 'up to now'.
            const now = new Date();
            end.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
            end.setHours(23, 59, 59, 999);
            break;
    }

    return { start, end };
};

/**
 * Format date for display
 */
export const formatDateForDisplay = (date: Date): string => {
    const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
};

export const formatDateRangeForDisplay = (range: DateRange): string => {


    // Check for full year range (Jan 1 to Dec 31 of same year)
    if (range.start.getMonth() === 0 && range.start.getDate() === 1 &&
        range.end.getMonth() === 11 && range.end.getDate() === 31 &&
        range.start.getFullYear() === range.end.getFullYear()) {
        return `Jan. à Dez. ${range.start.getFullYear()}`;
    }

    const formatDate = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    return `${formatDate(range.start)} à ${formatDate(range.end)}`;
};

export const formatShortDateRange = (range: DateRange): string => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    if (range.start.getTime() === range.end.getTime()) {
        return `${range.start.getDate()} ${months[range.start.getMonth()]}`;
    }

    return `${range.start.getDate()} ${months[range.start.getMonth()]} - ${range.end.getDate()} ${months[range.end.getMonth()]}`;
};

export const getPresetLabel = (preset: FilterPreset): string => {
    const labels: Record<FilterPreset, string> = {
        today: 'Hoje',
        week: 'Semana',
        month: 'Mês',
        year: 'Ano',
        all: 'Tudo'
    };
    return labels[preset];
};

export const formatDateDDMMYY = (dateString?: string): string => {
    if (!dateString) return '-';
    // Handle specific mock formats or ISO standard
    const date = new Date(dateString + 'T12:00:00'); // Compensate timezone for simple dates
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
};
