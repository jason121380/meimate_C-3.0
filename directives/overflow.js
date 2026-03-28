import Vue from 'vue'

export const overflow = {
    inserted: (el, bind) => {
        const root = document.documentElement;
        root.style.setProperty('--container', `${el.parentNode.offsetWidth}px`)
        if (el.offsetWidth > el.parentNode.offsetWidth) {
            el.style.animation = 'moving 10s infinite linear';
        } else {
            el.style.animation = '';
        }
    },
}