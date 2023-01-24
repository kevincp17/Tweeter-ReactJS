import React, { useState, useEffect,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import {GetTopTweetsRequest,GetLatestTweetsRequest,GetPopularUserRequest} from '../redux-saga/Action/ExplorePageAction'
import {AddLikeRequest,UnlikeRequest,AddSaveRequest,UnsaveRequest} from '../redux-saga/Action/HomePageActions'
import config from '../config/config'

export default function ExplorePage(){
    const dispatch = useDispatch();
    const options = { year: "numeric", month: "long", day: "numeric"}
    
    const [selectTop,setSelectTop]=useState(true)
    const [selectLatest,setSelectLatest]=useState(false)
    const [selectPeople,setSelectPeople]=useState(false)
    const [refresh, setRefresh] = useState(false)
    const [tweetLikeId, setTweetLikeId] = useState(null)
    const [userLikeId, setuserLikeId] = useState(null)

    
    const {top_tweets,latest_tweets,popular_users} = useSelector(state => state.explorePageState)
    const {user} = useSelector(state => state.loginPageState)
    console.log(popular_users);

    useEffect(() => {
        dispatch(GetTopTweetsRequest());
        dispatch(GetLatestTweetsRequest());
        dispatch(GetPopularUserRequest(user.user_id));
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
            <div className='flex flex-col bg-white p-3 w-4/12 shadow rounded-lg space-y-3 h-32 font-semibold text-gray-400'>
                <button onClick={()=>{setSelectTop(true);setSelectLatest(false);setSelectPeople(false)}} className={selectTop ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Top
                </button>

                <button onClick={()=>{setSelectTop(false);setSelectLatest(true);setSelectPeople(false)}} className={selectLatest ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    Latest
                </button>

                <button onClick={()=>{setSelectTop(false);setSelectLatest(false);setSelectPeople(true)}} className={selectPeople ? 'flex justify-start px-2 border-l-2 border-cyan-400' : 'flex justify-start px-2 border-l-2 border-white'}>
                    People
                </button>
            </div>

            <div className='w-8/12'>
                <div className='flex flex-row w-full p-2 bg-white space-x-2 rounded-lg shadow'>
                    <input className='w-full' placeholder='Search' type='text'/>

                    <button className='bg-cyan-400 px-4 h-7 rounded-lg text-white'>
                        Search
                    </button>
                </div>

                {
                    selectTop
                    ?
                    top_tweets && top_tweets.map(tp=>{
                        return(
                            <div key={tp.tweet_id} className='flex flex-col bg-white p-3 w-full border border-gray-200 rounded-lg mt-5 shadow mb-3'>
                                <div className='flex flex-flex-row items-center space-x-3'>
                                    <div>
                                    {
                                                            tp.tweet_user.photo
                                                            ?
                                                            <img className='rounded-md h-10 w-10' crossOrigin="anonymous" src={config.domain+'/image/file/'+tp.tweet_user.photo}/>
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
                                            {tp.tweet_user.name}
                                        </div>

                                        <div className='text-sm text-gray-400'>
                                            {
                                                new Date(tp.time_created).toLocaleDateString(undefined, options)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <div>
                                        {tp.tweet_content.tweet_body}
                                    </div>

                                    <div>
                                    {
                                                            tp.tweet_content.picture
                                                            ?
                                                            <img
                                                            className='rounded-md h-80 w-full'
                                                            crossOrigin="anonymous"
                                                            src={config.domain+'/image/file/'+tp.tweet_content.picture}
                                                            alt="car"
                                                            />
                                                            :
                                                            null
                                                        }
                                    </div>

                                    <div className='flex flex-row text-sm text-gray-400 space-x-3 justify-end'>
                                    <div>{tp.user_id_users_replies.length} Comments</div>
                                                        <div>Retweets</div>
                                                        <div>{tp.likes.length} Likes</div>
                                                        <div>{tp.saveds.length} Saved</div>
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
                                                                tp.retweets.find(e=>e.user_id===user.user_id)
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
                                                                tp.likes.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-red-400 h-7 w-full px-2 rounded' onClick={()=>{unlikeTweet(tp.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{likeTweet(tp.tweet_id,user.user_id);formikLike.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                            }
                                        </div>

                                        <div className='w-1/4 text-blue-400'>
                                        {
                                                                tp.saveds.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-blue-400 h-7 w-full px-2 rounded' onClick={()=>{unsaveTweet(tp.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{saveTweet(tp.tweet_id,user.user_id);formikSave.handleSubmit()}}>
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
                                                        tp.user_id_users_replies && tp.user_id_users_replies.map(twr=>{
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
                    :
                    selectLatest
                    ?
                    latest_tweets && latest_tweets.map(tl=>{
                        return(
                            <div key={tl.tweet_id} className='flex flex-col bg-white p-3 w-full border border-gray-200 rounded-lg mt-5 shadow mb-3'>
                                <div className='flex flex-flex-row items-center space-x-3'>
                                    <div>
                                    {
                                                            tl.tweet_user.photo
                                                            ?
                                                            <img className='rounded-md h-10 w-10' crossOrigin="anonymous" src={config.domain+'/image/file/'+tl.tweet_user.photo}/>
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
                                            {tl.tweet_user.name}
                                        </div>

                                        <div className='text-sm text-gray-400'>
                                            {                          
                                                new Date(tl.time_created).toLocaleDateString(undefined, options)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <div>
                                        {tl.tweet_content.tweet_body}
                                    </div>

                                    <div>
                                    {
                                                            tl.tweet_content.picture
                                                            ?
                                                            <img
                                                            className='rounded-md h-80 w-full'
                                                            crossOrigin="anonymous"
                                                            src={config.domain+'/image/file/'+tl.tweet_content.picture}
                                                            alt="car"
                                                            />
                                                            :
                                                            null
                                                        }
                                    </div>

                                    <div className='flex flex-row text-sm text-gray-400 space-x-3 justify-end'>
                                    <div>{tl.user_id_users_replies.length} Comments</div>
                                                        <div>Retweets</div>
                                                        <div>{tl.likes.length} Likes</div>
                                                        <div>{tl.saveds.length} Saved</div>
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
                                                                tl.retweets.find(e=>e.user_id===user.user_id)
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
                                                                tl.likes.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-red-400 h-7 w-full px-2 rounded' onClick={()=>{unlikeTweet(tl.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{likeTweet(tl.tweet_id,user.user_id);formikLike.handleSubmit()}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('heart')}/>
                                                                                Liked
                                                                            </button>
                                                            }
                                        </div>

                                        <div className='w-1/4 text-blue-400'>
                                        {
                                                                tl.saveds.find(e=>e.user_id===user.user_id)
                                                                ?
                                                                <button className='transition hover:bg-gray-100 text-blue-400 h-7 w-full px-2 rounded' onClick={()=>{unsaveTweet(tl.tweet_id,user.user_id)}}>
                                                                                <FontAwesomeIcon  className="h-4 w-4" icon={solid('bookmark')}/>
                                                                                Saved
                                                                            </button>
                                                                :
                                                                <button className='transition hover:bg-gray-100 text-gray-400 h-7 w-full px-2 rounded' onClick={()=>{saveTweet(tl.tweet_id,user.user_id);formikSave.handleSubmit()}}>
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
                                                        tl.user_id_users_replies && tl.user_id_users_replies.map(twr=>{
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
                    :
                    selectPeople
                    ?
                    popular_users && popular_users.map(pu=>{
                        return(
                            <div key={pu.user_id} className='flex flex-col bg-white p-3 w-full border border-gray-200 rounded-lg mt-5 shadow mb-3'>
                                <div className='flex flex-row'>
                                    <div className='w-1/12 flex items-center'>
                                    {
                                        pu.photo
                                        ?
                                        <img
                                            className='rounded-md h-10 w-10'
                                            crossOrigin="anonymous" 
                                            src={config.domain+'/image/file/'+pu.photo}
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

                                    <div className='flex flex-col items-start w-9/12'>
                                        <div className='font-bold'>{pu.name}</div>

                                        <div className='text-gray-400'>{pu.followers} followers</div>
                                    </div>

                                    <div className='w-2/12 flex items-center'>
                                        {
                                            pu.follower_id===user.user_id
                                            ?
                                            <button className='bg-cyan-400 h-9 w-24 rounded-lg text-white'>
                                                <FontAwesomeIcon  className="h-4 w-4 mr-2" icon={solid('user-plus')}/>
                                                Unfollow
                                            </button>
                                            :
                                            <button className='bg-cyan-400 h-9 w-24 rounded-lg text-white'>
                                                <FontAwesomeIcon  className="h-4 w-4 mr-2" icon={solid('user-plus')}/>
                                                Follow
                                            </button>
                                        }
                                        
                                    </div>
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