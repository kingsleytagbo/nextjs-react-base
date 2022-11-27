// UserDetail Component for changing a user's details

// Import Modules
import React, { useState } from "react";

// UserDetail Component
const UserDetail = (props: any) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        setConfirmDelete(true);
    }

    const handleConfirmDelete = () => {
        props.onConfirmDelete(props.ITCC_UserID);
    }
    // Return User form
    return (
        <>
            <section className="card py-2 mt-2 p-2">
                <h3 className='card-title text-center text-dark mt-3'><i className="bi bi-person"></i> {props.title}</h3>
                <div className="row">
                    <div className="col-md-4">
                        <label>UserName</label>
                        <p className="text-dark">{props.UserName}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Password</label>
                        <p className="text-dark">{props.Password}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Email</label>
                        <p className="text-dark">{props.EmailAddress}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="username">FirstName</label>
                        <p className="text-dark">{props.FirstName}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="username">LastName</label>
                        <p className="text-dark">{props.LastName}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <button onClick={props.onCancel} type="button" className="btn btn-primary">Close</button>
                    </div>
                    <div className="col-6">
                        { (props.delete && !confirmDelete) &&
                            <button onClick={handleDelete} type="button" className="btn btn-danger">Delete</button>
                        }
                        {confirmDelete &&
                            <button onClick={handleConfirmDelete} type="button" className="btn btn-danger">Confirm Delete</button>
                        }
                    </div>
                </div>
            </section>

        </>
    )
}

export default UserDetail
