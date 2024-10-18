import { useDisplay } from 'vuetify'

export function getAssetWidth(originalWidth) {
    const { width: deviceWidth } = useDisplay();
    const maxWidth = deviceWidth.value < 900 ? deviceWidth.value : 900;
    if (originalWidth >= maxWidth * 0.60) {
        return maxWidth * 0.60;
    } else {
        return originalWidth;
    }
}

export function getAssetHeight(originalWidth, originalHeight) {
    const { width: deviceWidth } = useDisplay();
    const maxWidth = deviceWidth.value < 900 ? deviceWidth.value : 900;
    if (originalWidth >= maxWidth * 0.60) {
        const percentage = (maxWidth * 0.60) / originalWidth;
        return originalHeight * percentage;
    } else {
        return originalHeight;
    }
}
