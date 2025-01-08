// Utilities
import { createPinia } from 'pinia'
import { useContentStore } from './content';
import { useDonationsStore } from './donations';
import { useSecurityStore } from './security';
import { useMailStore } from './mail';
import { useAnalyticsStore } from './analytics';

export default createPinia();

export function getStores() {
    return [
        useContentStore(),
        useDonationsStore(),
        useMailStore(),
        useSecurityStore(),
        useAnalyticsStore()
    ];
}
