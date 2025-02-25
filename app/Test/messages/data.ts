export const messages = [
  { 
    id: 1, 
    sender: "Alice", 
    text: "Hey! How are you?", 
    time: "10:30 AM", 
    avatar: "https://i.pravatar.cc/150?img=1",
    unreadMessages: 2,
    isOnline: true,
    replies: [
      { sender: "Bob", text: "Hey Alice! I'm good, how about you?", time: "10:32 AM", avatar: "https://i.pravatar.cc/150?img=2" },
      { sender: "Alice", text: "I'm doing great! Just busy with work. What about you?", time: "10:34 AM" }, // No avatar (same sender)
      { sender: "Bob", text: "Same here, work is crazy these days!", time: "10:35 AM" }
    ]
  },

  { 
    id: 2, 
    sender: "Bob", 
    text: "I'm good, thanks!", 
    time: "10:32 AM", 
    avatar: "https://i.pravatar.cc/150?img=2",
    unreadMessages: 0,
    isOnline: false,
    replies: [
      { sender: "Alice", text: "Glad to hear that! Any plans for today?", time: "10:34 AM", avatar: "https://i.pravatar.cc/150?img=1" },
      { sender: "Bob", text: "Just some meetings. What about you?", time: "10:36 AM" }
    ]
  },

  { 
    id: 3, 
    sender: "Charlie", 
    text: "Let's meet at 3 PM.", 
    time: "10:35 AM", 
    avatar: "https://i.pravatar.cc/150?img=3",
    unreadMessages: 1,
    isOnline: true,
    replies: [
      { sender: "David", text: "That works for me!", time: "10:36 AM", avatar: "https://i.pravatar.cc/150?img=4" },
      { sender: "Charlie", text: "Great! See you then.", time: "10:38 AM" }
    ]
  },

  { 
    id: 4, 
    sender: "David", 
    text: "Where are you now?", 
    time: "10:40 AM", 
    avatar: "https://i.pravatar.cc/150?img=4",
    unreadMessages: 3,
    isOnline: false,
    replies: [
      { sender: "Eve", text: "I'm on my way. Should be there in 10 mins.", time: "10:42 AM", avatar: "https://i.pravatar.cc/150?img=5" },
      { sender: "David", text: "Okay, let me know when you arrive.", time: "10:43 AM" }
    ]
  },

  { 
    id: 5, 
    sender: "Eve", 
    text: "Can we reschedule?", 
    time: "10:45 AM", 
    avatar: "https://i.pravatar.cc/150?img=5",
    unreadMessages: 0,
    isOnline: true,
    replies: [
      { sender: "Charlie", text: "Sure, when are you available?", time: "10:47 AM", avatar: "https://i.pravatar.cc/150?img=3" },
      { sender: "Eve", text: "Maybe tomorrow morning?", time: "10:49 AM" },
      { sender: "Charlie", text: "Sounds good! I'll check my schedule.", time: "10:50 AM" }
    ]
  }
];
