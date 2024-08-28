// Utilities
import { createPinia } from 'pinia'
import { useContentStore } from './content';
import { useDonationsStore } from './donations';

export default createPinia();

export function getStores() {
    return [
        useContentStore(),
        useDonationsStore()
    ];
}
