import React, { useEffect, useState, useRef } from 'react';
import UserItem from '../UserItem/UserItem';


interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    job?: string;
}

interface Response {
    data: User[];
    meta: {
        from: number;
        to: number;
        total: number;
    };
}

const Select: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement | null>(null);
    const [activeUser, setActiveUser] = useState('Выбрать пользователя')

    const fetchUsers = async (pageNumber: number) => {
        setLoading(true);
        const response = await fetch(`https://frontend-test-middle.vercel.app/api/users?page=${pageNumber}&limit=50`);
        const data: Response = await response.json();
        if (response.status === 200) {
            setUsers(prev => [...prev, ...data.data]);
            setLoading(false);
        } else {
            alert(`Запрос был неудачен статус:${response.status}`)
        }
    };

    useEffect(() => {
        if (isOpen && users.length === 0) {
            fetchUsers(page);
        }
    }, [isOpen, users.length]);

    useEffect(() => {
        if (page > 1) {
            fetchUsers(page);
        }
    }, [page]);

    const handleScroll = () => {
        if (selectRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = selectRef.current;
            if (scrollHeight - scrollTop <= clientHeight + 100 && !loading) {
                setPage(prev => prev + 1);
            }
        }
    };


    return (
        <div className="select" >

                <label >Users</label>
            <button onClick={() => setIsOpen(!isOpen)} className={`select-button ${isOpen ? ' select-open' : ''}`}>
                    <p>{activeUser}</p>
                    <img src='/icons/icn_16_small_arrow_bottom.svg' alt='arrow' />
                </button>

            {isOpen && (
                <div className="user-list" ref={selectRef} onScroll={handleScroll}>
                    {users.map(user => (
                        <UserItem
                            onClick={() => {
                                setActiveUser(`${user.first_name} ${user.last_name} ${user.job}`)
                                setIsOpen(false)
                            }
                            }
                            key={user.id}
                            firstName={user.first_name}
                            lastName={user.last_name}
                            job={user.job}
                            active={`${user.first_name} ${user.last_name} ${user.job}` === activeUser}
                        />
                    ))}
                    {loading && <div>Loading...</div>}
                </div>
            )}
        </div>
    );
};

export default Select;