import React, { useEffect, useState, useRef } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleTitle } from "../utils/handleTitle";
import { sendEmail } from "../api/email/email.api.js";
import { formatDateTime } from "../utils/formatDate.js";
import { Link } from "react-router-dom";

const InvitationLinkButton = ({ textToCopy }) => {
    const textAreaRef = useRef(null);

    const copyToClipboard = () => {
        if (!textAreaRef.current) return;

        // Create a textarea element dynamically
        const textArea = textAreaRef.current;
        textArea.value = textToCopy;

        // Select the text in the textarea
        textArea.select();

        try {
            // Use the Clipboard API to copy the selected text to the clipboard
            document.execCommand('copy');
            console.log('Text copied to clipboard!');
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        }
    };
    return (
        <>
            <textarea ref={textAreaRef} style={{ position: 'absolute', left: '-9999px' }} readOnly />
            <button
                className=" mt-5 w-full bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                onClick={copyToClipboard}>
                Copy link ivitation name
            </button>
        </>

    );
}


export default InvitationLinkButton;
