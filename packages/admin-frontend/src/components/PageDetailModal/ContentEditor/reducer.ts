import { ContentItem, Divider, PageContent, Paragraph, Section } from 'cms-common/types/page';
import { initialDivider, initialParagraph, initialSection } from './constants';

type AddSectionAction = {
    type: 'addSection';
    sectionIndex: number;
};

type RemoveSectionAction = {
    type: 'removeSection';
    sectionIndex: number;
};

type SetSectionHeaderAction = {
    type: 'setSectionHeader';
    sectionIndex: number;
    value: string;
};

type AddParagraphAction = {
    type: 'addParagraph';
    sectionIndex: number;
    itemIndex: number;
};

type AddDividerAction = {
    type: 'addDivider';
    sectionIndex: number;
    itemIndex: number;
};

type AddItemAction = AddParagraphAction | AddDividerAction;

type SetParagraphContentAction = {
    type: 'setParagraphContent';
    sectionIndex: number;
    itemIndex: number;
    value: string;
};

type RemoveItemAction = {
    type: 'removeItem';
    sectionIndex: number;
    itemIndex: number;
};

type Action =
    | AddSectionAction
    | RemoveSectionAction
    | SetSectionHeaderAction
    | AddItemAction
    | SetParagraphContentAction
    | RemoveItemAction;

const updateSection = (state: PageContent, action: Action, update: (section: Section) => Partial<Section>) => ({
    ...state,
    sections: state.sections.map((section, index) => ({
        ...section,
        ...(index === action.sectionIndex && update(section)),
    })),
});

const addArrayItem = <T>(itemArray: ReadonlyArray<T>, index: number, item: T): ReadonlyArray<T> => [
    ...itemArray.slice(0, index),
    item,
    ...itemArray.slice(index),
];

const addContentItem = <T extends ContentItem>(state: PageContent, action: AddItemAction, item: T) =>
    updateSection(state, action, (section) => ({
        items: addArrayItem<ContentItem>(section.items, action.itemIndex, item),
    }));

export const reducer = (state: PageContent, action: Action): PageContent => {
    switch (action.type) {
        case 'addSection':
            return {
                ...state,
                sections: addArrayItem<Section>(state.sections, action.sectionIndex, initialSection),
            };

        case 'removeSection':
            return {
                ...state,
                sections: state.sections.filter((_, sectionIndex) => sectionIndex !== action.sectionIndex),
            };

        case 'setSectionHeader':
            return updateSection(state, action, () => ({ header: action.value }));

        case 'addParagraph':
            return addContentItem<Paragraph>(state, action, initialParagraph);

        case 'addDivider':
            return addContentItem<Divider>(state, action, initialDivider);

        case 'setParagraphContent':
            return updateSection(state, action, (section) => ({
                items: section.items.map((item, itemIndex) => ({
                    ...item,
                    ...(itemIndex === action.itemIndex && { content: action.value }),
                })),
            }));

        case 'removeItem':
            return updateSection(state, action, (section) => ({
                items: section.items.filter((_, itemIndex) => itemIndex !== action.itemIndex),
            }));

        default:
            throw new Error();
    }
};
