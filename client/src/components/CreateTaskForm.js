import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function CreateTaskForm({toShow, setToShow, projectId, setTasksList, socket}){

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [importance, setImportance] = useState('Medium');
    const [deadline, setDeadline] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    const { teamId } = useParams();

    let [teamMembers, setTeamMembers] = useState([]);
    useEffect(() => {
        if (teamId) {
            axios.get(`/api/teams/${teamId}/users`)
                .then(res => {
                    const { usersArrayTemp } = res.data;
                    setTeamMembers(usersArrayTemp);
                })
        }
    }, [teamId])

    const handleCheckboxChange = event => {
        let updatedList = [...assignedUsers];
        if (event.target.checked) {
            updatedList = [...assignedUsers, event.target.value];
        } else {
            updatedList.splice(assignedUsers.indexOf(event.target.value), 1);
        }

        setAssignedUsers(updatedList);
    };

    async function handleCreateTaskButton(){
        axios.post('/api/tasks/create',{
            taskName,
            description,
            status: "Started",
            project:projectId,
            importance,
            deadline,
            assignedUsers
        }).then(response=>{
            setTasksList(tasks  => [...tasks, response.data])
            socket.emit('addTask', response.data)
            clearInputs();
            setToShow(false);
        }).catch(err=>{
            console.log(err);
        })
    }

    function clearInputs(){
        setTaskName('');
        setDeadline('');
        setDescription('');
        setImportance('Medium');
    }

    //USED FOR DEBUGGING
    /*useEffect(() => {
        console.log("assignedUsers: " + assignedUsers)
    }, [assignedUsers])*/

    function renderUsersList() {
        return (
            teamMembers.map((user, index) => {
                return (
                    <div key={index}>
                        <input type="checkbox" id={user} value={user} onChange={handleCheckboxChange} />
                        <label htmlFor={user}>{user}</label>
                    </div >
                )
            })
        )
    }

    return (
        <FormContainer style={{ display: toShow ? 'flex' : 'none' }} onClick={()=>{clearInputs(); setToShow(false)}}>
            <div className="form-container" onClick={e=>e.stopPropagation()}>
                <h1>Add task</h1>
                <div>
                    <label>
                        Task:
                    </label>
                    <input
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        type="text"
                        placeholder="Task Name" />
                </div>
                <div>
                    <label>
                        Task Description: 
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description" />
                </div>
                <div>
                    <label>
                        Importance: 
                    </label>
                    <select value={importance} onChange={e=>setImportance(e.target.value)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div>
                    <label>
                        Deadline
                    </label>
                    <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)}/>
                </div>

                <div className="team-members-list">
                    <h3>Assign Members</h3>

                    <div>
                        {renderUsersList()}
                    </div>
                </div>

                <button onClick={handleCreateTaskButton}>Create Task</button>
            </div>

  
        </FormContainer>
    )
}


const FormContainer = styled.div`
    z-index: 1;
    position: absolute;
    top:0;
    left:0;
    filter: alpha(opacity=60);
    display: flex;
    min-height: 100vh;
    min-width: 100%;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    
    .form-container{
        display:flex;
        flex-direction: column;
        background-color: white;
        border: 2px solid black;
        border-radius: 8px;
        min-width: 300px;
        max-width: 800px;
        padding: 32px;
    }

    .form-container div:not(.team-members-list div) {
        padding:  8px;
        margin: 8px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .team-members-list h3 {
        margin-right: 80px;
    }

    label {
        display: inline-block;
        padding: 8px 4px;
    }

    button, input, textarea{
        border: 1px solid black;
        border-radius: 8px;
        display: inline-block;
        font-size: 16px;
        padding: 8px;
    }

    input{
        margin: 14px 20px 14px 0;
        padding: 8px;
    }

    button{
        cursor: pointer;
        margin: 8px 0;
        width: 100%;
    }

`;