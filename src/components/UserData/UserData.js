import { httpClient } from '../../api/httpClient';
import { useEffect, useContext, useState } from 'react';
import { AuthenticationContext } from '../../contexts';
import './UserData.scss';

export const UserData = () => {
    const { state: {userInformation}, actions: { setUserInformation, setAuthState }} = useContext(AuthenticationContext);
    const [isEditingEnable, setIsEditingEnable] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

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
    }, [userInformation, setUserInformation, setAuthState])

    const handleEditionFormSubmit = (e) => {
        e.preventDefault();

        const body = {
            firstName: e.target.elements.first_name.value,
            lastName : e.target.elements.last_name.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
        };

        if (body.firstName === '' || body.lastName === '' || body.email === '') {
            return;
        }

        if(body.password !== '') {

            httpClient.patch(`user`, body)
                .then(({ data }) => {
                    setUserInformation(data?.content);
                    setIsEditingEnable(false);
                    setIsPasswordEmpty(false);
                })
                .catch((error) => {
                    alert(error?.response?.data?.message || error?.message || 'Unknown error!')
                }
            );
        } else {
            setIsPasswordEmpty(true);
        }
    }


    return (
        <div className="s-userdata">
            <div className="container">
            {
                isEditingEnable ? 
                <form
                    className="f-edit-userdata"
                    method="POST"
                    onSubmit={handleEditionFormSubmit}
                >
                    <label className="f-edit-userdata__field-label">Имя:
                    <input type="text" name="first_name" className="f-edit-userdata__field" />
                    </label>

                    <label className="f-edit-userdata__field-label">Фамилия:
                    <input type="text" name="last_name" className="f-edit-userdata__field" />
                    </label>

                    <label className="f-edit-userdata__field-label">Почта:
                    <input type="email" name="email" className="f-edit-userdata__field" />
                    </label>

                    <label className="f-edit-userdata__field-label">Введите пароль:
                    <input type="password" name="password" className="f-edit-userdata__field" />
                    </label>
                    {isPasswordEmpty ? <p className="f-edit-userdata-error-massage">Пароль должен быть введен</p> : null}
                    
                    <div>
                       <button className="f-edit-userdata__btn-submit">Сохранить</button>
                        <button className="f-edit-userdata__btn-cancel" onClick={(e) => {
                            e.preventDefault();
                            setIsEditingEnable(false);
                        }}>Отмена</button> 
                    </div>
                    
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