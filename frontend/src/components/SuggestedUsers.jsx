import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from "axios";
import { toast } from "sonner";

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    const [users, setUsers] = useState(suggestedUsers);

    const followHandler = async (userId, index) => {
        try {
            const res = await axios.post(`https://instaclone-xgj5.onrender.com/api/v1/user/followorunfollow/${userId}`, {}, { withCredentials: true });
            if (res.data.success) {
                const updatedUsers = [...users];
                updatedUsers[index].isFollowing = res.data.isFollowing;
                updatedUsers[index].followersCount = res.data.followersCount;
                setUsers(updatedUsers);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
            </div>
            {
                users.map((user, index) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <button
                                className={`text-xs font-bold cursor-pointer ${user.isFollowing ? 'text-red-500' : 'text-[#3BADF8]'} hover:opacity-80`}
                                onClick={() => followHandler(user._id, index)}
                            >
                                {user.isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SuggestedUsers;