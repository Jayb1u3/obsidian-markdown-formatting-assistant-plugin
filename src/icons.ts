import { setIcon } from "obsidian";

/**
 * Standard icon size used throughout the MFA plugin.
 * Keeping this centralized guarantees visual consistency.
 */

export const DEFAULT_ICON_SIZE = 20;

/**
 * Strongly-typed icon name registry for the plugin.
 *
 * All icon usages across the plugin should reference MFA_ICONS
 * instead of raw string literals, ensuring correctness and easy refactoring.
 */

export const MFA_ICONS = {
// Formatting
	bold: "bold",
	italic: "italic",
	underline: "underline",
	strikethrough: "strikethrough",
	inlineCode: "code",
	codeBlock: "file-code",
	highlight: "highlighter",

	// Structure
	heading1: "heading-1",
	heading2: "heading-2",
	heading3: "heading-3",
	heading4: "heading-4",
	heading5: "heading-5",
	heading6: "heading-6",

	// Lists
	bulletList: "list",
	numberList: "list-ordered",
	checkList: "check-square",

	// Markdown / content insertion
	quote: "quote",
	hr: "minus",
	link: "link",
	image: "image",
	file: "file",
	mermaid: "area-chart",

	// UI controls
	menu: "menu",
	expandDown: "chevron-down",
	expandUp: "chevron-up",
	view: "eye",
} as const;

/** 
 * Type automatically derived from MFA_ICONS keys.
 */
export type MFAIconName = keyof typeof MFA_ICONS;

/**
 * Safely applies a Lucide icon to an existing HTML element.
 *
 * Includes:
 * - Runtime safety checks
 * - Clear error logging
 * - Consistent icon sizing
 * - Graceful fallback behavior
 */
export function applyIcon(
	el: HTMLElement,
	icon: MFAIconName,
	size: number = DEFAULT_ICON_SIZE
): void {
	if (!el) {
		console.warn("applyIcon() called with null element.");
		return;
	}

	const iconName = MFA_ICONS[icon];
	if (!iconName) {
		console.warn(`Unknown icon key '${icon}' used in applyIcon().`);
		return;
	}

	try {
		setIcon(el, iconName);
		el.style.width = `${size}px`;
		el.style.height = `${size}px`;
	} catch (err) {
		console.error(`Failed to set icon '${iconName}'.`, err);
	}
}

/**
 * Creates a fully configured icon button.
 *
 * This is the recommended API for generating toolbar controls,
 * side-pane buttons, or action buttons anywhere in the plugin.
 */
export function createIconButton(
	parent: HTMLElement,
	icon: MFAIconName,
	{
		cls = "mfa-icon-button",
		size = DEFAULT_ICON_SIZE,
		tooltip,
		onClick,
	}: {
		cls?: string;
		size?: number;
		tooltip?: string;
		onClick?: (evt: MouseEvent) => void;
	} = {}
): HTMLButtonElement {
	const button = parent.createEl("button", { cls });

	applyIcon(button, icon, size);

	if (tooltip) {
		button.setAttribute("aria-label", tooltip);
		button.setAttribute("title", tooltip);
	}

	if (onClick) button.addEventListener("click", onClick);

	return button;
}
