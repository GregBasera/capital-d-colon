const tmi = require("tmi.js");
const { Username, Password } = require("./identity");

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: Username,
    password: Password,
  },
  channels: ["demenishki"],
});

client.connect().catch(console.error);

let dumbswitch = false;
client.on("message", (channel, tags, message, self) => {
  if (self) return;

  let mentionIndex = message.search("@capDcolon");
  if (mentionIndex !== -1) {
    client.say(
      channel,
      `@${tags.username}, heya! Im a friendly bot. Please dont ban me D: So far all I can do is introduce myself like this, and comment D: with chat.
    Direct your violent reactions to my creator @fudgefudge_ D:`
    );
  }

  if (message === "D:") {
    client.say(channel, dumbswitch ? "D:" : "D: D:");
    dumbswitch = !dumbswitch;
  }
});
