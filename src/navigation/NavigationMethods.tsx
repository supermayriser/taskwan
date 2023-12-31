// RootNavigation.js
import { createRef } from "react";

export const navigationRef = createRef<any>();

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}
