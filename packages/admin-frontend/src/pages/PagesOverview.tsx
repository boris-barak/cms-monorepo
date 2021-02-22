import * as React from 'react';
import { getAllPages } from '../api/content-service';
import { useQuery } from 'react-query';
import { Heading } from '../design-components/Heading';
import { Grid, GridBody, GridHeader, GridHeaderColumn, GridItem, GridRow } from '../design-components/Grid';
import { openInNewTab } from '../utils';
import { Button } from '../design-components/Button';

export const PagesOverview = () => {
    const { data: pages } = useQuery('pages', getAllPages);

    const handleOpen = (url: string) => openInNewTab(`http://localhost:3000/${url}`);
    const handleEdit = (url: string) => openInNewTab(`http://localhost:3000/${url}`);

    return (
        <>
            <Heading level={1}>Pages Overview</Heading>
            <Grid>
                <GridHeader>
                    <GridHeaderColumn border>Title</GridHeaderColumn>
                    <GridHeaderColumn border>URL</GridHeaderColumn>
                    <GridHeaderColumn border>Keywords</GridHeaderColumn>
                    <GridHeaderColumn border>Actions</GridHeaderColumn>
                </GridHeader>
                <GridBody>
                    {pages?.map((page) => (
                        <GridRow key={page.url}>
                            <GridItem border>{page.title}</GridItem>
                            <GridItem border>/{page.url}</GridItem>
                            <GridItem border>{page.keywords?.join(',')}</GridItem>
                            <GridItem border>
                                <Button onClick={() => handleOpen(page.url)}>Open</Button>
                                <Button onClick={() => handleEdit(page.url)}>Edit</Button>
                            </GridItem>
                        </GridRow>
                    ))}
                </GridBody>
            </Grid>
        </>
    );
};
