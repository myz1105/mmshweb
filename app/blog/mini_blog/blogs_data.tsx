const posts = [
    {
      date: "Jan 10, 2023",
      category: "Business",
      title: "Increase Your Sales Effectively",
      description: "Discover strategies to enhance your sales and build a loyal customer base.",
      author: "Sarah Johnson",
      role: "CEO / Founder",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "dQw4w9WgXcQ", // YouTube Video ID (Added in Data)
    },
    {
      date: "Feb 22, 2023",
      category: "Technology",
      title: "The Future of AI in Marketing",
      description: "How artificial intelligence is transforming marketing.",
      author: "David Brown",
      role: "Tech Lead",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "RgKAFK5djSk", // See You Again (Example)
    },
    {
      date: "Jan 10, 2023",
      category: "Business",
      title: "Increase Your Sales Effectively",
      description: "Discover strategies to enhance your sales and build a loyal customer base.",
      author: "Sarah Johnson",
      role: "CEO / Founder",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "dQw4w9WgXcQ", // YouTube Video ID
    },
    {
      date: "Feb 22, 2023",
      category: "Technology",
      title: "The Future of AI in Marketing",
      description: "How artificial intelligence is transforming marketing.",
      author: "David Brown",
      role: "Tech Lead",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "RgKAFK5djSk", // See You Again
    },
    {
      date: "Mar 5, 2023",
      category: "Finance",
      title: "Managing Your Finances Smartly",
      description: "Learn how to budget, invest, and save efficiently for long-term success.",
      author: "Emily Carter",
      role: "Financial Advisor",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "JGwWNGJdvx8", // Shape of You
    },
    {
      date: "Apr 15, 2023",
      category: "Health",
      title: "Mental Wellness in the Workplace",
      description: "How to maintain mental well-being while managing work stress and productivity.",
      author: "Jessica Lee",
      role: "HR Specialist",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "9bZkp7q19f0", // Gangnam Style
    },
    {
      date: "May 8, 2023",
      category: "Education",
      title: "The Rise of Online Learning",
      description: "Understanding the impact of e-learning and its future in modern education.",
      author: "Mark Anderson",
      role: "Education Consultant",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "F4tHL8reNCs", // Johny Johny Yes Papa
    },
    {
      date: "Jun 20, 2023",
      category: "Travel",
      title: "Top Destinations for Remote Work",
      description: "Discover the best travel spots for remote workers seeking productivity and adventure.",
      author: "Alex Martinez",
      role: "Travel Blogger",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "OPf0YbXqDm0", // Uptown Funk
    },
    {
      date: "Jul 12, 2023",
      category: "Entrepreneurship",
      title: "How to Start Your Own Business",
      description: "Step-by-step guide to launching a successful startup from scratch.",
      author: "Michael Chen",
      role: "Startup Founder",
      img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "kJQP7kiw5Fk", // Despacito
    },
    {
      date: "Aug 29, 2023",
      category: "Science",
      title: "Exploring the Mysteries of the Universe",
      description: "Uncover the secrets of space, black holes, and quantum physics.",
      author: "Sophia Carter",
      role: "Astrophysicist",
      img: "https://images.unsplash.com/photo-1495837174058-628aafc7d610?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "XqZsoesa55w", // Baby Shark Dance
    },
    {
      date: "Sep 10, 2023",
      category: "Music",
      title: "The Evolution of Pop Music",
      description: "Tracing the journey of pop music from the 60s to the present.",
      author: "David White",
      role: "Music Historian",
      img: "https://images.unsplash.com/photo-1516726817505-f5ed8256249f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "e_04ZrNroTo", // Wheels on the Bus
    },
    {
      date: "Oct 5, 2023",
      category: "Sports",
      title: "The Rise of Esports",
      description: "How competitive gaming has become a billion-dollar industry.",
      author: "Lucas Brown",
      role: "Esports Analyst",
      img: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      videoId: "tVlcKp3bWH8", // Phonics Song with Two Words
    },
  ];

export default posts;