export const capitalize = (word: string): string => {
    return word.replace(word[0], word[0].toUpperCase())
}

export const pickExistingAsNumber = (one: string | number | undefined, another: string | number | undefined): number => {
    if (one) {
        return Number(one)
    }

    return Number(another)
}
