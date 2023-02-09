import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsFillPersonPlusFill, BsPencilFill, BsFillTrashFill} from "react-icons/bs";
import { toolbarAction } from './dataGrid.const';

export function Toolbar ({ handleAddEditDelete, selectedUsers, searchText, handleSearch}) {
    return (
        <div className="p-3">
            <Row>
                <Col md={{span: 2, offset: 7}} className="text-end">
                    <Button size="sm" className="m-2" variant="outline-primary" onClick={() => handleAddEditDelete(toolbarAction.ADD)}> <BsFillPersonPlusFill/></Button>
                    <Button size="sm" className="m-2" variant="outline-info" onClick={() => handleAddEditDelete(toolbarAction.EDIT)} disabled={selectedUsers.size !== 1}><BsPencilFill /></Button>
                    <Button size="sm" className="m-2" variant="outline-danger" onClick={() => handleAddEditDelete(toolbarAction.DELETE)} disabled={selectedUsers.size === 0}><BsFillTrashFill /></Button>
                </Col>
                <Col md="3" className="pl-0">
                    <Form.Control className="mt-2" size="sm"
                                name="searchText" 
                                value={searchText} 
                                placeholder="Search by name"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                </Col>
            </Row>
        </div>
    );
}