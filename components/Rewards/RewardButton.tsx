/* eslint-disable @next/next/no-img-element */

interface Props {
  onClick: () => void;
  showChat: boolean;
}

export default function RewardButton({ showChat, onClick }: Props) {
  return (
    <>
      <button onClick={onClick} className={`rewardButton ${showChat}`}>
        {!showChat ? (
          <span className="imgContainer">
            <img src="/img/cartLoveIcon.png" alt="shopping cart with rewards" />{" "}
            Rewards
          </span>
        ) : (
          <span className="cancel">X</span>
        )}
      </button>
      <style jsx>{`
        button.rewardButton.true {
          width: 30px;
          justify-content: center;
        }
        button.rewardButton {
          height: 30px;
          max-width: 140px;
          color: white;
          padding: 20px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          background-color: #f79f24;
          border: none;
          opacity: 1;
          position: absolute;
          right: 30px;
          bottom: 0px;
        }
        button.rewardButton:hover {
          opacity: 0.8;
        }
        button.rewardButton span img {
          height: 30px;
          width: 30px;
          margin-right: 3px;
        }
        .imgContainer {
          display: flex;
          align-items: center;
          width: 100px;
        }
        .cancel {
          font-size: 25px;
        }
        @media (max-width: 768px) {
          button.rewardButton {
            font-size: 14px;
            height: 40px;
            max-width: 120px;
          }
          button.rewardButton span img {
            margin-right: 0px;
            height: 25px;
            width: 25px;
          }
        }
      `}</style>
    </>
  );
}
