import React from 'react';
import MenuBar from './MenuBar';
import FavouritesList from './FavouritesList';

function TeacherList({updateUser}){
    return (
        <div>
            <div>
                <MenuBar />
            </div>
            <div>
                <FavouritesList />
            </div>

        </div>
    )
}

export default TeacherList;