import React, { Suspense, useContext } from 'react';
import { useParams, useRouteMatch, Switch, Route } from 'react-router';
import {  NavLink } from 'react-router-dom'


// import Summary from '../Summary';
import LazyLoad from 'react-lazyload';


import './_profileTab.scss';
// import PlaylistList from '../PlaylistList';
import { PlayListCard } from '../UserPlaylist/PlaylistCard';
import LazyLoadingComponentLoader from '../../../../components/lazyLoadingLoaderComponent';
import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';


const UserUploads = React.lazy(() => LazyLoadingComponentLoader(() => import("../UserUploads")));
const Clipboard = React.lazy(() => LazyLoadingComponentLoader(() => import("../Clipboard")));
const LikedSlidesAndBooks = React.lazy(() => LazyLoadingComponentLoader(() => import("../LikedSlidesAndBooks")));
const ProfileFollowers = React.lazy(() => LazyLoadingComponentLoader(() => import("../../profilePreference")));


export const ProfileTab = ({ profileNav, user }) => {
    let { path, url } = useRouteMatch();

    const { userId } = useParams();
    // const parameteres = useParams();
    const { username } = useContext(AuthContext);




    // const renderBody = () => {
    //     switch (active) {
    //         case 'Liked':
    //             return <LazyLoad height={200} offset={100}>
    //                 <LikedSlidesAndBooks user={user} /> </LazyLoad>
    //         case 'Uploads':
    //             return <LazyLoad height={200} offset={100}>
    //                 <UserUploads user={user} /> </LazyLoad>
    //         case 'Followers':
    //             return <LazyLoad height={200} offset={100}>
    //                 <ProfileFollowers user={user} edit={username == userId} /> </LazyLoad>
    //         default:
    //             return <LazyLoad height={200} offset={100}>
    //                 <Summary edit={username == userId} /> </LazyLoad>
    //     }
    // }
    return (
        <>
            <div className="profileTab-wrapper" >
                {
                    profileNav.map((item, index) => {
                        return <NavLink key={item} className={isActive =>
                            (isActive ? "profileTab-wrapper-item-active" : "profileTab-wrapper-item")
                        } to={`${url}/${item}`}>

                            <p >{item.toUpperCase()}</p>
                        </NavLink>
                    })
                }
            </div>
            <div className="profileTab-body-wrapper">
                <Switch>
                    <Route exact path={`${path}/`}>
                        <LazyLoad height={200} offset={100}>
                        <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                            <UserUploads user={user} />
                            </Suspense>
                        </LazyLoad>
                    </Route>
                    <Route exact path={`${path}/playlists`}>
                        <LazyLoad height={200} offset={100}>

                            <PlayListCard />
                        </LazyLoad>
                    </Route>
                    <Route path={`${path}/liked`}>
                        <LazyLoad height={200} offset={100}>
                        <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                            <LikedSlidesAndBooks user={user} />
                            </Suspense>
                        </LazyLoad>
                    </Route>
                    <Route path={`${path}/uploads`}>
                        <LazyLoad height={200} offset={100}>
                        <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                            <UserUploads user={user} />
                            </Suspense>
                        </LazyLoad>
                    </Route>
                    <Route path={`${path}/followers`}>
                        <LazyLoad height={200} offset={100}>
                        <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                            <ProfileFollowers user={user} edit={username === userId} />
                            </Suspense>
                        </LazyLoad>
                    </Route>
                    <Route path={`${path}/clipboard`}>
                        <LazyLoad height={200} offset={100}>
                        <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                            <Clipboard user={user} edit={username === userId} />
                            </Suspense>
                        </LazyLoad>
                    </Route>
                </Switch>
            </div>

        </>
    )
}
