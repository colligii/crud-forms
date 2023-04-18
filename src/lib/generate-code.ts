const generateCode = () => {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let code = "";
    let lastLetter = "";

    for(let i = 0; i < 6; i++) {

        lastLetter = letters[Math.floor(Math.random() * letters.length)]

        code+=lastLetter

        letters = letters.replace(lastLetter, "");
        lastLetter = ""

    }

    return code;

}

export default generateCode