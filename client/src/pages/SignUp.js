import React, { useEffect } from 'react'

export default function SignUp() {
    useEffect(() => {
        const LOCAL_STORAGE_KEY = 'auth.user'
        let authUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (authUser !== null) {
            window.location = "/dashboard";
        }
      });

    return (
        <div>
            sign up page
        </div>
    )
}
