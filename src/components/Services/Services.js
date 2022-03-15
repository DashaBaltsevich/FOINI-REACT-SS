import './Services.scss';

export const Services = () => {

    const objNames = {
        develop: 'Develop',
        respondive: 'Responsive',
        cleanDesign: 'Clean Design',
        graphicDesign: 'Graphic Design',
        photography: 'Photography',
        photoEditing: 'Photo Editing',
    }
    const objTexts = {
        develop: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        respondive: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        cleanDesign: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        graphicDesign: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        photography: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
        photoEditing: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ex doloribus vitae facere',
    }

    return (
        <section className='s-services'>
            <div className='container'>
                <h2 className='s-services__title'>Welcome To <span>Foinni</span></h2>
                <p className='s-services__text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolores dolorum eveniet odio quibusdam! Molestiae, officiis atque voluptatibus adipisci repudiandae earum blanditiis?</p>
                <ul className='l-services'>
                    <li className='l-services__item'>
                        <div className='l-services__cell'>
                            <img src='./img/icon-code.png' alt='icon-code' />
                            <h3 className='l-services__title'>{objNames.develop}</h3>
                            <p className='l-services__text'>{objTexts.develop}</p>
                        </div>
                    </li>
                    <li className='l-services__item'>
                        <div className='l-services__cell'>
                            <img src='./img/icon-imac.png' alt='icon-code' />
                            <h3 className='l-services__title'>{objNames.respondive}</h3>
                            <p className='l-services__text'>{objTexts.respondive}</p>
                        </div>
                    </li>
                    <li className='l-services__item'>
                        <div className='l-services__cell'>
                            <img src='./img/icon-wifi.png' alt='icon-code' />
                            <h3 className='l-services__title'>{objNames.cleanDesign}</h3>
                            <p className='l-services__text'>{objTexts.cleanDesign}</p>
                        </div>
                    </li>
                    <li className='l-services__item'>
                        <div className='l-services__cell'>
                            <img src='./img/icon-view.png' alt='icon-code' />
                            <h3 className='l-services__title'>{objNames.graphicDesign}</h3>
                            <p className='l-services__text'>{objTexts.graphicDesign}</p>
                        </div>
                    </li>
                    <li className='l-services__item'>
                        <div className='l-services__cell'>
                            <img src='./img/icon-camera.png' alt='icon-code' />
                            <h3 className='l-services__title'>{objNames.photography}</h3>
                            <p className='l-services__text'>{objTexts.photography}</p>
                        </div>
                    </li>
                    <li className='l-services__item'>
                        <div className='l-services__cell'>
                            <img src='./img/icon-brightness.png' alt='icon-code' />
                            <h3 className='l-services__title'>{objNames.photoEditing}</h3>
                            <p className='l-services__text'>{objTexts.photoEditing}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}