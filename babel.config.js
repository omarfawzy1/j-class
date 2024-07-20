module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    ["prismjs", {
        "languages": ["javascript", "css", "csharp", "json"],
        "plugins": ["line-numbers"],
        "theme": "tomorrow",
        "css": true
    }]
  ]
}