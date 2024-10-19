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

export function getAssetSizeStyle(originalWidth, originalHeight, parentElement) {
    const { width: deviceWidth } = useDisplay();
    const parentWidth = parentElement.clientWidth;
    const maxWidth = parentWidth < deviceWidth.value ? parentWidth : deviceWidth.value;
    const assetWidth = (originalWidth >= maxWidth * 0.9) ? maxWidth * 0.8 : originalWidth;
    const percentage = assetWidth / originalWidth;
    const assetHeight = originalHeight * percentage;
    return `width: ${assetWidth}px; height: ${assetHeight}px`;
}