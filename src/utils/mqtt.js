// import * as mqtt from 'mqtt/dist/mqtt.min'
// 不知道为什么 我用引入的方式不成，就在html 用的cdn方式接入了
// import { Message } from "element-ui";
let client = {};
// 连接服务器
/**
 * params:
 * @options 参数
 */
export function connectFn(
  { username, password, url, topic, clientId },
  callBack
) {
  const options = {
    username,
    password,
    cleanSession: false,
    keepAlive: 10,
    clientId: clientId,
    connectTimeout: 4000,
  };
  client = mqtt.connect(url, options);
  client.on("connect", (e) => {
    // Message.success("成功连接服务器");
    console.log("成功连接服务器:", e);
    // 订阅主题
    console.log(topic, "topictopic");
    client.subscribe(topic, { qos: 1 }, (err) => {
      if (!err) {
        // Message.success("订阅成功");
        console.log("订阅成功");
      } else {
        // Message.error("消息订阅失败！");
        console.log("消息订阅失败！");
      }
    });
  });
  // 重新连接
  reconnect();
  // 是否已经断开连接
  mqttError();
  // 监听获取信息
  getMessage(callBack);
}
// 发布消息 @topic主题  @message发布内容
export function publish(topic, message) {
  if (!client.connected) {
    console.log("客户端未连接");
    return;
  }
  client.publish(topic, message, { qos: 1 }, (err) => {
    if (!err) {
      console.log("主题为" + topic + "发布成功");
    }
  });
}
// 监听接收消息
function getMessage(callBack) {
  client.on("message", (topic, message) => {
    if (message) {
      callBack(topic, message);
    }
  });
}
// 监听服务器是否连接失败
function mqttError() {
  client.on("error", (error) => {
    console.log("连接失败：", error);
    client.end();
  });
}
// 取消订阅
export function unsubscribe(topicList) {
  client.unsubscribe(topicList, (error) => {
    console.log("主题为" + topicList + "取消订阅成功", error);
  });
}
// 断开连接
export function unconnect() {
  client.end();
  client = null;
//   Message.warning("服务器已断开连接！");
  console.log("服务器已断开连接！");
}
// 监听服务器重新连接
function reconnect() {
  client.on("reconnect", (error) => {
    console.log("正在重连:", error);
  });
}
