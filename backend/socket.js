const SocketIO = require("socket.io");
module.exports = (server, app) => {
  const io = SocketIO(server, { cors: { origin: "*", credentials: true } });
  app.set("io", io);
  io.on("connection", (socket) => {
    // io.emit("myname", "김성현");
    const req = socket.request;
    const {
      headers: { referer },
    } = req;
    const roomId = referer
      .split("/")
      [referer.split("/").length - 1].replace(/\?.+/, "");
    socket.join(roomId);
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });
};
