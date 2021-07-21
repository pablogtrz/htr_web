import { CHARACTERS, TRANSCRIPTIONS } from '../constants/characters'

export function ctcGreedyDecoder(encoded: CTCEncodedArray) {
  const temporalSerie = encoded[0]
  const indexes = []

  for (let i = 0; i < temporalSerie.length; i++) {
    const temporalProbability = temporalSerie[i]
    const maxValue = Math.max(...temporalProbability)
    const index = temporalProbability.indexOf(maxValue)
    indexes.push(index)
  }

  console.log(indexes)
  console.log(toLetters(indexes))

  return transcript(toLetters(indexes))
}

export type CTCEncodedArray = number[][][]

export default ctcGreedyDecoder

function toLetters(values: number[]) {
  return values.filter((val) => val != 83).map((val) => CHARACTERS[val])
}

function transcript(letters: string[]) {
  return letters
    .map((letter) => {
      return Object.keys(TRANSCRIPTIONS).includes(letter)
        ? (TRANSCRIPTIONS as Record<string, string>)[letter]
        : letter
    })
    .join('')
}
