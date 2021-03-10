import React, {useEffect} from 'react'
import axios from 'axios';

function LandingPage(props) {
    function onClickHandler() {
        axios.get('/api/users/logout')
        .then((response) => {
            if (response.data.success)
                props.history.push('/login');
            else
                alert("로그아웃 실패");
        });
    }

    return (
        <div style = {{
            display : 'flex', justifyContent : 'center', alignItems : 'center'
            , width : '100%', height : '100vh'}}>
            
            <h2>시작페이지</h2>
            <br/>
        </div>
    )
}

export default LandingPage;
