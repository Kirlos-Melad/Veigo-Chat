import fs from "fs";
import TextToImage from "text-to-image";
import { dataUriToBuffer } from "data-uri-to-buffer";

// [text-color, background-color]
const dualHexColors = [
	["#F4DF4EFF", "#949398FF"],
	["#FFFFFFFF", "#000000FF"],
	["#ADEFD1FF", "#00203FFF"],
	["#FEE715FF", "#101820FF"],
	["#101820FF", "#F2AA4CFF"],
	["#E94B3CFF", "#2D2926FF"],
	["#990011FF", "#FCF6F5FF"],
	["#1C1C1BFF", "#CE4A7EFF"],
];

async function Generate(
	text: string,
	height: number = 500,
	width: number = 500,
	fontSize: number = 250,
	fontFamily: string = "Arial",
) {
	const [textColor, bgColor] =
		dualHexColors[Math.floor(Math.random() * dualHexColors.length)];

	const photo = await TextToImage.generate(text, {
		bgColor: bgColor,
		textColor: textColor,

		customHeight: height,
		maxWidth: width,

		fontSize: fontSize,
		fontFamily: fontFamily,

		textAlign: "center",
		verticalAlign: "center",
	});

	const buffer = dataUriToBuffer(photo);

	const imagePath = `W:/VS Code Projects/Veigo Chat/backend/source/assets/${text}.png`;

	fs.writeFileSync(imagePath, buffer);

	return imagePath;
}

export default { Generate };
