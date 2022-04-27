import { httpClient } from '../../api/httpClient';
import { useEffect, useContext } from 'react';
import { AuthenticationContext } from '../../contexts';
import './UserData.scss';

export const UserData = () => {
    const { state: {userInformation}, actions: { setUserInformation, setAuthState }} = useContext(AuthenticationContext);

    useEffect(() => {

        if (userInformation !== null) {
            return;
        }

        httpClient.get('user')
            .then((data) => {
                setUserInformation(data?.data.content);
            })
            .catch((error) => {
                setAuthState(false);
                alert(error?.response?.data?.message || error?.message || 'Unknown error!');
        })
    }, [userInformation, setUserInformation])


    return (
        <div className="s-userdata">
            <div className="container">
                <ul className="l-userdata">
                    <li className="l-userdata__item">Имя: {userInformation?.firstName}</li>
                    <li className="l-userdata__item">Фамилия: {userInformation?.lastName}</li>
                    <li className="l-userdata__item">Почта: {userInformation?.email}</li>
                </ul>
            </div>
        </div>
    );
}