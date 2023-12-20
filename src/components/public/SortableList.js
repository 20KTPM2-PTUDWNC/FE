import React, { useState } from 'react';
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

    return (
        <>
            <div
                ref={setNodeRef}

                {...attributes}
                {...listeners}

                className="flex align-center border-2 hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow transition-all duration-300 transform "
                style={dragStyles}
            >

                {assignment.gradeId === grade._id && (

                    <Link to={`/class/assingment/${assignment._id}`}>


                        <p className="text-lg font-bold">{assignment.name} - {assignment.scale}%</p>


                    </Link>

                )}
            </div >

        </>
    )
}