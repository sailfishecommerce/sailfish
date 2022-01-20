import rewardContent from "@/json/reward.json";
import RewardChat from "./RewardChat";
import EarnRewards from "./RewardView";

export default function rewardsTab(method: string) {
  switch (method) {
    case "ways-to-earn":
      return <EarnRewards content={rewardContent.earn} />;
    case "ways-to-redeem":
      return <EarnRewards content={rewardContent.redeem} />;
    default:
      return <RewardChat />;
  }
}
