
export const CHART_SIZE = {
    normal: {
        width: "50vw",
        height: "50vh",
    },
    large: {
        width: "80vw",
        height: "80vh",
    },
}

export function yearMonthDayHourFormatter(date: Date) {
    return `${date.getUTCHours()} ${date.getUTCDay()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
}

export function yearMonthDayFormatter(date: Date) {
    return `${date.getUTCDay()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
}

export function yearMonthFormatter(date: Date) {
    return `${date.getUTCMonth()}/${date.getUTCFullYear()}`
}

export function yearFormatter(date: Date) {
    return `${date.getUTCFullYear()}`
}

export const LABEL_FORMATTER = {
    "1d": (date: Date) => yearMonthDayHourFormatter(date),
    "5d": (date: Date) => yearMonthDayHourFormatter(date),
    "1mo": (date: Date) => yearMonthDayFormatter(date),
    "3mo": (date: Date) => yearMonthDayFormatter(date),
    "6mo": (date: Date) => yearMonthDayFormatter(date),
    "1y": (date: Date) => yearMonthFormatter(date),
    "2y": (date: Date) => yearMonthFormatter(date),
    "5y": (date: Date) => yearMonthFormatter(date),
    "10y": (date: Date) => yearMonthFormatter(date),
    "ytd": (date: Date) => yearMonthFormatter(date),
    "max": (date: Date) => yearFormatter(date),

}

export const createSvgElement = (name: string, attributes: { [key: string]: string }) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(attributes).forEach((k: string) => {
        elem.setAttribute(k, attributes[k]);
    })
    return elem
}


// Function to perform binary search
export function binarySearchClosest(arr: any[], target: number): number | undefined {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid].x === target) {
            return mid; // Target found
        } else if (arr[mid].x < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    // console.log("binarySearch :: target not found", "closest idx:", mid, "smaller:", arr[left], "bigger:", arr[right]);
    if (!arr[left]) return undefined// right
    if (!arr[right]) return undefined // left

    const distLeft = Math.abs(arr[left].x - target)
    const distRight = Math.abs(arr[right].x - target)

    return distLeft < distRight ? left : right
}
