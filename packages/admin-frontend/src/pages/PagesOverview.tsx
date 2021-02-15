import * as React from 'react';
import '../App.css';
import { getAllPages } from '../api/content-service';
import { useQuery } from 'react-query';
import { Heading } from '../design-components/Heading';
import { Grid, GridBody, GridHeader, GridHeaderColumn, GridItem, GridRow } from '../design-components/Grid';

export const PagesOverview = () => {
    const { data: pages } = useQuery('pages', getAllPages);

    return (
        <>
            <Heading level={1}>Pages Overview</Heading>
            <Grid>
                <GridHeader>
                    <GridHeaderColumn>Title</GridHeaderColumn>
                    <GridHeaderColumn>URL</GridHeaderColumn>
                    <GridHeaderColumn>Keywords</GridHeaderColumn>
                    <GridHeaderColumn>Web</GridHeaderColumn>
                </GridHeader>
                <GridBody>
                    {pages?.map((page) => (
                        <React.Fragment key={page.url}>
                            <GridRow>
                                <GridItem>{page.title}</GridItem>
                                <GridItem>/{page.url}</GridItem>
                                <GridItem>
                                    <a className="App-link" href={`http://localhost:3000/${page.url}`} target="_blank">
                                        See
                                    </a>
                                </GridItem>
                            </GridRow>
                            <GridRow>
                                <GridItem colSpan={3} htmlContent={page.content} />
                            </GridRow>
                        </React.Fragment>
                    ))}
                </GridBody>
            </Grid>
        </>
    );
};
