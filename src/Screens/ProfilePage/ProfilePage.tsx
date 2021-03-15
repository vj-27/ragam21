import React from 'react';
import HeaderProfile from '../../Components/Header/HeaderProfile';
import { UserProfile, EventById, PropTypes, onLogout } from '../../data';
import { Button, Typography } from 'antd';
import useFitText from "use-fit-text";
import EventCard from '../../Components/EventCard/EventCard';
import { useHistory } from 'react-router-dom';
export default function ProfilePage(props: PropTypes) {
    const { fontSize, ref } = useFitText({ maxFontSize: 200, minFontSize: 80 })
    const eventList = [];
    const history = useHistory();
    let event={"id": 4,
                "name": "event1",
                "submissionDate": "2021-03-19T06:30:00.000Z",
                "description": "markdown-description",
                "isTeamEvent": true,
                "Rules": "markdown-rules",
                "category": 2,
                "result": "markdown-result",
                "regStartDate": "2021-03-13T06:30:00.000Z",
                "regEndDate": "2021-03-19T06:30:00.000Z",
                "minTeamSize": 1,
                "maxTeamSize": 5,
                "slug": "event1",
                "isSubmissionEvent": true,
                "published_at": "2021-03-12T17:53:15.797Z",
                "created_at": "2021-03-12T17:52:25.661Z",
                "updated_at": "2021-03-14T09:48:10.226Z",
                "contacts": [
                    {
                        "id": 2,
                        "name": "contact1",
                        "phoneNumber": "contact-phone-num"
                    }
                ],
                "coverImage": null}
    return (<div>
        <div>
            <HeaderProfile showBack={true} />
        </div>

        <div className="center-text">
            <div ref={ref} style={{ fontSize }}>Name:{UserProfile['name']}</div>
            <div ref={ref} style={{ fontSize }}>College:{UserProfile['college']}</div>
            <div ref={ref} style={{ fontSize }}>Number:{UserProfile['phone']}</div>
            <br />
            <br />
            <Button onClick={() => { onLogout(props); history.push("/") }} >
                Logout
            </Button>
            <div ref={ref} style={{ fontSize }} ><u>registered Events</u></div>
            <EventCard {...event} />
        </div>
    </div>)
}