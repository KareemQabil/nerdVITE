// src/features/sales-pos/hooks/useFeedback.ts
import { usePOSUIStore } from '../stores/pos-ui.store';

export const useFeedback = () => {
    const { showFeedback, clearFeedback, feedbackMessage } = usePOSUIStore();
    return {
        showFeedback: (type: 'success' | 'error' | 'info' | 'warning', message: string, duration?: number) => showFeedback({ type, message, duration }),
        clearFeedback,
        feedbackMessage
    };
};
