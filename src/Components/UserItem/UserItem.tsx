import React from 'react';

interface UserItemProps {
    onClick: () => void;
    firstName: string;
    lastName: string;
    job?: string;
    active: boolean;
}

const UserItem: React.FC<UserItemProps> = ({ onClick, firstName, lastName, job, active }) => {
    const getInitials = (name: string) => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className={`user-item ${active ? 'active-user-item' : ''}`} onClick={onClick}>
            <div className="user-icon">{getInitials(lastName)}</div>
            <div className="user-details">
              {lastName} {firstName}, {job}
            </div>
        </div>
    );
};

export default UserItem;