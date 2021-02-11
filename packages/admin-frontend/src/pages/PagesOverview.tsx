import * as React from 'react';
import '../App.css';
import { getPagesOverview } from '../api/content-service';
import { useQuery } from 'react-query';

export const PagesOverview = () => {
    const { data: pages } = useQuery('pages', getPagesOverview);

    return (
        <div className="App">
            <header className="App-header">
                <p>Pages Overview</p>
                {pages?.map((page) => (
                    <a className="App-link" href={page.url} target="_blank">
                        {page.title}
                    </a>
                ))}
            </header>
        </div>
    );
};
