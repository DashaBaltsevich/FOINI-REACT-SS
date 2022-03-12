import { useState, useEffect, useContext } from 'react';
import { PersonsContext } from '../App';
import axios from 'axios';
import './styles/Users.scss';

export const Users = () => {
    // const [persons, setPersons] = useState();
    let persons = useContext(PersonsContext);
        console.log(persons)
        
        
        
    useEffect(() => {axios.get(`https://randomuser.me/api/?results=4`)
            .then(res => {
                const personsData = res.data;
                persons = personsData;
                console.log(persons)
            })
            .catch(() => {
              console.log('Error');
            })
    }, []);
    console.log(persons)

    // useEffect(() => {
    //     axios.get(`https://randomuser.me/api/?results=4`)
    //         .then(res => {
    //             const persons = res.data;
    //             setPersons(persons);
    //         })
    //         .catch(() => {
    //           console.log('Error');
    //         })
    //     }, [])


      

    if(!persons) return 'нет данных';

    return (
        <section className='s-team'>
            <div className='container'>
                <h2 className='s-team__title'>Meet Us</h2>
                <ul className='l-team'>
                    <li className='l-team__card'>
                        <div className='l-team__cell'>
                            <img src={persons.results[0].picture.large} alt='photo' width='200' />
                            <div className='l-team__text-wrapper'>
                                <h4 className='l-team__name'>{persons.results[0].name.first} {persons.results[0].name.last}</h4>
                                <p className='l-team__position'>Photographer</p>
                            </div>
                        </div>
                    </li>
                    <li className='l-team__card'>
                        <div className='l-team__cell'>
                            <img src={persons.results[1].picture.large} alt='photo' width='200' />
                            <div className='l-team__text-wrapper'>
                                <h4 className='l-team__name'>{persons.results[1].name.first} {persons.results[1].name.last}</h4>
                                <p className='l-team__position'>Photographer</p>
                            </div>
                        </div>
                    </li>
                    <li className='l-team__card'>
                        <div className='l-team__cell'>
                            <img src={persons.results[2].picture.large} alt='photo' width='200' />
                            <div className='l-team__text-wrapper'>
                                <h4 className='l-team__name'>{persons.results[2].name.first} {persons.results[2].name.last}</h4>
                                <p className='l-team__position'>Photographer</p>
                            </div>
                        </div>
                    </li>
                    <li className='l-team__card'>
                        <div className='l-team__cell'>
                            <img src={persons.results[3].picture.large} alt='photo' width='200' />
                            <div className='l-team__text-wrapper'>
                                <h4 className='l-team__name'>{persons.results[3].name.first} {persons.results[3].name.last}</h4>
                                <p className='l-team__position'>Photographer</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}