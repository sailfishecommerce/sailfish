import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateTopbarCounter } from "@/redux/ui-slice";

export default function useTopbarCounter() {
    const { topbarCounter } = useAppSelector((state) => state.UI);
    const dispatch = useAppDispatch();

    function updateButton(counterType: "inc" | "dec") {
        dispatch(updateTopbarCounter(counterType));
    }

    return {
        topbarCounter,
        updateButton,
    };
}
