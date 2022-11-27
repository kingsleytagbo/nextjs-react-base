// UserDetail Component for changing a user's details

// Import Modules
import React, { useState } from "react";
import UserForm from "./user-form";

// UserDetail Component
const UserDetail = (props:any) => {
    // Return User form
    return (
        <>
        <h3>IsAdim: {props.userAuth?.AuthID} / {props.edituser.ITCC_UserID}</h3>
        {(!props.userAuth?.IsAdmin)  &&
            <section className="card py-1 mt-1">
                <UserForm {...props.edituser}
                    title="Edit User"
                    onChange={props.onChangeUserDetail}
                    onCancel={props.onCancelUserDetail}
                    onClick={props.onSaveUserDetail}
                >

                    <i className="bi bi-sticky"> &nbsp; </i>Save
                </UserForm>
            </section>
        }
        </>
    )
}

export default UserDetail
