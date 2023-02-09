import React from 'react';
import Table from 'react-bootstrap/Table';
import { UserRow } from './UserRow';
export function DataTable({ users = [], selectedUsers, selectHandler }) {
  return (
    <Table striped bordered hover className='table-fixed'>
      <thead>
        <tr>
            <th></th>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created On</th>
        </tr>
      </thead>
      <tbody>
        {
            users.length > 0 && users.map(user => <UserRow key={user.id} user={user} selectHandler={selectHandler} selectedUsers={selectedUsers}/> )
        }
      </tbody>
    </Table>
  );
}