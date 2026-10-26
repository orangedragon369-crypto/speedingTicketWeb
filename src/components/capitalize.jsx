export default function capitalize(words, result=""){
    words.split("").map((letter, count)=>{
        if (/[A-Z]/.test(letter)) result += " ";
        count === 0 ? result += letter.toUpperCase(): result += letter;
    })
    return result
};