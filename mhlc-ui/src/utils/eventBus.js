const showLoadingCallbacks = [];
const hideLoadingCallbacks = [];

export function showLoading() {
  showLoadingCallbacks.forEach(callback => callback());
}

export function hideLoading() {
  hideLoadingCallbacks.forEach(callback => callback());
}

export function onShowLoading(callback) {
  showLoadingCallbacks.push(callback);
}

export function onHideLoading(callback) {
  hideLoadingCallbacks.push(callback);
}
