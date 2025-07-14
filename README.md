# QR Code Generator

A modern, customizable QR Code generator built with Next.js and Tailwind CSS. Create beautiful QR codes with custom colors, styles, and embedded logos.

## Features

- 🎨 **Custom Styling**: Choose dot colors, corner eye colors and styles
- 🔍 **Live Preview**: See changes in real-time as you customize
- 🖼️ **Logo Integration**: Upload PNG/JPG/SVG logos and embed them in your QR codes
- 🎯 **Multiple Shapes**: Square, rounded, dots, and extra-rounded dot shapes
- 🌈 **Color Customization**: Full color picker support for all elements
- 🖼️ **Pixel Matching**: Upload an image and match each QR code dot with corresponding pixel colors
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 💾 **Auto-Save**: Your configurations are automatically saved to localStorage
- 📥 **Download Options**: Export as PNG (with transparency support) or SVG
- ⚡ **Client-Side**: No backend required - everything runs in your browser

## Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) - QR code generation library
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd qrcode-generator
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter your data**: Type any text or URL in the data field
2. **Customize appearance**:
   - Adjust size and margin with sliders
   - Pick colors for dots, corner eyes, and background
   - Choose dot shapes and corner eye styles
3. **Add a logo** (optional): Upload an image and adjust its size and margin
4. **Pixel Matching** (new feature):
   - Upload an image for pixel matching
   - Each QR code dot will match the color of the corresponding pixel in your image
   - Adjust opacity, resolution, and blending modes for perfect results
5. **Download**: Export your QR code as PNG or SVG

## Customization Options

- **Data Input**: Text, URLs, or any string data
- **Size**: 200px to 500px
- **Margin**: 0px to 50px
- **Dot Color**: Any color via color picker
- **Corner Eye Color**: Separate color for outer corner squares
- **Corner Eye Inner Color**: Color for inner corner dots
- **Background**: Solid color or transparent
- **Dot Shapes**: Square, Dots, Rounded, Extra-rounded
- **Corner Eye Styles**: Square, Dot, Extra-rounded
- **Logo**: PNG/JPG/SVG upload with size and margin controls

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
