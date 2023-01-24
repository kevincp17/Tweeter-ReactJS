import React, { useState, useEffect,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Link,Outlet,useNavigate,useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import Modal from '@mui/material/Modal';
import {GetOneUserRequest} from '../redux-saga/Action/LoginPageAction'
import {GetAllFollowersRequest,GetAllFollowingRequest,GetOwnTweetsRequest} from '../redux-saga/Action/ProfilePageAction'
import {GetSavedTweetsRequest,GetLikedTweetsRequest} from '../redux-saga/Action/BookmarkPageAction'
import {AddLikeRequest,UnlikeRequest,AddSaveRequest,UnsaveRequest} from '../redux-saga/Action/HomePageActions'
import config from '../config/config'
export default function ProfilePage(){
    const navigate = useNavigate()
    const location=useLocation()
    const dispatch = useDispatch();
    const options = { year: "numeric", month: "long", day: "numeric"}

    const [selectPosts,setSelectPosts]=useState(true)
    const [selectSaved,setSelectSaved]=useState(false)
    const [selectLiked,setSelectLiked]=useState(false)
    const [selectFollower,setOpenFollower]=useState(false)
    const [selectFollowing,setOpenFollowing]=useState(false)
    const [tweetLikeId, setTweetLikeId] = useState(null)
    const [userLikeId, setuserLikeId] = useState(null)

    const handleFollowingClose=()=>setOpenFollowing(false)
    const handleFollowerClose=()=>setOpenFollower(false)
    const [refresh, setRefresh] = useState(false)

    const {user} = useSelector(state => state.loginPageState)
    const {posts,followers,followings} = useSelector(state => state.profilePageState)
    const {saved_tweets,liked_tweets} = useSelector(state => state.bookmarkPageState)
    const {state}=location

    useEffect(() => {
        dispatch(GetAllFollowersRequest(state.otherUserId));
        dispatch(GetOneUserRequest(state.otherUsername));
        dispatch(GetOwnTweetsRequest(state.otherUserId));
        dispatch(GetAllFollowingRequest(state.otherUserId));
        dispatch(GetSavedTweetsRequest(state.otherUserId));
        dispatch(GetLikedTweetsRequest(state.otherUserId));
        setRefresh(false)
    }, [refresh])

    const likeTweet = async (twid,uid) =>{
        setTweetLikeId(twid)
        setuserLikeId(uid)
    }

    const saveTweet = async (twid,uid) =>{
        setTweetLikeId(twid)
        setuserLikeId(uid)
    }

    const unlikeTweet = async (twid,uid) =>{
        const payload = {
            tweet_id: twid,
            user_id:uid
        };
        dispatch(UnlikeRequest(payload))
        setRefresh(true)
    }

    const unsaveTweet = async (twid,uid) =>{
        const payload = {
            tweet_id: twid,
            user_id:uid
        };
        dispatch(UnsaveRequest(payload))
        setRefresh(true)
    }

    const formikLike = useFormik({
        enableReinitialize: true,
        initialValues: {
            tweet_id:null,
            user_id: null
        },
        onSubmit: async () => {
            const payload = {
                tweet_id: tweetLikeId,
                user_id:userLikeId
            };
            console.log(payload);
            dispatch(AddLikeRequest(payload))
            setTweetLikeId(null)
            setuserLikeId(null)
            setRefresh(true)
        }
    })

    const formikSave = useFormik({
        enableReinitialize: true,
        initialValues: {
            tweet_id:null,
            user_id: null
        },
        onSubmit: async () => {
            const payload = {
                tweet_id: tweetLikeId,
                user_id:userLikeId
            };
            console.log(payload);
            dispatch(AddSaveRequest(payload))
            setTweetLikeId(null)
            setuserLikeId(null)
            setRefresh(true)
        }
    })

    return(
        <div className='relative flex flex-col w-full'>
            <div>
                {
                    user.header_photo
                    ?
                    <img
                    className='h-72 w-full'
                    crossOrigin="anonymous" 
                    src={config.domain+'/image/file/'+user.header_photo}
                    alt="car"
                    />
                    :
                    <img
                    className='h-72 w-full'
                    src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
                    alt="car"
                />
                }
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
                                    <div className='text-black font-bold mr-1'>{followings.length}</div> 
                                    <div> following</div>
                                </button>
                                <Modal
                                    open={selectFollowing}
                                    onClose={handleFollowingClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div className='flex flex-col bg-white mt-36 ml-96 w-5/12 border rounded-lg border-gray-200 px-3 py-5 space-y-2'>
                                        <div className='font-bold text-base'>
                                            {user.name} is following
                                        </div>

                                        {
                                            followings && followings.map(fol=>{
                                                return(
                                                    <div className='border-t border-gray-300 py-2'>
                                                        <div className='flex flex-col'>
                                                            <div className='flex flex-row items-center pt-3'>
                                                                <div className='mr-4'>
                                                                    {
                                                                        fol.follower_user.photo
                                                                        ?
                                                                        <img
                                                                            className='h-12 w-12 rounded-lg border-2 border-white'
                                                                            crossOrigin="anonymous"
                                                                            src={config.domain+'/image/file/'+fol.follower_user.photo}
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
                                                                            {fol.follower_user.name}
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
                                                                {fol.follower_user.bio}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
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
                                    <div className='flex flex-col bg-white mt-36 ml-96 w-5/12 border rounded-lg border-gray-200 px-3 py-5 space-y-2'>
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
                <div className='flex flex-col bg-white p-3 w-4/12 shadow rounded-lg space-y-3 h-28 font-semibold text-gray-400'>
                <button onClick={()=>{setSelectPosts(true);setSelectSaved(false);setSelectLiked(false)}} className={selectPosts ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Posts
                </button>

                <button onClick={()=>{setSelectPosts(false);setSelectSaved(true);setSelectLiked(false)}} className={selectSaved ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Saved
                </button>

                <button onClick={()=>{setSelectPosts(false);setSelectSaved(false);setSelectLiked(true);}} className={selectLiked ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Liked
                </button>
            </div>

            <div className='w-8/12'>
            {
                    selectSaved
                    ?
                    saved_tweets && saved_tweets.map(st=>{
                        return(
                            <div key={st.tweet_id} className='flex flex-col bg-white p-3 w-full border border-gray-200 rounded-lg shadow mb-3'>
                                <div className='flex flex-flex-row items-center space-x-3'>
                                    <div>
                                        {
                                            st.tweet_user.photo
                                            ?
                                            <img className='rounded-md h-10 w-10' crossOrigin="anonymous" src={config.domain+'/image/file/'+st.tweet_user.photo}/>
                                            :
                                            <img
                                                className='rounded-md h-10 w-10'
                                                crossOrigin="anonymous" 
                                                src={config.domain+'/image/file/default.jpg'}
                                                alt="car"
                                            />
                                        }
                                    </div>

                                    <div className='flex flex-col py-2'>
                                        <div className='font-bold'>
                                            {st.tweet_user.name}
                                        </div>

                                        <div className='text-sm text-gray-400'>
                                            {
                                                new Date(st.time_created).toLocaleDateString(undefined, options)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <div>
                                        {st.tweet_content.tweet_body}
                                    </div>

                                    <div>
                                    {
                                                            st.tweet_content.picture
                                                            ?
                                                            <img
                                                            className='rounded-md h-80 w-full'
                                                            crossOrigin="anonymous"
                                                            src={config.domain+'/image/file/'+st.tweet_content.picture}
                                                            alt="car"
                                                            />
                                                            :
                                                            null
                                                        }
                                    </div>

                                    <div className='flex flex-row text-sm text-gray-400 space-x-3 justify-end'>
                                    <div>{st.user_id_users_replies.length} Comments</div>
                                                        <div>Retweets</div>
                                                        <div>{st.likes.length} Likes</div>
                                                        <div>{st.saveds.length} Saved</div>
                                    </div>

                                    <div className='flex flex-row space-x-1 py-0.5 border-b border-t border-gray w-full font-medium'>
                                        <div className='w-1/4 text-gray-400'>
                                            <button className='transition hover:bg-gray-100 h-7 w-full px-2 rounded'>
                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('message')}/>
                                                Comment
                                            </button>
                                        </div>

                                        <div className='w-1/4 text-green-400'>
                                        {
                                                                st.retweets.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-green-400 h-7 w-full px-2 rounded'>
                                                                    <FontAwesomeIcon  className="h-4 w-4" icon={solid('arrows-rotate')}/>
                                                                    Retweeted
                                                                </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded'>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('arrows-rotate')}/>
                                                                                    Retweeted
                                                                            </button>
                                                            }
                                        </div>

                                        <div className='w-1/4 text-red-400'>
                                        {
                                                                st.likes.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-red-400 h-7 w-full px-2 rounded' onClick={()=>{unlikeTweet(st.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{likeTweet(st.tweet_id,user.user_id);formikLike.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                            }
                                        </div>

                                        <div className='w-1/4 text-blue-400'>
                                        {
                                                                st.saveds.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-blue-400 h-7 w-full px-2 rounded' onClick={()=>{unsaveTweet(st.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{saveTweet(st.tweet_id,user.user_id);formikSave.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                            }
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center border-b border-gray-200 pb-1'>
                                        <div className='w-1/12'>
                                        {
                                                            user.photo
                                                            ?
                                                            <img className='rounded-md h-8 w-8' crossOrigin="anonymous" src={config.domain+'/image/file/'+user.photo}/>
                                                            :
                                                            <img className='rounded-md h-8 w-8' crossOrigin="anonymous" src={config.domain+'/image/file/default.jpg'}/>
                                                        }
                                        </div>

                                        <div className='w-11/12'>
                                            <input className='border border-gray-300 bg-gray-100 rounded-lg h-7 w-full p-2' placeholder='Tweet your reply' type="text"/>
                                        </div>
                                    </div>

                                    {
                                                        st.user_id_users_replies && st.user_id_users_replies.map(str=>{
                                                            return(
                                                                <div className='flex flex-row'>
                                                        <div className='w-1/12'>
                                                            {
                                                                str.photo
                                                                ?
                                                                <img
                                                                    className='rounded-md h-8 w-8'
                                                                    crossOrigin="anonymous" 
                                                                    src={config.domain+'/image/file/'+str.photo}
                                                                    alt="car"
                                                                />
                                                                :
                                                                <img
                                                                    className='rounded-md h-8 w-8'
                                                                    crossOrigin="anonymous" 
                                                                    src={config.domain+'/image/file/default.jpg'}
                                                                    alt="car"
                                                                />
                                                            }
                                                            
                                                        </div>
                                                        
                                                        <div className='flec flex-col w-11/12'>
                                                            <div className='flex flex-col bg-gray-100 p-2 rounded-lg'>
                                                                
                                                                <div className='flex flex-row items-center space-x-2'>
                                                                    <div className='font-bold'>{str.name}</div>
                                                                    <div className='text-sm text-gray-400'>31 Oktober 2022</div>
                                                                </div>

                                                                <div>
                                                                {str.replies.reply}
                                                                </div>
                                                            </div>

                                                            <div className='flex flex-row space-x-2 text-sm text-gray-400 items-center'>
                                                                <button><FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>Like</button>
                                                                <div>12k Likes</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                            )
                                                        })
                                                    }
                                </div>
                            </div>
                        )
                    })
                    :
                    selectLiked
                    ?
                    liked_tweets && liked_tweets.map(lt=>{
                        return(
                            <div key={lt.tweet_id} className='flex flex-col bg-white p-3 w-full border border-gray-200 rounded-lg shadow mb-3'>
                                <div className='flex flex-flex-row items-center space-x-3'>
                                    <div>
                                        {
                                            lt.tweet_user.photo
                                            ?
                                            <img className='rounded-md h-10 w-10' crossOrigin="anonymous" src={config.domain+'/image/file/'+lt.tweet_user.photo}/>
                                            :
                                            <img
                                                className='rounded-md h-10 w-10'
                                                crossOrigin="anonymous" 
                                                src={config.domain+'/image/file/default.jpg'}
                                                alt="car"
                                            />
                                        }
                                    </div>

                                    <div className='flex flex-col py-2'>
                                        <div className='font-bold'>
                                            {lt.tweet_user.name}
                                        </div>

                                        <div className='text-sm text-gray-400'>
                                            {
                                                new Date(lt.time_created).toLocaleDateString(undefined, options)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <div>
                                        {lt.tweet_content.tweet_body}
                                    </div>

                                    <div>
                                    {
                                                            lt.tweet_content.picture
                                                            ?
                                                            <img
                                                            className='rounded-md h-80 w-full'
                                                            crossOrigin="anonymous"
                                                            src={config.domain+'/image/file/'+lt.tweet_content.picture}
                                                            alt="car"
                                                            />
                                                            :
                                                            null
                                                        }
                                    </div>

                                    <div className='flex flex-row text-sm text-gray-400 space-x-3 justify-end'>
                                    <div>{lt.user_id_users_replies.length} Comments</div>
                                                        <div>Retweets</div>
                                                        <div>{lt.likes.length} Likes</div>
                                                        <div>{lt.saveds.length} Saved</div>
                                    </div>

                                    <div className='flex flex-row space-x-1 py-0.5 border-b border-t border-gray w-full font-medium'>
                                        <div className='w-1/4 text-gray-400'>
                                            <button className='transition hover:bg-gray-100 h-7 w-full px-2 rounded'>
                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('message')}/>
                                                Comment
                                            </button>
                                        </div>

                                        <div className='w-1/4 text-green-400'>
                                        {
                                                                lt.retweets.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-green-400 h-7 w-full px-2 rounded'>
                                                                    <FontAwesomeIcon  className="h-4 w-4" icon={solid('arrows-rotate')}/>
                                                                    Retweeted
                                                                </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded'>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('arrows-rotate')}/>
                                                                                    Retweeted
                                                                            </button>
                                                            }
                                        </div>

                                        <div className='w-1/4 text-red-400'>
                                        {
                                                                lt.likes.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-red-400 h-7 w-full px-2 rounded' onClick={()=>{unlikeTweet(lt.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{likeTweet(lt.tweet_id,user.user_id);formikLike.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                            }
                                        </div>

                                        <div className='w-1/4 text-blue-400'>
                                        {
                                                                lt.saveds.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-blue-400 h-7 w-full px-2 rounded' onClick={()=>{unsaveTweet(lt.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{saveTweet(lt.tweet_id,user.user_id);formikSave.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                            }
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center border-b border-gray-200 pb-1'>
                                        <div className='w-1/12'>
                                        {
                                                            user.photo
                                                            ?
                                                            <img className='rounded-md h-8 w-8' crossOrigin="anonymous" src={config.domain+'/image/file/'+user.photo}/>
                                                            :
                                                            <img className='rounded-md h-8 w-8' crossOrigin="anonymous" src={config.domain+'/image/file/default.jpg'}/>
                                                        }
                                        </div>

                                        <div className='w-11/12'>
                                            <input className='border border-gray-300 bg-gray-100 rounded-lg h-7 w-full p-2' placeholder='Tweet your reply' type="text"/>
                                        </div>
                                    </div>

                                    {
                                                        lt.user_id_users_replies && lt.user_id_users_replies.map(ltr=>{
                                                            return(
                                                                <div className='flex flex-row'>
                                                        <div className='w-1/12'>
                                                            {
                                                                ltr.photo
                                                                ?
                                                                <img
                                                                    className='rounded-md h-8 w-8'
                                                                    crossOrigin="anonymous" 
                                                                    src={config.domain+'/image/file/'+ltr.photo}
                                                                    alt="car"
                                                                />
                                                                :
                                                                <img
                                                                    className='rounded-md h-8 w-8'
                                                                    crossOrigin="anonymous" 
                                                                    src={config.domain+'/image/file/default.jpg'}
                                                                    alt="car"
                                                                />
                                                            }
                                                            
                                                        </div>
                                                        
                                                        <div className='flec flex-col w-11/12'>
                                                            <div className='flex flex-col bg-gray-100 p-2 rounded-lg'>
                                                                
                                                                <div className='flex flex-row items-center space-x-2'>
                                                                    <div className='font-bold'>{ltr.name}</div>
                                                                    <div className='text-sm text-gray-400'>31 Oktober 2022</div>
                                                                </div>

                                                                <div>
                                                                {ltr.replies.reply}
                                                                </div>
                                                            </div>

                                                            <div className='flex flex-row space-x-2 text-sm text-gray-400 items-center'>
                                                                <button><FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>Like</button>
                                                                <div>12k Likes</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                            )
                                                        })
                                                    }
                                </div>
                            </div>
                        )
                    })
                    :
                    selectPosts
                    ?
                    posts && posts.map(lt=>{
                        return(
                            <div key={lt.tweet_id} className='flex flex-col bg-white p-3 w-full border border-gray-200 rounded-lg shadow mb-3'>
                                <div className='flex flex-flex-row items-center space-x-3'>
                                    <div>
                                        {
                                            lt.tweet_user.photo
                                            ?
                                            <img className='rounded-md h-10 w-10' crossOrigin="anonymous" src={config.domain+'/image/file/'+lt.tweet_user.photo}/>
                                            :
                                            <img
                                                className='rounded-md h-10 w-10'
                                                crossOrigin="anonymous" 
                                                src={config.domain+'/image/file/default.jpg'}
                                                alt="car"
                                            />
                                        }
                                    </div>

                                    <div className='flex flex-col py-2'>
                                        <div className='font-bold'>
                                            {lt.tweet_user.name}
                                        </div>

                                        <div className='text-sm text-gray-400'>
                                            {
                                                new Date(lt.time_created).toLocaleDateString(undefined, options)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <div>
                                        {lt.tweet_content.tweet_body}
                                    </div>

                                    <div>
                                    {
                                                            lt.tweet_content.picture
                                                            ?
                                                            <img
                                                            className='rounded-md h-80 w-full'
                                                            crossOrigin="anonymous"
                                                            src={config.domain+'/image/file/'+lt.tweet_content.picture}
                                                            alt="car"
                                                            />
                                                            :
                                                            null
                                                        }
                                    </div>

                                    <div className='flex flex-row text-sm text-gray-400 space-x-3 justify-end'>
                                    <div>{lt.user_id_users_replies.length} Comments</div>
                                                        <div>Retweets</div>
                                                        <div>{lt.likes.length} Likes</div>
                                                        <div>{lt.saveds.length} Saved</div>
                                    </div>

                                    <div className='flex flex-row space-x-1 py-0.5 border-b border-t border-gray w-full font-medium'>
                                        <div className='w-1/4 text-gray-400'>
                                            <button className='transition hover:bg-gray-100 h-7 w-full px-2 rounded'>
                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('message')}/>
                                                Comment
                                            </button>
                                        </div>

                                        <div className='w-1/4 text-green-400'>
                                        {
                                                                lt.retweets.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-green-400 h-7 w-full px-2 rounded'>
                                                                    <FontAwesomeIcon  className="h-4 w-4" icon={solid('arrows-rotate')}/>
                                                                    Retweeted
                                                                </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded'>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('arrows-rotate')}/>
                                                                                    Retweeted
                                                                            </button>
                                                            }
                                        </div>

                                        <div className='w-1/4 text-red-400'>
                                        {
                                                                lt.likes.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-red-400 h-7 w-full px-2 rounded' onClick={()=>{unlikeTweet(lt.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{likeTweet(lt.tweet_id,user.user_id);formikLike.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                            }
                                        </div>

                                        <div className='w-1/4 text-blue-400'>
                                        {
                                                                lt.saveds.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-blue-400 h-7 w-full px-2 rounded' onClick={()=>{unsaveTweet(lt.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{saveTweet(lt.tweet_id,user.user_id);formikSave.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                            }
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center border-b border-gray-200 pb-1'>
                                        <div className='w-1/12'>
                                        {
                                                            user.photo
                                                            ?
                                                            <img className='rounded-md h-8 w-8' crossOrigin="anonymous" src={config.domain+'/image/file/'+user.photo}/>
                                                            :
                                                            <img className='rounded-md h-8 w-8' crossOrigin="anonymous" src={config.domain+'/image/file/default.jpg'}/>
                                                        }
                                        </div>

                                        <div className='w-11/12'>
                                            <input className='border border-gray-300 bg-gray-100 rounded-lg h-7 w-full p-2' placeholder='Tweet your reply' type="text"/>
                                        </div>
                                    </div>

                                    {
                                                        lt.user_id_users_replies && lt.user_id_users_replies.map(ltr=>{
                                                            return(
                                                                <div className='flex flex-row'>
                                                        <div className='w-1/12'>
                                                            {
                                                                ltr.photo
                                                                ?
                                                                <img
                                                                    className='rounded-md h-8 w-8'
                                                                    crossOrigin="anonymous" 
                                                                    src={config.domain+'/image/file/'+ltr.photo}
                                                                    alt="car"
                                                                />
                                                                :
                                                                <img
                                                                    className='rounded-md h-8 w-8'
                                                                    crossOrigin="anonymous" 
                                                                    src={config.domain+'/image/file/default.jpg'}
                                                                    alt="car"
                                                                />
                                                            }
                                                            
                                                        </div>
                                                        
                                                        <div className='flec flex-col w-11/12'>
                                                            <div className='flex flex-col bg-gray-100 p-2 rounded-lg'>
                                                                
                                                                <div className='flex flex-row items-center space-x-2'>
                                                                    <div className='font-bold'>{ltr.name}</div>
                                                                    <div className='text-sm text-gray-400'>31 Oktober 2022</div>
                                                                </div>

                                                                <div>
                                                                {ltr.replies.reply}
                                                                </div>
                                                            </div>

                                                            <div className='flex flex-row space-x-2 text-sm text-gray-400 items-center'>
                                                                <button><FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>Like</button>
                                                                <div>12k Likes</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                            )
                                                        })
                                                    }
                                </div>
                            </div>
                        )
                    })
                    :
                    null
                }   
            </div>

            </div>
        </div>
        </div>
        
    )
}