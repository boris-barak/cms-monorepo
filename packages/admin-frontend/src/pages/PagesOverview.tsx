import * as React from 'react';
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
                    <GridHeaderColumn border>Title</GridHeaderColumn>
                    <GridHeaderColumn border>URL</GridHeaderColumn>
                    <GridHeaderColumn border>Keywords</GridHeaderColumn>
                    <GridHeaderColumn border>Web</GridHeaderColumn>
                </GridHeader>
                <GridBody>
                    {pages?.map((page) => (
                        <React.Fragment key={page.url}>
                            <GridRow>
                                <GridItem border>{page.title}</GridItem>
                                <GridItem border>/{page.url}</GridItem>
                                <GridItem border>{page.keywords?.join(',')}</GridItem>
                                <GridItem border>
                                    <a className="App-link" href={`http://localhost:3000/${page.url}`} target="_blank">
                                        See
                                    </a>
                                </GridItem>
                            </GridRow>
                            <GridRow>
                                <GridItem border colSpan={3} htmlContent={page.content} />
                                <GridItem border>
                                    <a className="App-link" href={`http://localhost:3000/${page.url}`} target="_blank">
                                        Edit
                                    </a>
                                </GridItem>
                            </GridRow>
                            <GridRow>
                                <GridItem colSpan={4}>
                                    <hr />
                                </GridItem>
                            </GridRow>
                        </React.Fragment>
                    ))}
                </GridBody>
            </Grid>
        </>
    );
};
