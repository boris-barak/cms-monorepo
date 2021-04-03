import * as React from 'react';
import { Row, Col, Typography, Divider, Input } from 'antd';
import { useQuery } from 'react-query';
import { PageContent, Section } from 'cms-common/types/page';

import { getOnePageByUrl } from '../../../api/content-service';
import { UnknownContentItem } from './UnknownContentItemType';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

type Action =
    | {
          type: 'setSectionHeader';
          sectionIndex: number;
          value: string;
      }
    | {
          type: 'setParagraphContent';
          sectionIndex: number;
          itemIndex: number;
          value: string;
      };

const reducer = (state: PageContent | undefined, action: Action) => {
    if (!state) {
        return state;
    }

    switch (action.type) {
        case 'setSectionHeader':
            return {
                ...state,
                sections: state.sections.map((section, index) => ({
                    ...section,
                    ...(index === action.sectionIndex && { header: action.value }),
                })),
            };
        case 'setParagraphContent':
            return {
                ...state,
                sections: state.sections.map((section, index) => ({
                    ...section,
                    ...(index === action.sectionIndex && {
                        items: section.items.map((item, itemIndex) => ({
                            ...item,
                            ...(itemIndex === action.itemIndex && { content: action.value }),
                        })),
                    }),
                })),
            };
        default:
            throw new Error();
    }
};

type Props = {
    pageUrl?: string;
};

export const ContentEditor = ({ pageUrl }: Props) => {
    const { data: page } = useQuery(['page', pageUrl], () =>
        pageUrl !== undefined ? getOnePageByUrl(pageUrl) : undefined,
    );

    const [content, dispatch] = React.useReducer(reducer, page?.content);

    return (
        <>
            <Title level={2}>Content</Title>
            {content && (
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
                                <Paragraph
                                    editable={{
                                        onChange: (value) =>
                                            dispatch({ type: 'setSectionHeader', sectionIndex, value }),
                                    }}
                                >
                                    {section.header}
                                </Paragraph>
                                {section.items.map((item, itemIndex) => {
                                    switch (item.type) {
                                        case 'divider':
                                            return 'divider here';
                                        case 'paragraph':
                                            return (
                                                <TextArea
                                                    value={item.content}
                                                    showCount
                                                    maxLength={100}
                                                    onChange={(event) =>
                                                        dispatch({
                                                            type: 'setParagraphContent',
                                                            sectionIndex,
                                                            itemIndex,
                                                            value: event.target.value,
                                                        })
                                                    }
                                                    // onChange={onChange}
                                                />
                                            );
                                        default:
                                            return <UnknownContentItem contentItem={item} />;
                                    }
                                })}
                            </React.Fragment>
                        ))}
                    </Col>

                    <Col span={1} />

                    <Col span={12}>
                        {content.sections.map((section) => (
                            <>
                                <Title>{section.header}</Title>
                                {section.items.map((item) => {
                                    switch (item.type) {
                                        case 'divider':
                                            return (
                                                <Divider orientation={item.text?.orientation} dashed={item.dashed}>
                                                    {item.text?.content}
                                                </Divider>
                                            );
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
            )}
        </>
    );
};
