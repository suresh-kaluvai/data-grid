import React, { useReducer, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DataTable } from './DataTable';
import { usersReducer } from './dataGrid.reducer';
import { initialUsers, defaultUserData, UserActions, toolbarAction } from './dataGrid.const';
import { Toolbar } from './Toolbar';
import { UserForm } from './UserForm';
import './dataGrid.css';

// using to generate unique Id
let idCounter = 1;

export function DataGrid() {
    const [ users, dispatch] = useReducer(usersReducer, initialUsers);
    const [ selectedUsers, setSelectedUsers ] = useState(new Set());
    const [ defaultOrEditUserInfo, setDefaultOrEditUserInfo ] = useState(defaultUserData);
    const [ showForm, setShowForm ] = useState(false);
    const [ searchText, setSearchText ] = useState('');

    const selectHandler = (value) => {
        value = parseInt(value);
        setSelectedUsers(checkedList => {
            checkedList = new Set([...checkedList]);
            if(checkedList.has(value)) {
                checkedList.delete(value)
            } else {
                checkedList.add(value);
            }
            return checkedList;
        });
    };

    const handleUserFormSubmit = (userData) => {
        if(userData.id) {
            dispatch({type: UserActions.USER_EDIT, data: userData});
        } else {
            userData['id'] = ++idCounter;
            dispatch({type: UserActions.USER_ADD, data: userData});
        }

        setDefaultOrEditUserInfo(defaultUserData);  
        setShowForm(false);
    };

    const handleAddEditDelete = (actionType) => {
        let shouldOpenForm = true;
        if(actionType === toolbarAction.EDIT) {
            const selectedUserId = [...selectedUsers][0];
            setDefaultOrEditUserInfo(users.filter(user => user.id === selectedUserId)[0]);
        } else if(actionType === toolbarAction.DELETE) {
            dispatch({type: UserActions.USER_DELETE, data: [...selectedUsers]});
            shouldOpenForm = false;
        } else {
            setDefaultOrEditUserInfo(defaultUserData);
        }
        setShowForm(shouldOpenForm);
        setSelectedUsers(new Set());
    }
    
    // Search Logic
    let filteredUsers = [];
    if(searchText) {
        const lcSearchText = searchText.toLocaleLowerCase();

        filteredUsers = users.filter(({firstName, lastName}) => {
            const lcFirstName = firstName.toLocaleLowerCase();
            const lcLastName = lastName.toLocaleLowerCase();
            return (lcFirstName.includes(lcSearchText) || lcLastName.match(lcSearchText))
        });
    }

    return (
        <div className="data-grid-custom">
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Toolbar
                                handleAddEditDelete={handleAddEditDelete}
                                selectedUsers={selectedUsers}
                                searchText={searchText}
                                handleSearch={(value)=>setSearchText(value)}
                            />
                            {
                                showForm && <UserForm 
                                    userData={defaultOrEditUserInfo}
                                    handleSubmit={handleUserFormSubmit}
                                    cancelForm={(value) => setShowForm(value)}
                                />
                            }
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            users.length > 0 ? 
                                <DataTable
                                    users={searchText ? filteredUsers :  users}
                                    selectedUsers={selectedUsers}
                                    selectHandler={selectHandler}></DataTable>
                                : <p>Add users to see the data.</p>
                        } 
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
