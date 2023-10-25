export function prettify(num) {
    if (typeof num === "string") {
        // Remove all non-numeric characters
        const cleanedNumber = num.replace(/\D/g, "");

        // Check if the cleaned number has the correct length
        if (cleanedNumber.length === 12) {
            const matches = cleanedNumber.match(/^998(\d{2})(\d{3})(\d{2})(\d{2})$/);

            if (matches) {
                return `+998 (${matches[1]}) ${matches[2]} ${matches[3]} ${matches[4]}`;
            }
        }
    }

    return "Invalid number";
}
export function prettifySum(num) {
    if (typeof num === "number") {
        return num
            .toString()
            .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ",");
    } else {
        return num.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ",") || 0;
    }
}
export function formatDate(dateString, locale) {
    const date = new Date(dateString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
}
export function formatHexColor(hexColor) {
    if (typeof hexColor === "string" && /^#([0-9A-Fa-f]{3}){1,2}$/.test(hexColor)) {
        return hexColor.replace(/^#/, '', "");
    } else {
        return ''; // Return an empty string or handle the invalid input accordingly
    }
}

export function isEmpty(item) {
    return item ? item : "Пусто";
}