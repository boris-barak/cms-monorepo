import * as React from 'react';
import { Row, Col, Typography, Divider, Input, Button, Popover } from 'antd';
import { useQuery } from 'react-query';
import { Section } from 'cms-common/types/page';

import { getOnePageByUrl } from '../../../api/content-service';
import { UnknownContentItem } from './UnknownContentItemType';
import { reducer } from './reducer';
import { DeleteTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

type Props = {
    pageUrl?: string;
};

export const ContentEditor = ({ pageUrl }: Props) => {
    const { data: page } = useQuery(['page', pageUrl], () =>
        pageUrl !== undefined ? getOnePageByUrl(pageUrl) : undefined,
    );

    const [content, dispatch] = React.useReducer(reducer, page?.content);

    if (!content) {
        return null;
    }

    return (
        <Row>
            <Col span={12}>
                <Title level={3}>Editor</Title>
            </Col>
            <Col span={12}>
                <Title level={3}>Preview</Title>
            </Col>

            <Col span={11}>
                {content.sections.map((section: Section, sectionIndex: number) => (
                    <React.Fragment key={section.hash}>
                        <Popover
                            placement="topRight"
                            title="Section actions"
                            content={
                                <Button
                                    icon={<DeleteTwoTone />}
                                    onClick={() =>
                                        dispatch({
                                            type: 'removeSection',
                                            sectionIndex,
                                        })
                                    }
                                >
                                    Remove
                                </Button>
                            }
                        >
                            <Input
                                value={section.header}
                                onChange={(event) =>
                                    dispatch({ type: 'setSectionHeader', sectionIndex, value: event.target.value })
                                }
                            />
                        </Popover>
                        <Row>
                            <Col span={1} />
                            <Col span={23}>
                                {section.items.map((item, itemIndex) => {
                                    switch (item.type) {
                                        case 'divider':
                                            return (
                                                <Popover
                                                    placement="topRight"
                                                    title="Divider actions"
                                                    content={
                                                        <Button
                                                            icon={<DeleteTwoTone />}
                                                            onClick={() =>
                                                                dispatch({
                                                                    type: 'removeItem',
                                                                    sectionIndex,
                                                                    itemIndex,
                                                                })
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    }
                                                >
                                                    <Divider>Divider</Divider>
                                                </Popover>
                                            );
                                        case 'paragraph':
                                            return (
                                                <Popover
                                                    placement="topRight"
                                                    title="Paragraph actions"
                                                    content={
                                                        <Button
                                                            icon={<DeleteTwoTone />}
                                                            onClick={() =>
                                                                dispatch({
                                                                    type: 'removeItem',
                                                                    sectionIndex,
                                                                    itemIndex,
                                                                })
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    }
                                                >
                                                    <TextArea
                                                        value={item.content}
                                                        showCount
                                                        onChange={(event) =>
                                                            dispatch({
                                                                type: 'setParagraphContent',
                                                                sectionIndex,
                                                                itemIndex,
                                                                value: event.target.value,
                                                            })
                                                        }
                                                    />
                                                </Popover>
                                            );
                                        default:
                                            return <UnknownContentItem contentItem={item} />;
                                    }
                                })}
                                <Button
                                    type="dashed"
                                    onClick={() =>
                                        dispatch({
                                            type: 'addParagraph',
                                            sectionIndex,
                                            itemIndex: section.items.length,
                                        })
                                    }
                                    style={{ width: '100%' }}
                                    icon={<PlusCircleTwoTone />}
                                >
                                    Add a paragraph
                                </Button>
                                <Button
                                    type="dashed"
                                    onClick={() =>
                                        dispatch({
                                            type: 'addDivider',
                                            sectionIndex,
                                            itemIndex: section.items.length,
                                        })
                                    }
                                    style={{ width: '100%' }}
                                    icon={<PlusCircleTwoTone />}
                                >
                                    Add a divider
                                </Button>
                            </Col>
                        </Row>
                    </React.Fragment>
                ))}
                <Button
                    type="dashed"
                    onClick={() =>
                        dispatch({
                            type: 'addSection',
                            sectionIndex: content.sections.length,
                        })
                    }
                    style={{ width: '100%' }}
                    icon={<PlusCircleTwoTone />}
                >
                    Add a section
                </Button>
            </Col>

            <Col span={1} />

            <Col span={12}>
                {content.sections.map((section) => (
                    <>
                        <Title>{section.header}</Title>
                        {section.items.map((item) => {
                            switch (item.type) {
                                case 'divider':
                                    return <Divider />;
                                case 'paragraph':
                                    return <Paragraph>{item.content}</Paragraph>;
                                default:
                                    return <UnknownContentItem contentItem={item} />;
                            }
                        })}
                    </>
                ))}
            </Col>
        </Row>
    );
};
