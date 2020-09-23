export const formatTimestamp = (time: number) => {
    const absTime = Math.abs(Math.round(time))
    const minutes = Math.floor(absTime / 60)
    const secondes = absTime % 60

    return `${time < 0 ? "-" : ""}${minutes < 10 ? "0" : ""}${minutes}:${
        secondes < 10 ? "0" : ""
    }${secondes}`
}
