export const supportedLanguages = (): string[] => {
    return ['en', 'es', 'cat'];
}

export const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}