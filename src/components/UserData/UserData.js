import { useEffect, useContext } from 'react';
import { AuthenticationContext } from '../../contexts';
import axios from 'axios';
import './UserData.scss';

export const UserData = () => {
    const { state: {userInformation}, actions: { setUserInformation, setAuthState }} = useContext(AuthenticationContext);

    console.log(Object.keys(userInformation).length);

    useEffect(() => {

        if (Object.keys(userInformation).length) {
            return;
        }

        console.log(userInformation)

        axios.get('https://infinite-woodland-61407.herokuapp.com/api/v1/user', {
        headers: {Authorization: `Bearer ${localStorage.accessToken}`}})
            .then((data) => {
                setUserInformation(data.data.content)
            })
            .catch(error => {
                setAuthState(false);
                console.log(error);
        })
    }, [ [userInformation, setUserInformation]])


    return (
        <div className="s-userdata">
            <div className="container">
                <ul className="l-userdata">
                    <li className="l-userdata__item">Имя: {userInformation.firstName}</li>
                    <li className="l-userdata__item">Фамилия: {userInformation.lastName}</li>
                    <li className="l-userdata__item">Почта: {userInformation.email}</li>
                </ul>
            </div>
        </div>
    );
}