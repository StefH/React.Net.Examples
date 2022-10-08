import axios from 'axios';
import React, { useState, ChangeEvent, MouseEventHandler } from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { DefaultButton, IButtonStyles, PrimaryButton } from '@fluentui/react/lib/Button';

export class State {
    name: string;
    text: string;
    comments: CommentProps[];
    selectedFruit: string;
}

export class AuthorProps {
    Name: string;
    GithubUsername: string;
}

export class CommentProps {
    Author: AuthorProps;
    Text: string;
}

type CommentsBoxProps = {
    name: string;
    initialComments: CommentProps[];
    page: number;
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
    {
        key: 'vegetablesHeader',
        text: 'Vegetables',
        itemType: DropdownMenuItemType.Header
    },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' }
];

const isNullOrEmpty = (str: null | undefined | string): boolean => {
    return !!!str || /^\s*$/.test(str);
};

export default class TestComponent extends React.Component<CommentsBoxProps, State> {
    state: State;

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            text: '',
            comments: props.initialComments,
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
                <TextField label="Standard" value={this.state.name} onChange={this.handleChange} />
                <p>Hello, {this.state.name}!</p>

                <TextField value={this.state.text} />

                <Dropdown onChange={this.onChangeDropdown} placeholder="Select an option" label="Dropdown" options={options} styles={dropdownStyles} />

                <PrimaryButton text="Click Me!..." onClick={this._alertClicked} styles={buttonStyles} disabled={isNullOrEmpty(this.state.selectedFruit)} />
            </Stack>
        );
    }
}
