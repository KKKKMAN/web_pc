import { Message } from "view-design";
let messageInstance = null;
const resetMessage = (options) => {
  if (messageInstance) {
    Message.destroy();
  } else {
    Message[options.type](options);
  }
  messageInstance = true;
  setTimeout(() => {
    messageInstance = null;
  }, 3000);
};
["error", "success", "info", "warning"].forEach((type) => {
  resetMessage[type] = (options) => {
    if (typeof options === "string") {
      options = {
        message: options,
      };
    }
    options.type = type;
    return resetMessage(options);
  };
});
export const message = resetMessage;
