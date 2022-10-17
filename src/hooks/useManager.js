import { useEffect, useState } from "react"

const useManager = user => {
    const [manager, setManager] = useState(false);
    const [managerLoading, setManagerLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`https://the-golden-style-server.onrender.com/manager/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setManager(data.admin);
                    setManagerLoading(false);
                })
        }
    }, [user])

    return [manager, managerLoading]
}

export default useManager;