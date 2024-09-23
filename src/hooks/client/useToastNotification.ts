import { useState, useCallback } from 'react';
import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

interface UseToast {
    showInfoToast: (message: string, options?: ToastOptions) => void;
    showSuccessToast: (message: string, options?: ToastOptions) => void;
    showWarningToast: (message: string, options?: ToastOptions) => void;
    showErrorToast: (message: string, options?: ToastOptions) => void;
    showDefaultToast: (message: string, options?: ToastOptions) => void;
}

const useToast = (): UseToast => {
    const [, setToastIds] = useState<Record<ToastType, string | null>>({
        info: null,
        success: null,
        warning: null,
        error: null,
        default: null,
    });

    const showToastByType = useCallback(
        (type: ToastType) =>
            (message: string, options?: ToastOptions) => {
                const id = toast(message, {
                    type,
                    ...options,
                    onClose: () => setToastIds((prevIds) => ({ ...prevIds, [type]: null })),
                });

                setToastIds((prevIds) => ({ ...prevIds, [type]: id }));
            },
        []
    );

    return {
        showInfoToast: showToastByType('info'),
        showSuccessToast: showToastByType('success'),
        showWarningToast: showToastByType('warning'),
        showErrorToast: showToastByType('error'),
        showDefaultToast: showToastByType('default'),
    };
};

export default useToast;