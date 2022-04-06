import axios from 'axios';
import { useEffect, useContext } from 'react';
import { UsersContext } from '../../contexts';
import './Users.scss';

export const Users = () => {
    const { state: { users }, actions: { onFetchUsersSuccess } } = useContext(UsersContext);
        
    useEffect(() => {
        if (users.length) {
            return;
        }

        axios.get(`https://randomuser.me/api/?results=4`)
            .then(({ data }) => {
               if(data?.results) {
                 onFetchUsersSuccess(data.results);
               }
            })
            .catch(() => {
              throw new Error('Error. No data');
            })
    }, [users, onFetchUsersSuccess]);

    return (
        <section className="s-team">
            <div className="container">
                <h2 className="s-team__title">Meet Us</h2>
                <ul className="l-team">
                    { users.map( user => (
                        <li className="l-team__card" key={user.name.first + user.name.last}>
                            <div className="l-team__cell">
                                <img className="l-team__photo" src={user.picture.large} alt={user.name.first + user.name.last} />
                                <div className="l-team__text-wrapper">
                                    <h4 className="l-team__name">{user.name.first} {user.name.last}</h4>
                                    <p className="l-team__position">Photographer</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
};