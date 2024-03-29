import React, { useState, useEffect,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import {GetSavedTweetsRequest,GetLikedTweetsRequest} from '../redux-saga/Action/BookmarkPageAction'
import {AddLikeRequest,UnlikeRequest,AddSaveRequest,UnsaveRequest} from '../redux-saga/Action/HomePageActions'
import config from '../config/config'

export default function BookmarkPage(){
    const dispatch = useDispatch();
    const options = { year: "numeric", month: "long", day: "numeric"}

    const [selectTweet,setSelectTweet]=useState(true)
    const [selectLikedTweet,setSelectLikedTweet]=useState(false)
    const [refresh, setRefresh] = useState(false)
    const [tweetLikeId, setTweetLikeId] = useState(null)
    const [userLikeId, setuserLikeId] = useState(null)


    const {saved_tweets,liked_tweets} = useSelector(state => state.bookmarkPageState)
    const {user} = useSelector(state => state.loginPageState)

    console.log(saved_tweets);

    useEffect(() => {
        dispatch(GetSavedTweetsRequest(sessionStorage.getItem('user_id')));
        dispatch(GetLikedTweetsRequest(sessionStorage.getItem('user_id')));
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
        <div className='flex flex-row space-x-5 w-full pt-3 px-32'>
            <div className='flex flex-col bg-white p-3 w-4/12 shadow rounded-lg space-y-3 h-20 font-semibold text-gray-400'>
                <button onClick={()=>{setSelectTweet(true);setSelectLikedTweet(false)}} className={selectTweet ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Saved
                </button>

                <button onClick={()=>{setSelectTweet(false);setSelectLikedTweet(true)}} className={selectLikedTweet ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Liked
                </button>
            </div>

            <div className='w-8/12'>
                {
                    selectTweet
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
                    selectLikedTweet
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
                    null
                }   
            </div>
        </div>
    )
}