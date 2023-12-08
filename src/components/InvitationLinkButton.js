import React, { useEffect, useState, useRef } from "react";
import { createInvitationLink } from "../api/class/class.api.js";

import { getCookies, getUser } from "../features/user";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

const InvitationLinkButton = () => {
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const params = useParams();
    const classId = params.classId;
    const role = 0;

    const [invitationLink, setInvitationLink] = useState('');
    const textAreaRef = useRef(null);
    const [buttonText, setButtonText] = useState('Invitation by link');

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        } else {
            cookie.set('token', getCookies(), { path: `/v1/class/createInvitationLink` });
            generateInvitationLink();
        }
    }, []);

    const generateInvitationLink = async () => {
        try {
            let newLink = {
                classId,
                role
            };

            const response = await createInvitationLink(newLink);
            setInvitationLink(response.data); // response.data chứa giá trị cần

        } catch (error) {
            console.error('Error generating invitation link:', error);
        }
    };

    const copyToClipboard = (e) => {
        e.preventDefault();

        if (!textAreaRef.current) return;

        // Create a textarea element dynamically
        const textArea = textAreaRef.current;

        textArea.value = invitationLink.link;

        // Select the text in the textarea
        textArea.select();

        try {
            // Use the Clipboard API to copy the selected text to the clipboard
            document.execCommand('copy');
            setButtonText('Link copied!');
            console.log('Text copied to clipboard:', invitationLink.link);
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        }
    };

    return (
        <>
            <textarea ref={textAreaRef} style={{ position: 'absolute', left: '-9999px' }} readOnly />
            <button
                className=" mt-5 w-full bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                onClick={copyToClipboard}
                disabled={buttonText === 'Link copied!'}
            >
                {buttonText}
            </button>
        </>
    );
}
export default InvitationLinkButton;
