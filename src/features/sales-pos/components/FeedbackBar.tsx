import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from '../hooks/useFeedback';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const FeedbackBar: React.FC = () => {
    const { feedbackMessage, clearFeedback } = useFeedback();

    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => {
                clearFeedback();
            }, feedbackMessage.duration || 3000);
            return () => clearTimeout(timer);
        }
    }, [feedbackMessage, clearFeedback]);

    if (!feedbackMessage) return null;

    const bgColors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
        warning: 'bg-orange-600'
    };

    const Icons = {
        success: CheckCircle,
        error: AlertCircle,
        info: Info,
        warning: AlertTriangle
    };

    const Icon = Icons[feedbackMessage.type];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -50, opacity: 0, x: '-50%' }}
                animate={{ y: 20, opacity: 1, x: '-50%' }}
                exit={{ y: -50, opacity: 0, x: '-50%' }}
                className={`fixed top-0 left-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full text-white shadow-lg backdrop-blur-md ${bgColors[feedbackMessage.type]} bg-opacity-90 font-almarai`}
            >
                <Icon className="w-5 h-5" />
                <span className="font-bold text-sm">{feedbackMessage.message}</span>
            </motion.div>
        </AnimatePresence>
    );
};

export default FeedbackBar;
