// EDIT ME: everything personal lives here.
// Stickers: set `img` to a file in assets/stickers/ to replace the placeholder icon. x/y = position in % (0-100), s = size px, r = tilt deg.
// hidden:true = sticker not shown yet (remove that flag to bring a section back). Text: blank line = new paragraph; or use `html` for custom markup.
window.SITE = {
  debug: false,                         // true shows a small status badge bottom-left
  name: "Shipra Porwal",
  tagline: "Execute.Experience.Express",
  photo: "assets/profile.jpg",          // swap for your real photo later (same filename works)
  // email: "contact@shipraent.com",      // TODO: add your email
  socials: {
    LinkedIn: "https://www.linkedin.com/in/shipra-porwal-61229a219/",
    // YouTube: "https://www.youtube.com/@flaretales",
    Vimeo: "https://vimeo.com/ship260124752",
    // Instagram: "https://www.instagram.com/shipraporwal", // TODO: add your Instagram profile URL
    GitHub: "https://github.com/shipraporwal", 
    Email: "shiprap42@gmail.com"         // TODO: add your GitHub profile URL
  },
  stickers: [
    { 
      id: "about", 
      label: "About", 
      icon: "🪷", 
      img: "assets/stickers/about.svg", 
      x: 16, 
      y: 24, 
      s: 96, 
      r: -7, 
      title: "About",
      html: `<p>I’m someone who never wanted to choose between imagination and logic, so I kept both.

By training I’m an engineer (Electronics and Communication, NIT Warangal). By instinct I’m a storyteller, a traveler, and a collector of stories. I love building technology that’s actually useful, things that make people’s lives a little easier. I love making content that makes them feel something. And I love getting on a train, a plane, or a random road with no fixed plan.

I’m a book lover and a person inclined towards spirituality. I’m curious about the world around me and the one inside me, and I think the best questions usually sit somewhere between the two.

What I enjoy most is people. Give me a good conversation, face-to-face, over chai or a long walk, and I’ll listen for hours. Everyone is carrying a story worth hearing, and I’ve got a few of my own to share.

I’m just starting out, and I don’t have it all figured out. I’d rather be honest about that and keep exploring than pretend otherwise. I’m building, traveling, creating, and learning, one chapter at a time, with the goal of living this life to its fullest potential.

If you like good stories, big ideas, or the places where tech and creativity meet, let’s talk. 🌿</p>`
    },
    { 
      id: "tech", 
      label: "Projects", 
      icon: "☸️", 
      img: "assets/stickers/tech.svg", 
      x: 10, 
      y: 50, 
      s: 96, 
      r: 6, 
      title: "Projects",
      html: `<p>I'm learning AI, AI agents and generative AI, and I like building with them.</p>
<ul>
  <li><b><a href= "https://github.com/shiprapr/aria">Aria</a></b> (3rd runner-up, Ecosphere Hackathon):An LLM tool-calling agent on live audio that adapts mid-call, remembers corrections, and hands off to a human via Slack. It comes with an operator dashboard.</li>
  <li><b><a href="https://haq-delhi.vercel.app/">Haq</a>:</b> हक़ (haq) means "right / entitlement." Haq is a Hindi-first AI assistant that helps Delhi's workers know their rights, cite the actual law, and take the next step — check the minimum wage, understand e-Shram and welfare boards, and draft a formal complaint.</li>
  
</ul>`,
      links: [
        ["GitHub", "https://github.com/shiprapr"]             // TODO: add your GitHub profile URL
      ] 
    },
    { 
      id: "journey", 
      label: "Journey", 
      icon: "📜", 
      img: "assets/stickers/journey.svg", 
      x: 17, 
      y: 76, 
      s: 90, 
      r: -8, 
      title: "Journey",
      html: `<p>This is where people needed me to add some value at these places.</p>
      <ul>
  <li><b>Education </b>(2022-2026) : B.Tech in Electronics and Communication Engineering, NIT Warangal</li>
  <li><b>Publicis Sapient : Summer internship 2025 -</b> I designed and shipped a multi-stage system that parses PDFs with LLMs into structured scene plans, then generates visuals using text-to-image and image-to-video models served on GCP GPU inference. I used LoRA fine-tuning to keep outputs consistent in style, Pinecone-backed semantic caching to cut redundant generation cost and latency, and Celery-based async orchestration with FastAPI, MongoDB, and Docker to run long, multi-step jobs reliably at scale.

                          <br><b>Stack:</b> LLMs, LoRA, Python, FastAPI, Stable Diffusion, Pinecone, MongoDB, Celery, FastAPI, Docker, GCP</li>
  <li><b>Hackathons :</b>  Ecosphere 2026 powered by KnoticxAgora- 3rd runner up; Built "Aria" a voice Ai sales agent.</li>
  <li><b>Leadership/POR:</b> 
  <ul>
      <li>Community Lead at Knotic <em>(Present)</em></li>
      <li>Lead Editor at GDG Cloud New Delhi </li>
      <li>Volunteer Coordinator at Hackfest 2.0 </li>
      <li>Club Lead : Painting and Animation club , NIT Warangal </li>

  </ul>
</ul>`
    },
    { 
      id: "creative", 
      label: "Creative version", 
      icon: "🎬", 
      img: "assets/stickers/creative.svg", 
      x: 84, 
      y: 24, 
      s: 96, 
      r: 7, 
      title: "Creative version",
      html: `<p>This is where my imagination gets to play: video edits, motion graphics, and stories retold through new lenses. I’ve cut videos in Premiere Pro, CapCut, and DaVinci Resolve, and I’m now animating my way into After Effects. I led an art club in my college, and I freelanced at <a href="https://www.youtube.com/@flaretales">Flare Tales</a>, a YouTube channel where I helped bring Hindu mythology to life through AI-generated visuals, shaping stories, scenes, and the pacing that ties them together.
                <br>If you have a story that deserves a better cut, let’s make it.</p>`,
      links: [
        ["Samples", "https://vimeo.com/ship260124752"],
        ["Flare Tales", "https://www.youtube.com/@flaretales"]
      ] 
    },
    { 
      id: "reads", 
      label: "Reads", 
      icon: "📚", 
      img: "assets/stickers/reads.svg", 
      x: 90, 
      y: 50, 
      s: 96, 
      r: -6, 
      title: "Reads",
      html:`<p>LoL! Currently on my way back to love books again</p>`
    },
    { 
      id: "connect", 
      label: "Connect", 
      icon: "✉️", 
      img: "assets/stickers/connect.svg", 
      x: 83, 
      y: 76, 
      s: 90, 
      r: 6, 
      title: "Connect", 
      text: "Say hello!. I would love to hear your stories.", 
      extra: "socials" 
    },

    // Not shown for now. Remove `hidden:true` to bring one back.
    { 
      id: "story", 
      label: "My story", 
      icon: "🪶", 
      x: 50, 
      y: 12, 
      s: 90, 
      r: 4, 
      hidden: true, 
      title: "My story",
      text: "I'm Shipra, a storyteller and a book lover. I love meeting people and hearing their stories, and I always try to see a situation from the other person's side.\n\nI just graduated, and I wear a few hats: I learn AI, AI agents and generative AI, I edit videos, and I have a heart for art and design." 
    },
    { 
      id: "vision", 
      label: "The vision", 
      icon: "🌱", 
      x: 50, 
      y: 88, 
      s: 90, 
      r: -4, 
      hidden: true, 
      title: "The vision",
      text: "I'm an aspiring entrepreneur with a big dream: to build a business around sustainable garbage management and help make India a better place." 
    },
    { 
      id: "now", 
      label: "Now", 
      icon: "🪔", 
      x: 35, 
      y: 90, 
      s: 84, 
      r: 5, 
      hidden: true, 
      title: "Now",
      html: "<ul><li><b>Learning:</b> AI, AI agents and generative AI</li><li><b>Making:</b> this portfolio, and a content page on Instagram</li></ul>" 
    },
    { 
      id: "kind-words", 
      label: "Kind words", 
      icon: "📝", 
      x: 65, 
      y: 90, 
      s: 80, 
      r: -3, 
      hidden: true, 
      title: "Kind words", 
      text: "Testimonials will live here." 
    }
  ]
};
