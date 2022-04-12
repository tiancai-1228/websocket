"use strict";

//import express 和 ws 套件
const express = require("express");
const { Server } = require("ws");
const PORT = process.env.PORT || 3000; //指定 port
const INDEX = "/index.html";
//創建 express 物件，綁定監聽  port , 設定開啟後在 console 中提示
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new Server({ server });
//當有 client 連線成功時
wss.on("connection", (ws) => {
  console.log("Client connected");
  // 當收到client消息時
  ws.on("message", (data) => {
    // 收回來是 Buffer 格式、需轉成字串
    data = data.toString();
    console.log(data); // 可在 terminal 看收到的訊息

    /// 發送消息給client
    // ws.send(data);

    /// 發送給所有client：

    let clients = wss.clients; //取得所有連接中的 client
    clients.forEach((client) => {
      client.send(data); // 發送至每個 client
    });
  });
  // 當連線關閉
  ws.on("close", () => {
    console.log("Close connected");
  });
});

// const express = require("express");
// const { Server } = require("ws");

// const PORT = process.env.PORT || 3000;
// const INDEX = "/index.html";

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const wss = new Server({ server });

// wss.on("connection", (ws) => {
//   console.log("Client connected");
//   ws.on("close", () => console.log("Client disconnected"));
// });
