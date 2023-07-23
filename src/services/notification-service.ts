import notifications$ from "../stores/notification-store";

// Show notifications
export function notify(message: string) {
  notifications$.update(n => [...n, message]);
  setTimeout(
    () => notifications$.update(n => n.filter(n => n !== message)),
    3000
  );
}

// Register notifications with eel
export function registerNotificationMethod() {
  const dynamicWindow = (window as any);
  if (dynamicWindow.eelNotify) {
    dynamicWindow.eelNotify.registerNotificationMethod(notify);
  }
}

export default {
  notify,
  registerNotificationMethod
}
