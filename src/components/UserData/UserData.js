import { httpClient } from '../../api/httpClient';
import { useEffect, useContext, useState } from 'react';
import { AuthenticationContext } from '../../contexts';
import './UserData.scss';

export const UserData = () => {
    const { state: {userInformation}, actions: { setUserInformation, setAuthState }} = useContext(AuthenticationContext);
    const [isEditingEnable, setIsEditingEnable] = useState(false);

    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);


    const editUserData = () => {
        setIsEditingEnable(true);
    }


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

    const handleEditionFormSubmit = (e) => {
        e.preventDefault();

        const body = {
            firstName: e.target.elements.first_name.value,
            lastName : e.target.elements.last_name.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
        };

        
        httpClient.patch(`user`, body)
            .then(({ data }) => {
                setUserInformation(data?.content);
                setIsEditingEnable(false);

            })
            .catch((error) => {
                if(error?.response?.data?.message === "\"password\" is not allowed to be empty") {
                    setIsPasswordEmpty(true);
                }
                // alert(error?.response?.data?.message || error?.message || 'Unknown error!')
            }
        );
    }


    return (
        <div className="s-userdata">
            <div className="container">
            {
                isEditingEnable ? 
                <form
                    className="f-edit"
                    method="POST"
                    onSubmit={handleEditionFormSubmit}
                >
                    <label className="f-edit__field-label">Имя:
                    <input type="text" name="first_name" className="f-edit__field" />
                    </label>

                    <label className="f-edit__field-label">Фамилия:
                    <input type="text" name="last_name" className="f-edit__field" />
                    </label>

                    <label className="f-edit__field-label">Почта:
                    <input type="email" name="email" className="f-edit__field" />
                    </label>

                    <label className="f-edit__field-label">Введите пароль:
                    <input type="password" name="password" className="f-edit__field" />
                    </label>
                    {isPasswordEmpty ? <p className="f-edit-error-massage">Пароль должен быть введен</p> : null}

                    <button className="f-edit__btn-submit" >Сохранить</button>
                </form>
                : 
                <>
                    <ul className="l-userdata">
                        <li className="l-userdata__item">Имя: {userInformation?.firstName}</li>
                        <li className="l-userdata__item">Фамилия: {userInformation?.lastName}</li>
                        <li className="l-userdata__item">Почта: {userInformation?.email}</li>
                    </ul>
                    <button className="btn-userdata-edit" onClick={() => setIsEditingEnable(true)}>Редактировать</button>
                </>
            }
                
            </div>
        </div>
    );
}