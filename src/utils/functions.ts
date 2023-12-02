export function currentDayName(): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date();
  return days[d.getDay()];
}

/**
 * Is modal visible util function
 * @param state
 * @param modal
 */
export function isModalVisible(state: string | null, modal: string): boolean {
  return state === modal;
}
