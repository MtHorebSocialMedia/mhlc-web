import { useDisplay } from 'vuetify'

export function getAssetWidth(originalWidth) {
    const { width: deviceWidth } = useDisplay();
    if (originalWidth >= deviceWidth.value * 0.9) {
        return deviceWidth.value * 0.8;
    } else {
        return originalWidth;
    }
}

export function getAssetHeight(originalWidth, originalHeight) {
    const { width: deviceWidth } = useDisplay();
    if (originalWidth >= deviceWidth.value * 0.9) {
        const percentage = (deviceWidth.value * 0.8) / originalWidth;
        return originalHeight * percentage;
    } else {
        return originalHeight;
    }
}