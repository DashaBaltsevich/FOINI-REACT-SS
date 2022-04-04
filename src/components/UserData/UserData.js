import './UserData.scss';
export const UserData = () => {

    return (
        <div className="s-userdata">
            <div className="container">
                <ul className="l-userdata">
                    <li className="l-userdata__item">Имя:</li>
                    <li className="l-userdata__item">Фамилия:</li>
                    <li className="l-userdata__item">Почта:</li>
                    <li className="l-userdata__item">Пароль</li>
                </ul>
            </div>
        </div>
    );
}