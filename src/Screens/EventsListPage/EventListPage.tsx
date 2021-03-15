import React, { useEffect } from 'react';
import { Input, Switch } from 'antd';
import EventCard from '../../Components/EventCard/EventCard';
import Header from '../../Components/Header/Header';
import { useParams } from 'react-router-dom';
import { EventsInCategory, EventCategories, PropTypes } from '../../data';
import userEvents from '../../data1.js';
import { useState } from 'react';
interface EventListProps {
    children: React.ReactNode[]
};



interface ParamTypes {
    cId: string

}


export default function EventListPage(props: PropTypes) {

    let { cId } = useParams<ParamTypes>();

    const [isCatFound, setisCatFound] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    const [SearchTerm, setSearchTerm] = useState('');
    const [Toggle, setToggle] = useState(false);
    const Toggler = () => {
        Toggle ? setToggle(false) : setToggle(true);
    }

    let RegEvents: number[] = [];
    var i;
    function RegEventsID() {
        for (i = 0; i < userEvents.length; i++) {
            RegEvents.push(userEvents[i].id);
        }
    };
    RegEventsID();
    function headerimg() {
        var k: string = "";
        EventCategories.filter(val => {

            if (val.id == cId) {
                k = val.bgImg;
            }
        })

        return k;
    }


    useEffect(() => {
            for (i of props.categories) {
                if (cId.localeCompare(i.slug) == 0) {
                    setisCatFound(true);
                    setisLoading(false);
                    console.log(isCatFound)
                    break;
                }
                if(isLoading)
                    setisLoading(false);
            }
    })
    if (isLoading == false) {
        if (isCatFound) {
            return (
                <>
                    <Header showBack={true} mainText={"InsideCategory " + cId} dashimg={headerimg()} user={props.user} />
                    <div>
                        <div className='center-align' >
                            <div style={{ borderRadius: '10px' }}>
                                <Input.Search placeholder="SEARCH...." onChange={event => { setSearchTerm(event.target.value) }} />
                            </div>
                            <div >
                                <Switch
                                    checkedChildren='Not Registered' unCheckedChildren='All'
                                    onClick={Toggler}
                                />
                            </div>
                        </div>
                        {EventsInCategory.filter(val => {
                            if (SearchTerm == '' && !Toggle) {
                                return val
                            }
                            else if (SearchTerm == '' && Toggle) {
                                if (!RegEvents.includes(val.id)) {
                                    return val
                                }
                            }
                            else if (val.name.toLowerCase().includes(SearchTerm.toLowerCase()) && Toggle) {
                                if (!RegEvents.includes(val.id)) {
                                    return val
                                }
                            }
                            else if (val.name.toLowerCase().includes(SearchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((value) => {
                            return <EventCard {...value} />
                        })}
                    </div>
                </>
            )
        }
        else {
            return (
                <div>Error</div>
            )
        }

    }
    else {
        return (
            <div>Loading...</div>
        )
    }

}
