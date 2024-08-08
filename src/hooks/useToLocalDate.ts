export function useToLocalDate(date: number) {
	const newDate = new Date(date * 1000).toLocaleDateString();
	return newDate;
}