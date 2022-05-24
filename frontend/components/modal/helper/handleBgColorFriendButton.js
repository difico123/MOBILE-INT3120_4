import {
  FRIEND_BUTTON_DEFAULT,
  FRIEND_STATUS,
} from "../../../config/friendStatus";

export const handleBgColorFriendButton = (status) => {
  let res = FRIEND_BUTTON_DEFAULT;
  switch (status) {
    case FRIEND_STATUS.self:
      res.backgroundColor = "grey";
      res.disabled = true;
      res.name = "Kết bạn";
      break;
    case FRIEND_STATUS.none:
      res.backgroundColor = "grey";
      res.disabled = false;
      res.name = "Kết bạn";
      break;
    case FRIEND_STATUS.pending:
      res.backgroundColor = "green";
      res.disabled = false;
      res.name = "Đã gửi y/c kết bạn";
      break;
    case FRIEND_STATUS.friend:
      res.backgroundColor = "#3B71F3";
      res.disabled = false;
      res.name = "Bạn bè";
      break;
    case FRIEND_STATUS.request:
      res.backgroundColor = "#3B71F3";
      res.disabled = false;
      res.name = "Đồng ý kết bạn";
      break;
    default:
      break;
  }
  return res;
};
