import { useQuery, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";

import { useAppSelector } from "./useRedux";
import { useAppDispatch } from "@/redux/store";
import { updateUserDetails } from "@/redux/user-slice";
import useAccount from "@/hooks/useAccount";

export default function useUserToken() {
  const { userToken } = useAppSelector((state) => state.user);
  const { authorized } = useAppSelector((state) => state.auth);
  const { getUserAccount } = useAccount();
  const { data: userDetails } = useQuery("getAccount", getUserAccount);

  const dispatch = useAppDispatch();

  console.log("userDetails", userDetails);

  function generateUserToken() {
    if (userToken === null && authorized === false) {
      const generatedUserId = uuidv4();
      console.log("generatedUserId", generatedUserId);
      dispatch(updateUserDetails(generatedUserId));
    } else if (authorized) {
      console.log("user account data", userDetails);
      dispatch(updateUserDetails(userDetails.id));
    }
  }
  return { generateUserToken, authorized };
}
