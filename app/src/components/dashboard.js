import { useEffect, useState } from 'react';
export default function Dashboard(){
    const [loginTime, setLoginTime] = useState(null);
    useEffect(() => {
        const storedLoginTime = localStorage.getItem('loginTime');
        setLoginTime(storedLoginTime);
    }, []);
    return(
        <div id='dashboard'>
            <p>Logged in succesfully at {loginTime || 'Loading time...'}</p>
        </div>
    )
}