import { useEffect, useState } from "react"

const useBarber = user => {
    const [barber, setBarber] = useState(false);
    const [barberLoading, setBarberLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`https://the-golden-style-server.onrender.com/checkbarber/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBarber(data.admin);
                    setBarberLoading(false);
                })
        }
    }, [user])

    return [barber, barberLoading]
}

export default useBarber;