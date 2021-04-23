import { writable } from 'svelte/store';


type view = 'days' | 'year';

function handleYearPickerVisibility() {
    const {subscribe, set } = writable('days');

    return {
        subscribe,
        setOpenView: (view: view) => set(view),
    }
}

export const openView = handleYearPickerVisibility();