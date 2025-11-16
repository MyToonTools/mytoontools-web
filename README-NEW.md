# jtoon - JSON to TOON Converter

🚀 Free online tool to convert JSON to TOON (Token-Oriented Object Notation) format and vice versa.

## 🎯 What is TOON?

TOON (Token-Oriented Object Notation) is a compact, human-readable format designed for LLM prompts. It reduces token count by 30-60% compared to standard JSON, making it ideal for:

- ChatGPT and OpenAI API calls
- Claude and Anthropic prompts
- Google Gemini interactions
- Any Large Language Model (LLM) usage

## ✨ Features

- **Bidirectional Conversion**: JSON → TOON and TOON → JSON
- **Real-time Processing**: Instant conversion as you type
- **Token Estimation**: See how many tokens you save
- **Multiple Delimiters**: Choose between comma, tab, or pipe delimiters
- **Key Folding**: Optional key folding for nested structures
- **Clean UI**: Minimalist, distraction-free interface
- **No Sign-up Required**: Completely free and anonymous

## 🔧 How to Use

1. Visit [jtoon.app](https://jtoon.app)
2. Choose conversion direction (JSON to TOON or TOON to JSON)
3. Paste your JSON or TOON data
4. Get instant conversion results
5. See token savings in real-time

## 💡 Example

**JSON Input:**
```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}
```

**TOON Output:**
```
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

**Result:** ~40% token reduction! 🎉

## 🌐 SEO Keywords

JSON to TOON, TOON converter, JSON converter, token optimization, LLM format, AI prompts, reduce LLM tokens, ChatGPT format, Claude format, token-efficient format, data serialization, online JSON tool, free converter, TOON format

## 📦 Tech Stack

- React 19
- TypeScript
- Vite
- @toon-format/toon library

## 🔗 Links

- [TOON Format Specification](https://github.com/toon-format/toon)
- [Official TOON Website](https://toonformat.dev/)

## 📝 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ for the AI/LLM community
