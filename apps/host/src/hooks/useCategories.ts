import {
  selectCategory,
  setCategory,
  useAppDispatch,
  useAppSelector,
  useGetCategoriesFullQuery,
} from "@greencart/store";

export function useCategories() {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectCategory);
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useGetCategoriesFullQuery();

  const handleSelectCategory = (slug: string) => {
    dispatch(setCategory(activeCategory === slug ? null : slug));
  };

  const handleSelectAll = () => {
    dispatch(setCategory(null));
  };

  return {
    categories,
    activeCategory,
    handleSelectCategory,
    handleSelectAll,
    isLoading,
    isError,
  };
}
