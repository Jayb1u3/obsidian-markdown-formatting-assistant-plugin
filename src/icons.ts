import { addIcon } from "obsidian";
import * as mdiIcons from "@mdi/js";
import * as iconPaths from "./iconPaths";

/**
 * Converts an SVG path string into a full <svg> markup string.
 */
function pathToSvg(path: string): string {
	return `
<svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
	<path fill="currentColor" d="${path}" />
</svg>`;
}

/**
 * Converts all icon path collections from iconPaths.ts (Greek sets)
 * into a flattened map of SVG strings.
 */
function importIconPaths(): Record<string, string> {
	const output: Record<string, string> = {};

	for (const [groupName, group] of Object.entries(iconPaths)) {
		if (typeof group !== "object" || group === null) continue;

		for (const [name, path] of Object.entries(group)) {
			if (typeof path !== "string") continue;
			const id = name; // Keep original ID so plugin does not break
			output[id] = pathToSvg(path);
		}
	}

	return output;
}

/**
 * Gather all icons (custom + MDI formatted icons)
 * Ensures backwards compatibility by preserving ALL icon keys.
 */
export const icons: Record<string, string> = {
	// Greek & custom icons from iconPaths.ts
	...importIconPaths(),

	// Math / symbols
	division: pathToSvg(mdiIcons.mdiDivision),
	multiplication: pathToSvg(mdiIcons.mdiCircleSmall),

	// Headings
	h1: pathToSvg(mdiIcons.mdiFormatHeader1),
	h2: pathToSvg(mdiIcons.mdiFormatHeader2),
	h3: pathToSvg(mdiIcons.mdiFormatHeader3),
	h4: pathToSvg(mdiIcons.mdiFormatHeader4),
	h5: pathToSvg(mdiIcons.mdiFormatHeader5),
	h6: pathToSvg(mdiIcons.mdiFormatHeader6),

	// Text formatting
	bold: pathToSvg(mdiIcons.mdiFormatBold),
	italic: pathToSvg(mdiIcons.mdiFormatItalic),
	strikethrough: pathToSvg(mdiIcons.mdiFormatStrikethroughVariant),
	underline: pathToSvg(mdiIcons.mdiFormatUnderline),
	highlight: pathToSvg(mdiIcons.mdiMarker),

	// Code
	codeInline: pathToSvg(mdiIcons.mdiCodeTags),
	codeBlock: pathToSvg(mdiIcons.mdiXml),

	// Links & media
	link: pathToSvg(mdiIcons.mdiLinkVariant),
	mermaidBlock: pathToSvg(mdiIcons.mdiGraph),
	fileLink: pathToSvg(mdiIcons.mdiFileLink),
	image: pathToSvg(mdiIcons.mdiImage),

	// Markdown structure
	quote: pathToSvg(mdiIcons.mdiFormatIndentIncrease),
	bulletList: pathToSvg(mdiIcons.mdiFormatListBulleted),
	numberList: pathToSvg(mdiIcons.mdiFormatListNumbered),
	checkList: pathToSvg(mdiIcons.mdiFormatListBulletedSquare),

	// UI controls
	viewIcon: pathToSvg(mdiIcons.mdiLanguageMarkdown),
	menu: pathToSvg(mdiIcons.mdiMenu),
	exp	expandArrowDown: pathToSvg(mdiIcons.mdiChevronDown),
	expandArrowUp: pathToSvg(mdiIcons.mdiChevronUp),
};

/**
 * Registers ALL icons with Obsidian.
 * This maintains compatibility with the existing plugin structure.
 */
export const addIcons = (): void => {
	for (const [key, svg] of Object.entries(icons)) {
		try {
			addIcon(key, svg);
		} catch (e) {
			console.error(`Failed to register icon '${key}'`, e);
		}
	}
};

/**
 * Parse an SVG string or load a file-based .svg into an HTMLElement.
 */
export const svgToElement = (key: string | number): HTMLElement => {
	const id = key.toString();

	// Support external .svg file paths
	if (id.endsWith(".svg")) {
		const img = document.createElement("img");
		img.src = id;
		img.width = 24;
		img.height = 24;
		return img;
	}

	// Lookup custom-registered icons
	const svgData = icons[id];
	if (!svgData) {
		console.warn(`svgToElement(): No icon found for '${id}'`);
		const fallback = document.createElement("div");
		fallback.textContent = "?";
		return fallback;
	}

	const doc = new DOMParser().parseFromString(svgData, "image/svg+xml");
	const svg = doc.documentElement;

	// Standardize display size
	svg.setAttribute("width", "24");
	svg.setAttribute("height", "24");

	return svg;
};
