<div align="center">
  <h1>Gers2017 Readme</h1>
  <img src="resources/gers-readme.svg" width="100" height="100" alt="gers-readme-logo" />
  <h3>Dynamically generated cards to visualize your Github stats 🐙</h3>
  <h6>Powered by SVG and Next.js</h6>
</div>

## Github card

A preview of the themes can be found [here](https://gers2017-readme.vercel.app/)

Copy and paste the following into your readme and replace

```
![title](https://gers2017-readme.vercel.app/api/card?username=<Username>&cache_seconds=<Cache_seconds>&theme=<Theme>)
```

| Option          | Description                                              | Default value |
| --------------- | -------------------------------------------------------- | ------------- |
| `username`      | Your GitHub username                                     | ""            |
| `cache_seconds` | _(optional)_ The number of seconds to cache the response | 30 minutes    |
| `theme`         | The name of the theme to use.                            | `glitch`      |

List of available themes:

### **Glitch**

![glitch](resources/glitch.png)

### **Vscode**

![vscode](resources/vscode.png)

### **Dracula**

![dracula](resources/dracula.png)

### **Spectrum**

![spectrum](resources/spectrum.png)
