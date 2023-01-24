import React, { useState, useEffect,useCallback,Fragment  } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,Outlet,useNavigate,useLocation } from 'react-router-dom'
import { useFormik, validateYupSchema } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Popover, Transition } from '@headlessui/react'
import {GetAllTweetsRequest,AddLikeRequest,UnlikeRequest,AddSaveRequest,UnsaveRequest,PostTweetRequest,GetWhoToFollowRequest} from '../redux-saga/Action/HomePageActions'
import {GetOneUserRequest,LogoutRequest} from '../redux-saga/Action/LoginPageAction'
import config from '../config/config'
export default function HomePage(){
    const navigate = useNavigate()
    const location=useLocation()
    const options = { year: "numeric", month: "long", day: "numeric"}
    
    const [selectHome,setSelectHome]=useState(true)
    const [selectExplore,setSelectExplore]=useState(false)
    const [selectBookmark,setSelectBookmark]=useState(false)
    const [selectEveryone,setSelectEveryone]=useState(true)
    const [selectPeopleFollow,setSelectPeopleFollow]=useState(false)
    const [refresh, setRefresh] = useState(false)
    const [refreshFollower, setRefreshFollower] = useState(false)
    const [tweetLikeId, setTweetLikeId] = useState(null)
    const [userLikeId, setuserLikeId] = useState(null)
    const dispatch = useDispatch();
    const {tweets,who_to_follow} = useSelector(state => state.homePageState)
    const {user} = useSelector(state => state.loginPageState)
    console.log(tweets);

    useEffect(() => {
        dispatch(GetAllTweetsRequest());
        dispatch(GetOneUserRequest(sessionStorage.getItem('username')));
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
        return tweets
    }

    const unsaveTweet = async (twid,uid) =>{
        const payload = {
            tweet_id: twid,
            user_id:uid
        };
        dispatch(UnsaveRequest(payload))
        setRefresh(true)
    }

    const formikPost = useFormik({
        enableReinitialize:true,
        initialValues: {
            tweet_user_id:'',
            tweet_body:'',
            picture:null
        },
        onSubmit: async (values) => {
            const payload = {
                tweet_user_id:user.user_id,
                tweet_body:values.tweet_body,
                picture:values.picture
            };
            dispatch(PostTweetRequest(payload))
            console.log(tweets);
            setRefresh(true)
        }
    })

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

    const Logout = async () =>{
        sessionStorage.clear();
        sessionStorage.setItem('isLoggedIn',false)
        dispatch(LogoutRequest())
        navigate('/login');
    }

    sessionStorage.setItem('user_id',user.user_id)

    return(
        <div className='flex flex-col'>
            <div className='flex flex-row h-16 px-8 shadow'>
                <div className='flex items-center w-4/12 text-2xl font-bold'>
                    <FontAwesomeIcon  className="h-8 w-8 mr-2 text-cyan-400" icon={solid('mountain-sun')}/>Tweeter
                </div>

                <div className='flex items-center flex-row w-4/12 space-x-12 text-gray-500 font-bold'>
                    <Link to='/'>
                        <button onClick={()=>{setSelectHome(true);setSelectExplore(false);setSelectBookmark(false);setRefresh(true)}} className={selectHome?'text-cyan-400 border-b-2 border-cyan-400 p-2':'transition hover:text-cyan-400 border-b-2 border-white p-2'}>Home</button>
                    </Link>

                    <Link to='/explore'>
                        <button onClick={()=>{setSelectHome(false);setSelectExplore(true);setSelectBookmark(false);setRefresh(true)}} className={selectExplore?'text-cyan-400 border-b-2 border-cyan-400 p-2':'transition hover:text-cyan-400 border-b-2 border-white p-2'}>Explore</button>
                    </Link>
                    
                    <Link to='/bookmarks'>
                        <button onClick={()=>{setSelectHome(false);setSelectExplore(false);setSelectBookmark(true);setRefresh(true)}} className={selectBookmark?'text-cyan-400 border-b-2 border-cyan-400 p-2':'transition hover:text-cyan-400 border-b-2 border-white p-2'}>Bookmarks</button>
                    </Link>
                    
                </div>
                
                <div className='flex justify-end w-4/12 font-bold py-1'>
                    <Popover className="relative">
                        <>
                            <Popover.Button
                            className='flex flex-row items-center space-x-4 transition hover:bg-gray-100 p-2 rounded-lg'
                            >
                                {
                                    user.photo
                                    ?
                                    <img className='rounded-md h-10 w-10' crossOrigin="anonymous" src={config.domain+'/image/file/'+user.photo}/>
                                    :
                                    <img className='rounded-md h-10 w-10' crossOrigin="anonymous" src={config.domain+'/image/file/default.jpg'}/>
                                }
                                

                                <div>
                                    {user.name}
                                </div>
                                <FontAwesomeIcon  className="h-3 w-3" icon={solid('caret-down')}/>
                            </Popover.Button>
                            <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                            >
                            <Popover.Panel className="flex flex-col absolute mt-4 right-0 bg-white rounded border border-gray-200 shadow z-50 w-44 p-3 space-y-3">
                                <div>
                                    <Link to={{ pathname: "/profile"}} state={{ userId:user.user_id, username:sessionStorage.getItem('username') }}>
                                        <button className='flex flex-row transition hover:bg-gray-100 w-full h-9 items-center px-2 rounded-lg' onClick={()=>{setSelectHome(false);setSelectExplore(false);setSelectBookmark(false)}}>
                                            <div>
                                                <FontAwesomeIcon  className="h-4 w-4 mr-2" icon={solid('user')}/>
                                            </div>
                                            
                                            <div>My Profile</div>
                                        </button>
                                    </Link>
                                </div>

                                {/* <div>
                                    <button className='flex flex-row transition hover:bg-gray-100 w-full h-9 items-center px-2 rounded-lg'>
                                        <div><FontAwesomeIcon  className="h-4 w-4 mr-2" icon={solid('user-group')}/></div>
                                        <div>Group Chat</div>
                                        
                                    </button>
                                </div>

                                <div>
                                    <button className='flex flex-row transition hover:bg-gray-100 w-full h-9 items-center px-2 rounded-lg'>
                                        <div><FontAwesomeIcon  className="h-4 w-4 mr-2" icon={solid('gear')}/></div>
                                        <div>Settings</div>
                                        
                                    </button>
                                </div> */}

                                <div className='text-red-400'>
                                    <button className='flex flex-row transition hover:bg-gray-100 w-full h-9 items-center px-2 rounded-lg'>
                                        <div><FontAwesomeIcon  className="h-4 w-4 mr-2" icon={solid('right-from-bracket')}/></div>
                                        <button onClick={() => Logout()}>Logout</button>
                                        
                                    </button>
                                </div>
                            </Popover.Panel>
                            </Transition>
                        </>
                    </Popover>
                </div>
            </div>

            <div className='bg-gray-50'>
                {
                    location.pathname==='/'
                    ?
                    <div className='flex flex-row space-x-6 pt-3 px-32'>
                        <div className='flex flex-col w-8/12'>
                            <div className='flex flex-col bg-white p-2 w-full border border-gray-200 rounded-lg shadow'>
                                <div className='border-b pb-2 font-semibold'>
                                    Tweet Something
                                </div>
                                
                                <div className='flex flex-row py-2'>
                                    <div>
                                        {
                                            user.photo
                                            ?
                                            <img
                                                className='rounded-md h-8 w-8'
                                                crossOrigin="anonymous"
                                                src={config.domain+'/image/file/'+user.photo}
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
                                    <input 
                                        type='text' 
                                        className=''
                                        name="tweet_body"
                                        id="tweet_body"
                                        value={formikPost.values.tweet_body}
                                        onChange={formikPost.handleChange}
                                        onBlur={formikPost.handleBlur}
                                        autoComplete="tweet_body"
                                    />
                                </div>

                                <div className='flex flex-row w-full'>
                                    <div className='flex items-center text-cyan-400 space-x-3 font-medium text-base w-1/2 pl-8'>
                                        <button className='transition hover:bg-gray-100 p-1 rounded-lg'><FontAwesomeIcon  className="h-4 w-4" icon={solid('image')}/></button>
                                        <Popover className="relative">
                                            <>
                                                <Popover.Button
                                                className='transition hover:bg-gray-100 p-1 rounded-lg'
                                                >
                                                    {
                                                        selectPeopleFollow
                                                        ?
                                                        <div><FontAwesomeIcon  className="h-4 w-4 pr-2" icon={solid('user-group')}/>People you follow can reply</div>
                                                        :
                                                        selectEveryone
                                                        ?
                                                        <div><FontAwesomeIcon  className="h-4 w-4 pr-2" icon={solid('earth-americas')}/>Everyone can reply</div>
                                                        :
                                                        null
                                                    }
                                                    
                                                </Popover.Button>
                                                <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                                >
                                                <Popover.Panel className="flex flex-col absolute mt-4 left-0 bg-white rounded border border-gray-200 shadow z-50 w-72 p-3 space-y-1.5">
                                                    <div className='text-black text-sm font-semibold'>
                                                        Who can reply?
                                                    </div>

                                                    <div className='text-gray-400 text-sm font-semibold'>
                                                        Choose who can reply to this Tweet.
                                                    </div>

                                                    <div className='text-gray-500'>
                                                        <button className='flex flex-row transition hover:bg-gray-100 w-full space-x-0.5 p-2 rounded-lg' onClick={()=>{setSelectEveryone(true);setSelectPeopleFollow(false)}}>
                                                            <div><FontAwesomeIcon  className="h-4 w-4 pr-2" icon={solid('earth-americas')}/></div>
                                                            <div>Everyone</div>
                                                        </button>
                                                    </div>

                                                    <div className='text-gray-500'>
                                                        <button className='flex flex-row transition hover:bg-gray-100 w-full space-x-0.5 p-2 rounded-lg' onClick={()=>{setSelectEveryone(false);setSelectPeopleFollow(true)}}>
                                                            <div><FontAwesomeIcon  className="h-4 w-4 pr-2" icon={solid('user-group')}/></div>
                                                            <div>People you follow</div>
                                                        </button>
                                                    </div>
                                                </Popover.Panel>
                                                </Transition>
                                            </>
                                        </Popover>
                                    </div>

                                    <div className='w-1/2 flex justify-end'>
                                        <button type='submit' className='bg-cyan-400 rounded h-7 w-16 text-white font-medium text-base' onClick={formikPost.handleSubmit}>Tweet</button>
                                    </div>
                                </div>
                            </div>
                            {
                                    tweets && tweets.map(tw => {
                                        return (
                                            <div key={tw.tweet_id} className='flex flex-col bg-white p-3 w-full border border-gray-200 rounded-lg mt-5 shadow'>
                                                <div className='flex flex-flex-row items-center space-x-3'>
                                                    <div>
                                                        {
                                                            tw.tweet_user.photo
                                                            ?
                                                            <img className='rounded-md h-10 w-10' crossOrigin="anonymous" src={config.domain+'/image/file/'+tw.tweet_user.photo}/>
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
                                                            <Link to='/other_profile' state={{ otherUserId:tw.tweet_user_id, otherUsername:tw.tweet_user.username }}>
                                                                <button className='transition hover:text-cyan-400' onClick={()=>{setSelectHome(false);setSelectExplore(false);setSelectBookmark(false)}}>{tw.tweet_user.name}</button>
                                                            </Link>
                                                        </div>

                                                        <div className='text-sm text-gray-400'>
                                                            {
                                                                new Date(tw.time_created).toLocaleDateString(undefined, options)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='flex flex-col space-y-2'>
                                                    <div>
                                                        {tw.tweet_content.tweet_body}
                                                    </div>

                                                    <div>
                                                        {
                                                            tw.tweet_content.picture
                                                            ?
                                                            <img
                                                            className='rounded-md h-80 w-full'
                                                            crossOrigin="anonymous"
                                                            src={config.domain+'/image/file/'+tw.tweet_content.picture}
                                                            alt="car"
                                                            />
                                                            :
                                                            null
                                                        }
                                                        
                                                    </div>

                                                    <div className='flex flex-row text-sm text-gray-400 space-x-3 justify-end'>
                                                        <div>{tw.user_id_users_replies.length} Comments</div>
                                                        <div>Retweets</div>
                                                        <div>{tw.likes.length} Likes</div>
                                                        <div>{tw.saveds.length} Saved</div>
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
                                                                tw.retweets.find(e=>e.user_id===user.user_id)
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

                                                        <div className='w-1/4'>
                                                            {
                                                                tw.likes.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-red-400 h-7 w-full px-2 rounded' onClick={()=>{unlikeTweet(tw.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{likeTweet(tw.tweet_id,user.user_id);formikLike.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                            }
                                                           
                                                        </div>

                                                        <div className='w-1/4 '>
                                                            {
                                                                tw.saveds.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-blue-400 h-7 w-full px-2 rounded' onClick={()=>{unsaveTweet(tw.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{saveTweet(tw.tweet_id,user.user_id);formikSave.handleSubmit()}}>
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
                                                        tw.user_id_users_replies && tw.user_id_users_replies.map(twr=>{
                                                            return(
                                                                <div className='flex flex-row'>
                                                        <div className='w-1/12'>
                                                            {
                                                                twr.photo
                                                                ?
                                                                <img
                                                                    className='rounded-md h-8 w-8'
                                                                    crossOrigin="anonymous" 
                                                                    src={config.domain+'/image/file/'+twr.photo}
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
                                                                    <div className='font-bold'>{twr.name}</div>
                                                                    <div className='text-sm text-gray-400'>31 Oktober 2022</div>
                                                                </div>

                                                                <div>
                                                                {twr.replies.reply}
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
                                }
                        </div>

                        <div className='flex flex-col w-4/12 space-y-3'>
                            <div className='flex flex-col bg-white border border-gray-200 rounded-lg p-3 shadow'>
                                <div className='border-b pb-2 font-semibold'>
                                    Trends for you
                                </div>

                                <div className='flex flex-col py-3 font-semibold'>
                                    <button className='flex flex-col justify-start'>
                                        <div>#programming</div>
                                        <div className='text-gray-400'>213k Tweets</div>
                                    </button>
                                </div>
                            </div>

                            {/* <div className='bg-white border border-gray-200 rounded-lg p-2 shadow'> */}
                                {/* <div className='border-b pb-2 font-semibold'>
                                    Who to follow
                                </div>

                                {
                                    who_to_follow && who_to_follow.map(whf=>{
                                        return(
                                            <div className='flex flex-col w-full'>
                                    <div className='flex flex-row space-x-3 py-3 items-center'>
                                        <div className='w-1/6'>
                                            {
                                                whf.photo
                                                ?
                                                
                                            <img
                                            className='rounded-md h-8 w-8'
                                            crossOrigin="anonymous" 
                                            src={config.domain+'/image/file/'+whf.photo}
                                            alt="car"
                                        />
                                                :
                                            <img
                                                                    className='rounded-md h-10 w-10'
                                                                    crossOrigin="anonymous" 
                                                                    src={config.domain+'/image/file/default.jpg'}
                                                                    alt="car"
                                                                />

                                            }
                                            
                                        </div>

                                        <div className='flex flex-col w-3/6 pb-1'>
                                            <div className='font-bold'>
                                                {whf.name}
                                            </div>

                                            <div className='text-sm text-gray-400'>
                                            {whf.count} followers
                                            </div>
                                        </div>

                                        <div className='w-2/6 pb-1'>
                                            <button className='bg-cyan-400 rounded h-7 w-full text-white font-medium text-base'>
                                                <FontAwesomeIcon  className="h-4 w-4 mr-2" icon={solid('user-plus')}/>
                                                Follow
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                    Whatever
                                    foto
                                    </div>
                                </div>
                                        )
                                    })
                                }
                            </div> */}
                        </div>
                    </div>
                    :
                    <Outlet/>
                }
            </div>
        </div>
    )
}