export const withOptimisticUpdate = async <T>(action: () => Promise<T>, optimisticUpdate: () => void, rollback: () => void): Promise<T | void> => {
  optimisticUpdate();

  try {
    const result = await action();
    return result;
  } catch (error) {
    rollback();
  }
};
