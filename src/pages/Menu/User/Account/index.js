import React from 'react';
import {Card} from 'antd';

const Account = () => {

    return (
        <>
            <Card title="After Login">
                <ul>
                    <li>
                        你可以修改背景颜色.
                    </li>
                    <li>
                        可以保存你喜欢的歌曲.
                    </li>
                    <li>
                        可以访问最近听歌的记录.
                    </li>
                </ul>
            </Card>
        </>
    );
};
export default Account;