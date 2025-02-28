export function useListContentTopInset({inset}: {inset: number}) {
  return {
    contentContainerStyle: {paddingTop: inset},
    showsVerticalScrollIndicator: false,
  };
}
