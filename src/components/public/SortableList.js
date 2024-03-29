import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";

export function SortableItem({ assignment, grade, classId }) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: assignment._id });

    const dragStyles = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <>
            {assignment.gradeId === grade._id && (

                <div
                    ref={setNodeRef}
                    style={dragStyles}
                    draggable={true}
                    {...attributes}
                    {...listeners}

                >



                    <Link to={`/class/${classId}/${assignment._id}`}

                        className="flex align-center border-2 hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow"
                    >


                        <p className="text-lg font-bold">{assignment.name} - {assignment.scale}%</p>


                    </Link>


                </div>
            )}
        </>
    )
}