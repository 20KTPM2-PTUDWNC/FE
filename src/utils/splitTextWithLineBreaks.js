import React from "react";

export function limitDescription(description, maxLength) {
    if (!description || typeof description !== "string") {
        return "";
    }

    const words = description.trim().split(" ");
    let currentLineLength = 0;
    let result = "";

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordLength = word.length;

        if (currentLineLength + wordLength + 1 <= maxLength) {
            // Add the word to the current line
            result += `${word} `;
            currentLineLength += wordLength + 1;
        } else {
            // Start a new line with the word
            result += `\n${word} `;
            currentLineLength = wordLength + 1;
        }
    }

    return result.trim();
}

export function splitTextWithLineBreaks(text) {
    // Check text is empty or not
    if (!text) {
        return "";
    }
    if (!text.includes("\n")) {
        return text;
    }
    return text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
}
