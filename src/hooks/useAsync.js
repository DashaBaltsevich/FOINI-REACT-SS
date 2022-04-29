export const useAsync = (
  asyncFunc,
  args,
  deps,
  immediate = true,
) => {
  //

  return {
    value,
    error,
    loading,
    execute,
  }
}