import './Services.scss';

export const Services = () => {

    const objItems = [
        {
            title: 'Develop',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        },
        {
            title: 'Responsive',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        },
        {
            title: 'Clean Design',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        },
        {
            title: 'Graphic Design',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        },
        {
            title: 'Photography',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        },
        {
            title: 'Photo Editing',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        }
    ];

    return (
        <section className="s-services">
            <div className="container">
                <h2 className="s-services__title">Welcome To <span>Foinni</span></h2>
                <p className="s-services__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolores dolorum eveniet odio quibusdam! Molestiae, officiis atque voluptatibus adipisci repudiandae earum blanditiis?</p>
                <ul className="l-services">
                    { objItems.map(item => (
                        <li className="l-services__item" key={item.title}>
                            <div className="l-services__cell">
                                <img src="./img/icon-code.png" alt="icon" />
                                <h3 className="l-services__title">{item.title}</h3>
                                <p className="l-services__text">{item.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};