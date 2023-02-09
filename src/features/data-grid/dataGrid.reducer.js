import {UserActions} from './dataGrid.const';

export function usersReducer(users, action ) {
    const { type, data } = action;
    switch( type ) {
        case UserActions.USER_ADD:
            return [
                ...users,
                {
                    ...data,
                    createdOn: new Date().toUTCString(),
                }
            ];
        case UserActions.USER_EDIT:
            const {id} = data;
            const index = users.findIndex((user) => user.id === id);
            users[index] = {...users[index], ...data};
            return users;
        
        case UserActions.USER_DELETE:
            return users.filter(user => !data.includes(user.id));
        default:
            return users;
    }
}