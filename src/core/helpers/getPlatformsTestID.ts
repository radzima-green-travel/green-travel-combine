export function getPlatformsTestID(testID?: string) {
  return {
    accessibilityLabel: testID,
    testID: testID,
  };
}
