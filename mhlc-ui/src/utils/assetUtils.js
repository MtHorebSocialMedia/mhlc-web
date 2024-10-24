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

export function getAssetSizeStyle(originalWidth, originalHeight, parentElement, maxPercentage) {
    if (parentElement) {
        maxPercentage = maxPercentage || 0.9;
        const { width: deviceWidth } = useDisplay();
        const parentWidth = parentElement.clientWidth;
        const maxWidth = parentWidth < deviceWidth.value ? parentWidth : deviceWidth.value;
        const assetWidth = (originalWidth >= maxWidth * maxPercentage) ? maxWidth * maxPercentage : originalWidth;
        const percentage = assetWidth / originalWidth;
        const assetHeight = originalHeight * percentage;
        return `width: ${assetWidth}px; height: ${assetHeight}px;`;
    } else {
        return '';
    }
}
