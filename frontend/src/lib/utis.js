export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}
export function chunkArray(myArray, chunkSize) {
    const result = [];
    // myArray = myArray?.reverse();
    for (let i = 0; i < myArray.length; i += chunkSize) {
        const chunk = myArray.slice(i, i + chunkSize);
        chunk.push(null)
        result.push(chunk);

    }
    return result.reverse();
}
