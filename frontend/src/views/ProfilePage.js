import React, { useState, useEffect,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,Outlet,useNavigate,useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import Modal from '@mui/material/Modal';
import {GetOneUserRequest} from '../redux-saga/Action/LoginPageAction'
import {GetAllFollowersRequest} from '../redux-saga/Action/ProfilePageAction'
import config from '../config/config'
export default function ProfilePage(){
    const navigate = useNavigate()
    const location=useLocation()
    const dispatch = useDispatch();
    const [selectTop,setSelectTop]=useState(true)
    const [selectLatest,setSelectLatest]=useState(false)
    const [selectPeople,setSelectPeople]=useState(false)
    const [selectMedia,setSelectMedia]=useState(false)
    const [selectFollower,setOpenFollower]=useState(false)
    const [selectFollowing,setOpenFollowing]=useState(false)
    const handleFollowingClose=()=>setOpenFollowing(false)
    const handleFollowerClose=()=>setOpenFollower(false)
    const [refresh, setRefresh] = useState(false)
    const {user} = useSelector(state => state.loginPageState)
    const {followers} = useSelector(state => state.profilePageState)

    for(let i=0;i<followers.length;i++){
        console.log(followers[i].follower_id);
    }

    useEffect(() => {
        dispatch(GetAllFollowersRequest(sessionStorage.getItem('user_id')));
        dispatch(GetOneUserRequest(sessionStorage.getItem('username')));
        setRefresh(false)
    }, [refresh])

    return(
        <div className='relative flex flex-col w-full'>
            <div>
                <img
                    className='h-72 w-full'
                    src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
                    alt="car"
                />
            </div>

            <div className='absolute flex flex-col space-x-5 w-full pt-3 px-32'>
                <div className='flex flex-row bg-white border border-gray-200 rounded-lg rounded p-3 shadow w-full space-x-4 h-36 mt-56 ml-5'>
                    <div>
                        <img
                            className='absolute h-40 w-40 rounded-lg border-2 border-white top-48'
                            crossOrigin="anonymous"
                            src={config.domain+'/image/file/'+user.photo}
                            alt="car"
                        />
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='flex flex-row space-x-3 items-center w-full pl-40'>
                            <div className='font-bold text-base w-48'>{user.name}</div>
                            <div className='flex justify-start text-sm text-gray-400 font-semibold'>
                                <button onClick={()=>setOpenFollowing(true)} className='flex transition hover:underline hover:underline-offset-4'>
                                    <div className='text-black font-bold mr-1'>20k</div> 
                                    <div> following</div>
                                </button>
                                <Modal
                                    open={selectFollowing}
                                    onClose={handleFollowingClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div className='flex flex-col bg-white mt-56 ml-96 w-5/12 border rounded-lg border-gray-200 px-3 py-5 space-y-2'>
                                        <div className='font-bold text-base'>
                                            Kevin Christy Parinussa is following
                                        </div>

                                        <div className='border-t border-gray-300 py-2'>
                                            <div className='flex flex-col'>
                                                <div className='flex flex-row items-center pt-3'>
                                                    <div className='mr-4'>
                                                        <img
                                                            className='h-12 w-12 rounded-lg border-2 border-white'
                                                            src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
                                                            alt="car"
                                                        />
                                                    </div>

                                                    <div className='flex flex-col w-full'>
                                                        <div className='flex flex-row w-full -space-y-2'>
                                                            <div className='w-1/2 text-xl font-semibold'>
                                                                Kaysypy
                                                            </div>

                                                            <div className='flex justify-end w-1/2'>
                                                                <button className='bg-cyan-400 h-7 w-24 rounded-lg text-white'>
                                                                    Following
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className='text-sm text-gray-400'>
                                                            120k followers
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='mt-3 text-gray-400'>
                                                    Whatever content
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                            <div className='text-sm text-gray-400 font-semibold'>
                                <button onClick={()=>setOpenFollower(true)} className='flex transition hover:underline hover:underline-offset-4'>
                                    <div className='text-black font-bold mr-1'>{followers.length}</div> 
                                    <div>
                                        followers
                                    </div>
                                </button>
                                <Modal
                                    open={selectFollower}
                                    onClose={handleFollowerClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div className='flex flex-col bg-white mt-56 ml-96 w-5/12 border rounded-lg border-gray-200 px-3 py-5 space-y-2'>
                                        <div className='font-bold text-base'>
                                            {user.name}'s followers
                                        </div>

                                        {
                                            followers && followers.map(fol=>{
                                                return(
                                                    <div className='border-t border-gray-300 py-2'>
                                                        <div className='flex flex-col'>
                                                            <div className='flex flex-row items-center pt-3'>
                                                                <div className='mr-4'>
                                                                    {
                                                                        fol.follower.photo
                                                                        ?
                                                                        <img
                                                                            className='h-12 w-12 rounded-lg border-2 border-white'
                                                                            crossOrigin="anonymous"
                                                                            src={config.domain+'/image/file/'+fol.follower.photo}
                                                                            alt="car"
                                                                        />
                                                                        :
                                                                        <img
                                                                            className='h-12 w-12 rounded-lg border-2 border-white'
                                                                            crossOrigin="anonymous"
                                                                            src={config.domain+'/image/file/default.jpg'}
                                                                            alt="car"
                                                                        />
                                                                    }
                                                                    
                                                                </div>

                                                                <div className='flex flex-col w-full'>
                                                                    <div className='flex flex-row w-full -space-y-2'>
                                                                        <div className='w-1/2 text-xl font-semibold'>
                                                                            {fol.follower.name}
                                                                        </div>

                                                                        <div className='flex justify-end w-1/2'>
                                                                            <button className='bg-cyan-400 h-7 w-24 rounded-lg text-white'>
                                                                                Following
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <div className='text-sm text-gray-400'>
                                                                        120k followers
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='mt-3 text-gray-400'>
                                                                {fol.follower.bio}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Modal>
                            </div>
                            <div className='flex justify-end w-96 pr-7'>
                                <button className='bg-cyan-400 h-9 w-24 rounded-lg text-white'>
                                    <FontAwesomeIcon  className="h-4 w-4 mr-2" icon={solid('user-plus')}/>
                                    Follow
                                </button>
                            </div>
                        </div>

                        <div className='text-gray-400 pl-40'>
                            {user.bio}
                        </div>
                    </div>
                </div>   

                <div className='flex flex-row space-x-5 w-full mt-5'>
                <div className='flex flex-col bg-white p-3 w-4/12 shadow rounded-lg space-y-3 h-40 font-semibold text-gray-400'>
                <button onClick={()=>{setSelectTop(true);setSelectLatest(false);setSelectPeople(false);setSelectMedia(false)}} className={selectTop ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Tweets
                </button>

                <button onClick={()=>{setSelectTop(false);setSelectLatest(true);setSelectPeople(false);setSelectMedia(false)}} className={selectLatest ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Tweets & replies
                </button>

                <button onClick={()=>{setSelectTop(false);setSelectLatest(false);setSelectPeople(true);setSelectMedia(false)}} className={selectPeople ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Media
                </button>

                <button onClick={()=>{setSelectTop(false);setSelectLatest(false);setSelectPeople(false);setSelectMedia(true)}} className={selectMedia ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Likes
                </button>
            </div>

            <div className='w-8/12'>
                
                <div className='flex flex-col bg-white p-3 w-full border border-gray-200 rounded-lg shadow'>
                                <div className='flex flex-flex-row items-center space-x-3'>
                                    <div>
                                        <img
                                            className='rounded-md h-10 w-10'
                                            src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
                                            alt="car"
                                        />
                                    </div>

                                    <div className='flex flex-col py-2'>
                                        <div className='font-bold'>
                                            Kevin CP
                                        </div>

                                        <div className='text-sm text-gray-400'>
                                            31 Oktober 2022 at 10:41
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <div>
                                     This is random image
                                    </div>

                                    <div>
                                        <img
                                            className='rounded-md h-80 w-full'
                                            src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
                                            alt="car"
                                        />
                                    </div>

                                    <div className='flex flex-row text-sm text-gray-400 space-x-3 justify-end'>
                                        <div>Comments</div>
                                        <div>Retweets</div>
                                        <div>Saved</div>
                                    </div>

                                    <div className='flex flex-row space-x-1 py-0.5 border-b border-t border-gray w-full font-medium'>
                                        <div className='w-1/4 text-gray-400'>
                                            <button className='transition hover:bg-gray-100 h-7 w-full px-2 rounded'>
                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('message')}/>
                                                Comment
                                            </button>
                                        </div>

                                        <div className='w-1/4 text-green-400'>
                                            <button className='transition hover:bg-gray-100 h-7 w-full px-2 rounded'>
                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('arrows-rotate')}/>
                                                Retweeted
                                            </button>
                                        </div>

                                        <div className='w-1/4 text-red-400'>
                                            <button className='transition hover:bg-gray-100 h-7 w-full px-2 rounded'>
                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                Liked
                                            </button>
                                        </div>

                                        <div className='w-1/4 text-blue-400'>
                                            <button className='transition hover:bg-gray-100 h-7 w-full px-2 rounded-lg'>
                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                Saved
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center border-b border-gray-200 pb-1'>
                                        <div className='w-1/12'>
                                            <img
                                                className='rounded-md h-8 w-8'
                                                src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
                                                alt="car"
                                            />
                                        </div>

                                        <div className='w-11/12'>
                                            <input className='border border-gray-300 bg-gray-100 rounded-lg h-7 w-full p-2' placeholder='Tweet your reply' type="text"/>
                                        </div>
                                    </div>

                                    <div className='flex flex-row'>
                                        <div className='w-1/12'>
                                            <img
                                                className='rounded-md h-8 w-8'
                                                src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
                                                alt="car"
                                            />
                                        </div>

                                        <div className='flec flex-col w-11/12'>
                                            <div className='flex flex-col bg-gray-100 p-2 rounded-lg'>
                                                <div className='flex flex-row items-center space-x-2'>
                                                    <div className='font-bold'>Kevin C</div>
                                                    <div className='text-sm text-gray-400'>31 Oktober 2022</div>
                                                </div>

                                                <div>
                                                Random comment
                                                </div>
                                            </div>

                                            <div className='flex flex-row space-x-2 text-sm text-gray-400 items-center'>
                                               <button><FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>Like</button>
                                               <div>12k Likes</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            </div>

                </div>
        </div>
        </div>
        
    )
}