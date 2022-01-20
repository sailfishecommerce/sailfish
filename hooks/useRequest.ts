import { useQuery } from "react-query";
import useCategory from "./useCategory";

export default function useRequest() {
    function useCategories() {
        const { listAllCategory } = useCategory();
        const {
            data: categoryData,
            status: categoryStatus,
            error: categoryError,
        } = useQuery("listAllCategory", listAllCategory);

        return {
            categoryData,
            categoryStatus,
            categoryError,
        };
    }
    return {
        useCategories,
    };
}
