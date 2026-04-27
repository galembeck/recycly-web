export const getInitials = (fullName?: string): string => {
	if (!fullName?.trim()) return "U";
	const parts = fullName.trim().split(/\s+/);
	if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
	return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};
