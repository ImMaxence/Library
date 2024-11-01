import React from 'react';
import Layout from '../components/Layout'
import { Skeleton } from 'antd'
import { } from '../services/userService'

const BOPage = () => {
    return (
        <Layout>
            <div className='bo_container'>
                <h1>Back Office</h1>

                <section>
                    <h3 className='title'>Gestion des utilisateurs</h3>
                    <Skeleton active />
                </section>
                <section>
                    <h3 className='title'>Gestion des livres</h3>
                    <Skeleton active />
                </section>
                <section>
                    <h3 className='title'>Gestion futur ajouts</h3>
                    <Skeleton active />
                </section>

            </div>
        </Layout>
    );
};

export default BOPage;