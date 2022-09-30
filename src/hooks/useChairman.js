import { useEffect, useState } from "react"

const useAdmin = user => {
    const [chairman, setChairman] = useState(false);
    const [chairmanLoading, setChairmanLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`http://localhost:5000/chairman/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setChairman(data.admin);
                    setChairmanLoading(false);
                })
        }
    }, [user])

    return [chairman, chairmanLoading]
}

export default useAdmin;