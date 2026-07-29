export const siteConfig = {
  name: "SignBridge AI",
  tagline: "Open the website. Allow camera access. Start signing.",
  description:
    "A real-time, browser-based sign language interpreter. No signup, no login, no backend, no cloud inference — everything runs on-device.",
  githubUrl: "https://github.com/",
  url: "https://signbridge.ai",
};

export const navLinks = [
  { label: "Translator", href: "/translator" },
  { label: "About", href: "/about" },
];

export const features = [
  {
    title: "Fully On-Device",
    description:
      "Every frame of video is processed locally in your browser using WebAssembly. Nothing is uploaded, streamed, or stored on a server.",
    icon: "Cpu",
  },
  {
    title: "Zero Setup",
    description:
      "No accounts, no installs, no extensions. Open the site, grant camera access, and start signing in seconds.",
    icon: "Zap",
  },
  {
    title: "Real-Time Landmarks",
    description:
      "Hand, face, and pose landmarks are tracked live using MediaPipe's on-device vision models, running entirely client-side.",
    icon: "Hand",
  },
  {
    title: "Context-Aware Sentences",
    description:
      "Recognized signs are assembled into fluent English through a grammar-aware sentence generation layer, not simple word concatenation.",
    icon: "MessageSquare",
  },
  {
    title: "Natural Voice Output",
    description:
      "Translated sentences are read aloud using the browser's built-in speech synthesis, with adjustable voice and speed.",
    icon: "Volume2",
  },
  {
    title: "Private by Design",
    description:
      "Because inference happens on-device, video never leaves your machine. There is no backend that could log, store, or replay it.",
    icon: "ShieldCheck",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Allow camera access",
    description:
      "Click Start Translating and grant temporary camera permission. The stream stays local to your browser tab.",
  },
  {
    step: "02",
    title: "On-device tracking",
    description:
      "MediaPipe locates your hands, face, and body pose on every frame, entirely inside a WebAssembly runtime.",
  },
  {
    step: "03",
    title: "Gesture recognition",
    description:
      "Normalized landmark sequences are matched against a sign recognition model running locally in a Web Worker.",
  },
  {
    step: "04",
    title: "Sentence generation",
    description:
      "Recognized signs are buffered and passed through a grammar layer that assembles fluent, natural English.",
  },
  {
    step: "05",
    title: "Speak it aloud",
    description:
      "The finished sentence is displayed on screen and can be read aloud using the Web Speech API.",
  },
];

export const techStack = [
  { name: "Next.js 15", category: "Framework" },
  { name: "React 19", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Zustand", category: "State" },
  { name: "MediaPipe Tasks Vision", category: "Computer Vision" },
  { name: "ONNX Runtime Web", category: "Inference" },
  { name: "Web Speech API", category: "Voice" },
  { name: "WebAssembly", category: "Runtime" },
  { name: "Web Workers", category: "Concurrency" },
  { name: "Vercel", category: "Deployment" },
];
