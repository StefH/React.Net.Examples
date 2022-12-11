import axios from 'axios';
import React, { Component, useState, ChangeEvent, FunctionComponent, FormEvent } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { IButtonStyles, PrimaryButton } from '@fluentui/react/lib/Button';
import { stringIsNullOrEmpty } from '../utils/stringUtils';

type State = {
    name: string;
    text: string;
    comments: CommentProps[];
    selectedFruit: string;
};

type AuthorProps = {
    Name: string;
    GithubUsername: string;
};

type CommentProps = {
    Author: AuthorProps;
    Text: string;
};

type CommentsBoxProps = {
    Name: string;
    InitialComments: CommentProps[];
    Page: number;
};

type CommentsResult = {
    comments: CommentProps[];
    text: string;
    hasMore: boolean;
};

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 }
};

const buttonStyles: Partial<IButtonStyles> = {
    root: { width: 120 }
};

const options: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' }
];

export const TestComponentAsFunctional: FunctionComponent<CommentsBoxProps> = (props: CommentsBoxProps) => {
    const [state, setState] = useState<State>({
        name: props.Name,
        text: '',
        comments: props.InitialComments,
        selectedFruit: ''
    });

    const handleChange = async (ev: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, name: ev.target.value });
    };

    const onChangeDropdown = async (event: FormEvent<HTMLDivElement>, item: IDropdownOption): Promise<void> => {
        setState({ ...state, selectedFruit: item.key.toString() });
    };

    const _alertClicked = async (): Promise<void> => {
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'X-Custom-Header': 'foobar'
            }
        });

        const page = '2';

        const fruit = state.selectedFruit;

        const x = await instance.get<CommentsResult>(`/Home/Comments?page=${page}&text=${fruit}`);
        setState({
            ...state,
            comments: x.data.comments,
            text: state.comments[0].Text.concat('?', x.data.text)
        });
    };

    return (
        <Stack>
            <TextField
                label="Standard"
                value={state.name}
                onChange={handleChange}
            />
            <p>Hello from Functional, {state.name}!</p>

            <TextField
                value={state.text}
                readOnly={true}
            />

            <Dropdown
                onChange={onChangeDropdown}
                placeholder="Select an option"
                label="Dropdown"
                options={options}
                styles={dropdownStyles}
            />

            <PrimaryButton
                text="Click Me!..."
                onClick={_alertClicked}
                styles={buttonStyles}
                disabled={stringIsNullOrEmpty(state.selectedFruit)}
            />
        </Stack>
    );
};

export default class TestComponent extends Component<CommentsBoxProps, State> {
    state: State;

    constructor(props: CommentsBoxProps) {
        super(props);

        this.state = {
            name: props.Name,
            text: '',
            comments: props.InitialComments,
            selectedFruit: ''
        };
    }

    handleChange = async (ev: ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: ev.target.value });
    };

    _alertClicked = async (): Promise<void> => {
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'X-Custom-Header': 'foobar'
            }
        });

        const page = '2';

        const fruit = this.state.selectedFruit;

        const x = await instance.get<CommentsResult>(`/Home/Comments?page=${page}&text=${fruit}`);
        this.setState({
            comments: x.data.comments,
            text: this.state.comments[0].Text.concat('?', x.data.text)
        });
    };

    onChangeDropdown = async (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): Promise<void> => {
        this.setState({ selectedFruit: item.key.toString() });
    };

    render() {
        return (
            <Stack>
                <TextField
                    label="Standard"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <p>Hello from Component, {this.state.name}!</p>

                <TextField value={this.state.text} />

                <Dropdown
                    onChange={this.onChangeDropdown}
                    placeholder="Select an option"
                    label="Dropdown"
                    options={options}
                    styles={dropdownStyles}
                />

                <PrimaryButton
                    text="Click Me!..."
                    onClick={this._alertClicked}
                    styles={buttonStyles}
                    disabled={stringIsNullOrEmpty(this.state.selectedFruit)}
                />
            </Stack>
        );
    }
}
