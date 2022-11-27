// UserDetail Component for changing a user's details

// Import Modules
import React from "react";

// UserDetail Component
const UserDetail = (props: any) => {
    // Return User form
    return (
        <>
            <section className="card py-2 mt-2 p-2">
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
                <div className="row gy-2 gx-3 align-items-cleft">
                    <div className="col-auto">
                        <button onClick={props.onCancel} type="button" className="btn btn-primary">Close</button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default UserDetail
