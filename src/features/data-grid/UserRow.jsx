import React from 'react';

export function UserRow({user, selectHandler, selectedUsers}) {
    const {id, firstName, lastName, email, status, createdOn } = user;
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    id={`userCheck-${id}`}
                    value={id}
                    checked={selectedUsers.has(id)}
                    onChange={(e) => selectHandler(e.target.value)}
                />
            </td>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{status}</td>
            <td>{createdOn}</td>
        </tr>
    );
}
