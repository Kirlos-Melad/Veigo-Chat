import WebSocket from "ws";
import chalk from "chalk";

const username = process.argv[2] || "Anonymous";
const ws = new WebSocket("ws://localhost:3002"); // SERVICE_PORT

let currentRoom = null;

ws.on("open", () => {
  console.log(chalk.green(`Connected as ${username} (no room)`));

  process.stdin.on("data", (data) => {
    const input = data.toString().trim();
    if (!input) return;

    // Room switching
    if (input.startsWith("#")) {
      const roomName = input.slice(1);
      if (roomName) {
        if (currentRoom) {
          ws.send(JSON.stringify({
            type: "LEAVE_ROOM",
            payload: [{ id: currentRoom }]
          }));
        }

        ws.send(JSON.stringify({
          type: "JOIN_ROOM",
          payload: [{ id: roomName }]
        }));

        currentRoom = roomName;
        console.log(chalk.cyan(`Switched to room: ${roomName}`));
      }
      return;
    }

    // Must be in a room before chatting
    if (!currentRoom) {
      console.log(chalk.red("⚠️ You must join a room first (e.g., #general)"));
      return;
    }

    // Send chat message
    ws.send(JSON.stringify({
      type: "SEND_MESSAGE",
      payload: [
        { roomId: currentRoom, content: `${username}: ${input}` }
      ]
    }));
  });
});

ws.on("message", (raw) => {
  try {
    const msg = JSON.parse(raw.toString());

    switch (msg.type) {
      case "MESSAGE":
        msg.payload.forEach((p) => {
            if (p.type === "CHAT_MESSAGE") {
              const { senderId, content, timestamp } = p.content;
              const time = new Date(timestamp).toLocaleTimeString();
              console.log(chalk.yellow(`💬 [${senderId} @ ${time}] ${content}`));
            } else {
              console.log(chalk.gray(`ℹ️ [${p.type}] ${JSON.stringify(p.content)}`));
            }
          });
        break;

      case "ERROR":
        // expect payload: [{ reason }]
        msg.payload.forEach((p, i) => {
          console.log(chalk.red(`⚠️ Server Error ${i + 1}: ${p.reason}`));
        });
        break;

      default:
        console.log(chalk.gray(`ℹ️ [${msg.type}] ${JSON.stringify(msg.payload)}`));
    }
  } catch (err) {
    console.log(chalk.red("[ERROR parsing message]"), raw.toString());
  }
});
