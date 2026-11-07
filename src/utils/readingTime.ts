/** Rough reading time in minutes for a Markdown body (~220 words per minute). */
export function readingTime(body: string | undefined): number {
	const words = (body ?? '').replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}
