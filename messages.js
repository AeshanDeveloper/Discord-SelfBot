let t = [
    "Exploring the digital universe 🌌",
    "Botting responsibly... maybe? 🤖",
    "Current vibe: automated 🎵",
    "Beep boop - message #{i}",
    "Selfbotting at {time}",
    "Why am I doing this? 🤔",
    "This is message number #{i}",
    "Discord API goes brrrr 📈",
    "Automation station 🚂",
    "Ping! {i}",
    "Message in a bottle �",
    "Another one 🎵",
    "Testing 1, 2, 3...",
    "Random thought #{i}",
    "This is probably a bad idea 😅",
    "Still going strong 💪",
    "Message queue: {i}/1000",
    "Did you know this is against ToS? 📜",
    "Automated message #{i}",
    "End of line."
]


const messageGenerators = [
    // Message templates with dynamic parts
    (i) => `Exploring ${['space', 'the cosmos', 'the void', 'reality'][i%4]} ${['🌌','🚀','🪐','☄️'][i%4]}`,
    (i) => `Vibe check ${i}: ${['chill','intense','weird','cosmic'][i%4]} ${['🎵','🎶','🎧','📻'][i%4]}`,
    (i) => `Day ${i} of ${['botting','experimenting','testing','hacking'][i%4]}`,
    (i) => `Beep ${['boop','bop','beep','bleep'][i%4]} ${i}`,
    (i) => `${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][new Date().getDay()]} mood ${i}`,
    (i) => `This is ${['a thought','an idea','a message','a note'][i%4]} #${i}`,
    (i) => `${['Ping!','Pong!','Zing!','Zang!'][i%4]} ${i}`,
    (i) => `Automated ${['message','note','thought','musing'][i%4]} at ${new Date().toLocaleTimeString()}`,
    // Add more generator patterns as needed...
  ];
  
  // Generate 5000 unique messages
  const generateMessages = (count) => {
    const messages = [];
    for (let i = 0; i < count; i++) {
      const generator = messageGenerators[i % messageGenerators.length];
      messages.push(generator(i));
    }
    return messages;
  };
  
  const randomMessages = generateMessages(500000);

  module.exports = randomMessages