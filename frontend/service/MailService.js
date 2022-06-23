import axios from "axios";
import APP from "../config/app";
import { MAIL_TYPE } from "../config/mail";
import EventService from "./EventService";
const API = `${APP.BASE_API}common/email`;

const REMIND_MAIL = (event, email) => {
  return (
    `~Bạn nhận được 1 tin nhắn từ ${email} của ứng dụng ` +
    APP.APP_NAME +
    " với nội dung như sau: \n" +
    "Xin chào, chúng tôi đến từ sự kiện " +
    event.event_name +
    "!\n" +
    "Ban tổ chức xin xác nhận thông tin sự kiện: \n" +
    "Sự kiện " +
    event.event_name +
    " diễn ra vào lúc " +
    event.start_at +
    (event.location ? " tại " + event.location : "") +
    "\n" +
    "Để chuẩn bị cho sự kiện diễn ra tốt nhất, vui lòng vào app " +
    APP.APP_NAME +
    " để xác nhận tham gia/không tham gia \n" +
    "Xin chân thành cảm ơn và mong được gặp bạn ở sự kiện này nhé \n" +
    "Thân ái, "
  );
};
const COMMON = (event, email) => {
  return (
    `~Bạn nhận được 1 tin nhắn từ email : ${email} từ sự kiện ${event.event_name} của ứng dụng ` +
    APP.APP_NAME +
    " với nội dung như sau: \n"
  );
};
const getEmail = (type, event, email = null) => {
  switch (type) {
    case MAIL_TYPE.REMIND:
      return REMIND_MAIL(event, email);
    case MAIL_TYPE.COMMON:
      return COMMON(event, email);
    default:
      return REMIND_MAIL(event, email);
  }
};
export const sendMail = async (
  token,
  emails,
  type,
  eventId,
  customBody = null,
  customSubject = null
) => {
  try {
    const event = await EventService.getById(token, eventId);
    const bodyMail = customBody
      ? getEmail(type, event, emails[0]) + customBody
      : getEmail(type, event, emails[0]);
    const subject = customSubject
      ? `[${APP.APP_NAME}] ${customSubject}`
      : "Thông báo đến từ hệ thống " + APP.APP_NAME;
    const config = {
      method: "post",
      url: API,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { emails, body_mail: { subject: subject, body: bodyMail } },
    };
    await axios(config);
    return true;
  } catch (err) {
    console.log(err, "failed in sendMail");
    return false;
  }
};
