import { ContentItem, PageContent, Paragraph, Section } from 'cms-common/types/page';

type SetSectionHeaderAction = {
    type: 'setSectionHeader';
    sectionIndex: number;
    value: string;
};

type SetParagraphContentAction = {
    type: 'setParagraphContent';
    sectionIndex: number;
    itemIndex: number;
    value: string;
};

type Action = SetSectionHeaderAction | SetParagraphContentAction;

const updateSection = (state: PageContent, action: Action, update: (section: Section) => Partial<Section>) => ({
    ...state,
    sections: state.sections.map((section, index) => ({
        ...section,
        ...(index === action.sectionIndex && update(section)),
    })),
});

// const updateItem = (
//     state: PageContent,
//     action: SetParagraphContentAction,
//     update: (item: Paragraph) => Partial<Paragraph>,
// ) =>
//     updateSection(state, action, (section) => ({
//         items: section.items.map((item, itemIndex) => {
//             const r = {
//                 ...item,
//                 ...(itemIndex === action.itemIndex && update(item)),
//             };
//             return r;
//         }),
//     }));

export const reducer = (state: PageContent | undefined, action: Action) => {
    if (!state) {
        return state;
    }

    switch (action.type) {
        case 'setSectionHeader':
            return updateSection(state, action, () => ({ header: action.value }));
        case 'setParagraphContent':
            return updateSection(state, action, (section) => ({
                items: section.items.map((item, itemIndex) => ({
                    ...item,
                    ...(itemIndex === action.itemIndex && { content: action.value }),
                })),
            }));
        default:
            throw new Error();
    }
};
