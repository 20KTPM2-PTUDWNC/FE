/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Logo from "../../assets/logo.png";
import { useDrag, useDrop } from 'react-dnd';
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Options from "../../components/app/Options.jsx";

import { formatDate, formatDateLeft } from "../../utils/formatDate.js";
import { splitTextWithLineBreaks } from "../../utils/splitTextWithLineBreaks.js";
import { showClassDetail, showMemberList } from "../../api/class/class.api.js";
import { addGradeComposition, deleteGradeComposition, showGradeStructure } from "../../api/grade/grade.api.js";
import { addAssignment, showAssignmentList } from "../../api/assignment/assignment.api.js";
import Cookies from "universal-cookie";
import { getCookies, getUser } from "../../features/user";
import AddTopicForm from "../../components/app/AddTopicForm";
import AddAssignmentForm from "../../components/app/AddAssignmentForm";
import InvitationLinkButton from "../../components/app/InvitationLinkButton";
import InvitationByEmailForm from "../../components/app/InvitationByEmailForm";
import ExportStudentListForm from "../../components/app/ExportStudentListForm";
import EditGradeCompForm from "../../components/app/EditGradeCompForm";
import { GrScorecard } from "react-icons/gr";
import { SortableItem } from "../../components/public/SortableList";
// const Assignment = ({ assignment, isDragging, grade }) => {

//     const [{ opacity }, drag] = useDrag({
//         type: 'assignment',
//         item: { id: assignment._id, type: 'assignment', gradeId: grade._id }, // Include gradeId
//         collect: (monitor) => ({
//             opacity: monitor.isDragging() ? 0.5 : 1,
//         }),
//     });

//     return (
//         <div ref={drag} style={{ opacity }}>
//             {assignment.gradeId === grade._id && (
//                 <Link to={`/class/assingment/${assignment._id}`}>
//                     <div className="relative flex align-center hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow">
//                         <p className="text-lg font-bold">{assignment.name} - {assignment.scale}%</p>
//                     </div>
//                 </Link>
//             )}
//         </div>
//     );
// };
const Assignment = ({ assignment, isDragging, grade }) => {
    const opacity = isDragging ? 0.5 : 1;

    return (
        <div style={{ opacity }}>
            {assignment.gradeId === grade._id && (
                <Link to={`/class/assingment/${assignment._id}`}>
                    <div className="relative flex align-center hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow">
                        <p className="text-lg font-bold">{assignment.name} - {assignment.scale}%</p>
                    </div>
                </Link>
            )}
        </div>
    );
};

const SortableAssignment = ({ assignment, index, moveAssignment, grade }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'assignment',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'assignment',
        hover: (item, monitor) => {
            if (item.index !== index) {
                moveAssignment(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))}>
            <Assignment assignment={assignment} isDragging={isDragging} grade={grade} />
        </div>
    );
};

function ClassDetails() {
    const user = getUser()
    const params = useParams();
    const classId = params.classId;
    const [job, setJob] = useState({});
    const [showAssignmentOption, setShowAssignmentOption] = useState(false);
    const [showTopicOption, setShowTopicOption] = useState(false);
    const [showAddTopic, setShowAddTopic] = useState(false);
    const [showAddAssigment, setShowAddAssigment] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false);
    const [showApply, setShowApply] = useState(false);
    const [showMemberListToption, setShowMemberListToption] = useState(false)
    const [showInvitationByEmailForm, setShowInvitationByEmailForm] = useState(false)
    const [showExportStudentListForm, setShowExportStudentListForm] = useState(false)
    const [showEditGradeComposition, setShowEditGradeComposition] = useState(false)

    const [tab, setTab] = useState(1);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [classDetail, setClassDetail] = useState({});
    const [memberList, setMemberList] = useState([]);
    const [gradeList, setGradeList] = useState([]);
    const [assignmentList, setAssignmentList] = useState([]);
    const [action, setAction] = useState(0);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [showStudentGrade, setShowStudentGrade] = useState(false);
    const cookie = new Cookies()

    const addTopic = () => {
        alert("add topic");
        setShowAssignmentOption(false);
        setShowAddTopic(true)

    }
    const addAssignment = () => {
        alert("add assignment");
        setShowAssignmentOption(false);
        setShowTopicOption(false)
        setShowAddAssigment(true)
    }
    const exportStudentList = () => {
        setShowMemberListToption(false)
        setShowExportStudentListForm(true)
    }
    const editGradeComposition = () => {
        setShowEditGradeComposition(true)
        setShowTopicOption(false)
    }
    // const addGradeStructure = () => {
    //     alert("add grade structure");
    // }
    const assignmentOption = [
        {
            name: "Add Topic",
            todo: addTopic
        },
        {
            name: "Add Assignment",
            todo: addAssignment
        },
        // {
        //     name: "Add Topic",
        //     todo: addGradeStructure
        // }
    ]
    const memberListOption = [
        {
            name: "Export Student List",
            todo: exportStudentList
        }
    ]
    const topicOption = [
        {
            name: "Add Assignment",
            todo: addAssignment
        },
        {
            name: "Edit Grade Composition",
            todo: editGradeComposition
        }
        // {
        //     name: "Add Topic",
        //     todo: addGradeStructure
        // }
    ]
    const closeTab = {
        asssignmentOptions: {
            close: function () {
                setShowAssignmentOption(false)
            }
        },
        topicOptions: {
            close: function () {
                setShowTopicOption(false)
            }
        },
        topicTab: {
            close: function () {
                setShowTopicOption(true)
                setShowAddTopic(false)

            }
        },
        assignmentTab: {
            close: function () {

                setShowAddAssigment(false)

            }
        },
        ivitationEmail: {
            close: function () {
                setShowInvitationByEmailForm(false)

            }
        },
        memberListForm: {
            close: function () {
                setShowMemberListToption(false)
            }
        },
        exportStudentList: {
            close: function () {
                setShowExportStudentListForm(false)
                setShowMemberListToption(true)
            }
        },
        editGradeComposition: {
            close: function () {
                setShowEditGradeComposition(false)
                setShowTopicOption(true)
            }
        }
    }
    // useEffect(() => {

    //     loadImg();


    //     return () => {
    //         console.log("useEffect done");
    //     }
    // }, [])

    async function loadImg() {

        const res = await fetch(`https://api.unsplash.com/search/photos?query=""&client_id=V5Xdz9okJnQnuvIQFN0OjsUaeExGt67obOT3bmCIq0o`)
        const imgJson = await res.json()
        setImages(imgJson.results)

    }

    useEffect(() => {
        if (showAssignmentOption
            || showTopicOption
            || showApply
            || showAddAssigment
            || showAddTopic
            || showExportStudentListForm
            || showInvitationByEmailForm) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showAssignmentOption,
        showUpdate,
        showApply,
        showAddAssigment,
        showAddTopic,
        showTopicOption,
        showExportStudentListForm,
        showInvitationByEmailForm
    ]);

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/userClass/${classId}` });
            getClassDetail(classId);
            getMemberList(classId);
            getGradeList(classId);
            if (gradeList.length > 0) {
                gradeList.forEach((grade) => {
                    getAssignmentList(grade._id);
                });
            }
        }

    }, [action]);

    useEffect(() => {
        if (gradeList.length > 0) {
            gradeList.forEach((grade) => {
                getAssignmentList(grade._id);
            });
        }
    }, [gradeList]);
    const handleDelete = async (e, gradeId) => {
        e.preventDefault();

        try {
            const response = await deleteGradeComposition(classId, gradeId);
            if (response.status === 200) {
                alert("Delete successfully!");

            }
        } catch (error) {
            alert(error.response.data.message)
            console.log(error);

        }
        setAction(1 - action)
    };
    async function getClassDetail(classId) {
        try {
            const response = await showClassDetail(classId);

            if (response.status === 200) {
                console.log(response.data)
                setClassDetail(response.data)
            }
        } catch (error) {
            console.log("Error123: ", error);

        }
    }

    async function getMemberList(classId) {
        try {
            const response = await showMemberList(classId);

            if (response.status === 200) {
                console.log(response.data)
                setMemberList(response.data)
            }
        } catch (error) {
            console.log("Error123: ", error);

        }
    }

    async function getGradeList(classId) {
        try {
            const response = await showGradeStructure(classId);

            if (response.status === 200) {
                const gradeStructures = response.data;
                gradeStructures.sort((a, b) => a.sort - b.sort);
                console.log(gradeStructures);
                setGradeList(gradeStructures);
            }
        } catch (error) {
            console.log("Error123: ", error);

        }
    }

    async function getAssignmentList(gradeId) {
        setAssignmentList([]);

        try {
            const response = await showAssignmentList(gradeId);

            if (response.status === 200) {
                console.log(response.data);

                // Cập nhật trạng thái với các assignment tương ứng với grade cụ thể
                setAssignmentList(prevAssignmentList => [
                    ...prevAssignmentList.filter(assignment => assignment.gradeId !== gradeId),
                    ...response.data.map(assignment => ({ ...assignment, gradeId })),
                ]);
            }
        } catch (error) {
            console.log("Error123: ", error);
        }
    }

    const moveAssignment = (dragIndex, hoverIndex) => {
        const draggedAssignment = assignmentList[dragIndex];

        setAssignmentList((prevAssignments) => {
            const newAssignments = [...prevAssignments];
            newAssignments.splice(dragIndex, 1);
            newAssignments.splice(hoverIndex, 0, draggedAssignment);
            return newAssignments;
        });
    };
    function handleDragEnd(e) {
        console.log(e);
        const { active, over } = e;
        console.log("ACTIVE: " + active.id);
        console.log("OVER :" + over.id);

        if (active.id !== over.id) {
            setAssignmentList((items) => {
                const oldIndex = items.findIndex((i) => i._id === active.id);
                const newIndex = items.findIndex((i) => i._id === over.id);
                return arrayMove(items, oldIndex, newIndex);
                // items: [2, 3, 1]   0  -> 2
                // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1] 
            });

        }
        // if (!e.destination) return;

        // const items = Array.from(assignmentList);
        // const [reorderedItem] = items.splice(e.source.index, 1);
        // items.splice(e.destination.index, 0, reorderedItem);

        // setAssignmentList(items);
        console.log(e);
    }

    if (classDetail && memberList && gradeList && assignmentList) {
        return (
            <div className="w-full h-full text-black overflow-hidden">
                <div className="pt-[120px] pb-[50px] flex flex-col justify-between items-center w-full h-full">
                    <div className="max-w-[1100px] w-full grid grid-cols-2 gap-8">
                        <div className="pb-8 pl-4">
                            <div className="relative ">

                                <div className="absolute top-0 right-[-450px] flex  justify-between items-center">
                                    {tab === 1 && (<>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#ff4757] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(1)}
                                        >
                                            <p>Overall</p>
                                        </button>

                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(2)}
                                        >
                                            <p>Assignments</p>
                                        </button>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(3)}
                                        >
                                            <p>Member List</p>
                                        </button>
                                        <div className="ml-5 mt-2">
                                            <button
                                                className="font-bold hover:opacity-90 rounded duration-200"
                                                onClick={() => setShowStudentGrade(true)}
                                            >
                                                <GrScorecard className="text-[#5f27cd] duration-200" size={"30px"} />
                                            </button>
                                        </div>
                                    </>
                                    )}
                                    {tab === 2 && (<>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(1)}
                                        >
                                            <p>Overall</p>
                                        </button>

                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#ff4757] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(2)}
                                        >
                                            <p>Assignments</p>
                                        </button>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(3)}
                                        >
                                            <p>Member List</p>
                                        </button>
                                        <div className="ml-5 mt-2">
                                            <button
                                                className="font-bold hover:opacity-90 rounded duration-200"
                                                onClick={() => setShowAssignmentOption(true)}
                                            >
                                                <IoSettingsOutline className="text-[#5f27cd] duration-200" size={"30px"} />
                                            </button>
                                        </div>
                                    </>
                                    )}
                                    {tab === 3 && (<>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(1)}
                                        >
                                            <p>Overall</p>
                                        </button>

                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(2)}
                                        >
                                            <p>Assignments</p>
                                        </button>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#ff4757] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(3)}
                                        >
                                            <p>Member List</p>
                                        </button>
                                        <div className="ml-5 mt-2">
                                            <button
                                                className="font-bold hover:opacity-90 rounded duration-200"
                                                onClick={() => setShowMemberListToption(true)}
                                            >
                                                <IoSettingsOutline className="text-[#5f27cd] duration-200" size={"30px"} />
                                            </button>
                                        </div>
                                    </>
                                    )}

                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="max-w-[1100px] w-full grid sm:grid-cols-2 gap-10 px-4 font-sans">
                        <div className="text-1xl px-5 m-5">
                            <div className="flex justify-center">
                                <img
                                    src={Logo}
                                    alt="Class details"
                                    className="mt-3 w-60 h-60 "
                                />
                            </div>
                            <div className="flex justify-center pt-4 pb-2">
                                <Link to={`/company_profile/${job?.userId?._id}`}>
                                    <p className="text-3xl text-center text-[#5f27cd] ">
                                        {classDetail.name}
                                    </p>
                                </Link>
                            </div>
                            <div className="flex justify-center mt-4 p-2 border-2 border-[#5f27cd] rounded-lg">

                                <p className="text-center text-2xl text-[#5f27cd]">
                                    {splitTextWithLineBreaks(`Class ID\n ${classDetail.code}`)}
                                </p>

                            </div>
                            <div className="flex justify-center mt-4 p-2">

                                <InvitationLinkButton></InvitationLinkButton>

                            </div>
                            <div className="flex justify-center mt-2 p-2">
                                <button
                                    className=" mt-2 w-full bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                                    onClick={() => setShowInvitationByEmailForm(true)}>
                                    Invitation by email
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="text-base mt-10">
                                {tab === 1 && (
                                    <div>
                                        {gradeList.map((grade) =>
                                            <div key={grade._id}>
                                                <Link to="/class/classId">
                                                    <div class="relative flex align-center  hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow">
                                                        <p className="text-lg font-bold">{grade.name} - {grade.gradeScale}%</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {tab === 2 && (
                                    <div>
                                        {gradeList.map((grade) =>
                                            <div key={grade._id} className="relative">
                                                <div >
                                                    <div className="flex ml-5 mt-2">
                                                        <p className="text-4xl mr-5 font-bold inline text-[#5f27cd] border-b-4 border-[#ff4757]">{grade.name} - {grade.gradeScale}%</p>
                                                        <button
                                                            className="font-bold hover:opacity-90 rounded duration-200"
                                                            onClick={() => {
                                                                setSelectedGrade(grade); // Set the selected grade
                                                                setShowTopicOption(true);
                                                            }}

                                                        >
                                                            <IoSettingsOutline className="text-[#5f27cd] duration-200" size={"20px"} />
                                                        </button>
                                                        <button
                                                            className=" ml-3 font-bold hover:opacity-90 rounded duration-200"
                                                            onClick={(e) => handleDelete(e, grade._id)}
                                                        >
                                                            <CiCircleMinus className="text-[#5f27cd] duration-200" size={"20px"} />
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* <DragDropContext onDragEnd={handleDragEnd}>
                                                    <Droppable droppableId="droppable-1">
                                                        {(provided, _) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.droppableProps}
                                                            >
                                                                {assignmentList.map((assignment, i) =>
                                                                    <Draggable
                                                                        key={assignment._id}
                                                                        draggableId={assignment._id}
                                                                        index={i}
                                                                        className="flex flex-row"
                                                                    >
                                                                        {(provided, _) => {
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >

                                                                                {assignment.gradeId === grade._id && (
                                                                                    <Link to={`/class/assingment/${assignment._id}`}>
                                                                                        <div className="relative flex align-center hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow">
                                                                                            <p className="text-lg font-bold">{assignment.name} - {assignment.scale}%</p>
                                                                                        </div>
                                                                                    </Link>
                                                                                )}
                                                                            </div>
                                                                        }}


                                                                    </Draggable>
                                                                )}
                                                                {provided.placeholder}
                                                            </div>

                                                        )}
                                                    </Droppable>
                                                </DragDropContext> */}
                                                {/* {assignmentList.map((assignment) =>
                                                    <div key={assignment._id}>
                                                        {assignment.gradeId === grade._id && (
                                                            <Link to={`/class/assingment/${assignment._id}`}>
                                                                <div className="relative flex align-center hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow">
                                                                    <p className="text-lg font-bold">{assignment.name} - {assignment.scale}%</p>
                                                                </div>
                                                            </Link>
                                                        )}
                                                    </div>
                                                )} */}
                                                <DndContext
                                                    collisionDetection={closestCenter}
                                                    onDragEnd={handleDragEnd}
                                                >


                                                    <SortableContext
                                                        items={assignmentList}
                                                        strategy={verticalListSortingStrategy}
                                                    >

                                                        {assignmentList.map((assignment) =>
                                                            <SortableItem key={assignment._id} assignment={assignment} grade={grade} />
                                                        )}

                                                    </SortableContext>

                                                </DndContext>
                                            </div>
                                        )}

                                    </div>
                                )}
                                {tab === 3 && (
                                    <div>
                                        {memberList && memberList.teachers && memberList.teachers.map((teacher) =>
                                            <div key={teacher._id}>
                                                <Link to={`/class/${classId}`}>
                                                    <div class="relative flex align-center  hover:bg-[#5f27cd] hover:text-white my-8 py-3 px-6 rounded-lg shadow">
                                                        <p className="text-lg font-bold">{teacher.name} - Teacher</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}

                                        {memberList && memberList.students && memberList.students.map((student) =>
                                            <div key={student._id}>
                                                <Link to={`/class/${classId}`}>
                                                    <div class="relative flex align-center  hover:bg-[#5f27cd] hover:text-white my-8 py-3 px-6 rounded-lg shadow">
                                                        <p className="text-lg font-bold">{student.name} - Student</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {showInvitationByEmailForm && <InvitationByEmailForm onClose={closeTab.ivitationEmail.close} />}
                {showAssignmentOption &&
                    <Options
                        data={assignmentOption}
                        onClose={closeTab.asssignmentOptions.close}
                    />}
                {showAddTopic &&
                    <AddTopicForm
                        onClose={closeTab.topicTab.close}
                        onClick={() => setAction(1 - action)}
                    />}

                {showAddAssigment && selectedGrade && (
                    <AddAssignmentForm
                        onClose={closeTab.assignmentTab.close}
                        onClick={() => setAction(1 - action)}
                        _gradeStructureId={selectedGrade._id} // Pass the selected grade's id
                    />
                )}
                {showEditGradeComposition && selectedGrade && (
                    <EditGradeCompForm
                        onClose={closeTab.editGradeComposition.close}
                        onClick={() => setAction(1 - action)}
                        _gradeStructureId={selectedGrade._id}
                        oldData={{
                            name: selectedGrade.name,
                            gradeScale: selectedGrade.gradeScale,
                        }}
                    />
                )}

                {/* {gradeList.map((grade) => (
                    <div key={grade._id}>
                        {showAddAssigment && (
                            <AddAssignmentForm
                                onClose={closeTab.assignmentTab.close}
                                onClick={() => setAction(1 - action)}
                                _gradeStructureId={grade._id} // Truyền grade._id cho mỗi grade
                            />
                        )}
                        {showEditGradeComposition &&
                            <EditGradeCompForm
                                onClose={closeTab.editGradeComposition.close}
                                onClick={() => setAction(1 - action)}
                                _gradeStructureId={grade._id}
                                oldData={{
                                    name: grade.name,
                                    gradeScale: grade.gradeScale,
                                }}
                            />
                        }
                    </div>
                ))} */}

                {showTopicOption &&
                    <Options
                        data={topicOption}
                        onClose={closeTab.topicOptions.close}
                    />}
                {showMemberListToption &&
                    <Options data={memberListOption}
                        onClose={closeTab.memberListForm.close}

                    />}
                {showExportStudentListForm &&
                    <ExportStudentListForm
                        onClose={closeTab.exportStudentList.close}
                        classId={classId}
                    />}

            </div>
        );
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}

export default ClassDetails;