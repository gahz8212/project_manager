const { Server } = require("socket.io");
const cors = require("cors");
cors();
module.exports = (httpServer, app) => {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });
  app.set("io", io);
  io.on("connection", (socket) => {
    console.log("소켓연결됨.");
    // const req = socket.request;
    // const {
    //   headers: { referer },
    // } = req;
    // const roomId = referer
    //   .split("/")
    //   [referer.split("/").length - 1].replace(/\?.+/, "");
    // socket.join(roomId);
    // socket.on("disconnect", () => {
    //   socket.leave(roomId);
    // });
  });
};
