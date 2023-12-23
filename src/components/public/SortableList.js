import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import Draggable from 'react-draggable'; // The default
export function SortableItem({ assignment, grade }) {
    // props.id
    // JavaScript

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: assignment._id });

    // const style = {
    //     transition: isDragging ? 'none' : transition || 'none',
    //     transform: CSS.Transform.toString(transform),
    // }
    const dragStyles = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const initialMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (event) => {
                const newPosition = {
                    x: position.x + event.clientX - initialMousePos.current.x,
                    y: position.y + event.clientY - initialMousePos.current.y,
                };
                setPosition(newPosition);
                initialMousePos.current = { x: event.clientX, y: event.clientY };
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, position]);

    const handleMouseDown = (event) => {
        event.preventDefault();
        setIsDragging(true);
        initialMousePos.current = { x: event.clientX, y: event.clientY };
    };
    return (
        <>
            <div
                ref={setNodeRef}

                // style={{
                //     position: 'relative',
                //     top: `${position.y}px`,
                //     left: `${position.x}px`,
                //     cursor: isDragging ? 'grabbing' : 'grab',
                // }}
                onMouseDown={handleMouseDown}
                {...attributes}
                {...listeners}
            >

                {assignment.gradeId === grade._id && (

                    <Link to={`/class/assingment/${assignment._id}`}
                        className="flex align-center border-2 hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow transition-all duration-300 transform "
                    >


                        <p className="text-lg font-bold">{assignment.name} - {assignment.scale}%</p>


                    </Link>

                )}
            </div >

        </>
    )
}