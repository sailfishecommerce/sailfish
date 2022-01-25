import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";

import swellClientInit from "@/lib/config";
import { useAppSelector } from "./useRedux";
import { useAppDispatch } from "@/redux/store";
import { updateUserDetails } from "@/redux/user-slice";

export default function useUserToken() {
  const { userToken } = useAppSelector((state) => state.user);
  const { authorized } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const { data, status } = useQuery("getAccount", getUserAccount);

  console.log("userToken", userToken);

  const { swell, initializeSwell } = swellClientInit();

  async function getUserAccount() {
    initializeSwell();
    return await swell.account.get();
  }

  function generateUserToken() {
    if (userToken === null && authorized === false) {
      const generatedUserId = uuidv4();
      console.log("generatedUserId", generatedUserId);
      dispatch(updateUserDetails(generatedUserId));
    } else if (authorized) {
      console.log("user account data", data);
      dispatch(updateUserDetails(data.id));
    }
  }
  return { generateUserToken, status, authorized };
}
