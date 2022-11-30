import React, { useState, useEffect,useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function BookmarkPage(){
    const [selectTop,setSelectTop]=useState(true)
    const [selectLatest,setSelectLatest]=useState(false)
    const [selectPeople,setSelectPeople]=useState(false)
    const [selectMedia,setSelectMedia]=useState(false)
    return(
        <div className='flex flex-row space-x-5 w-full pt-3 px-32'>
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
    )
}