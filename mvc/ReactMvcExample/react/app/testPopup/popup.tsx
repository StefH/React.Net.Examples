import React, { Component, FunctionComponent } from 'react';
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const popupStyles = mergeStyleSets({
    root: {
        background: 'rgba(0, 0, 0, 0.2)',
        bottom: '0',
        left: '0',
        position: 'fixed',
        right: '0',
        top: '0'
    },
    content: {
        background: 'white',
        left: '50%',
        maxWidth: '400px',
        padding: '0 2em 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
});

type PopupComponentAsComponentProps = {
    isPopupVisible: boolean;
    text: string;
};

type PopupComponentAsComponentState = {
    isPopupVisible: boolean;
};

const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px',
    color: 'darkblue',
    cursor: 'pointer'
});

export default class PopupComponentAsClass extends Component<PopupComponentAsComponentProps, PopupComponentAsComponentState> {
    state: PopupComponentAsComponentState;

    constructor(props: PopupComponentAsComponentProps) {
        super(props);

        this.state = {
            isPopupVisible: props.isPopupVisible
        };
    }

    hidePopup(): void {
        this.setState({ isPopupVisible: false });
    }

    render() {
        return (
            <>
                <div>
                    <FontIcon
                        aria-label="Touch"
                        iconName="Touch"
                        className={iconClass}
                        onClick={() => this.setState({ isPopupVisible: true })}
                    />
                </div>
                {this.state.isPopupVisible && (
                    <Layer>
                        <Popup
                            className={popupStyles.root}
                            role="dialog"
                            aria-modal="true"
                            onDismiss={this.hidePopup}
                            enableAriaHiddenSiblings={true}>
                            <Overlay onClick={this.hidePopup} />
                            <FocusTrapZone>
                                <div
                                    role="document"
                                    className={popupStyles.content}>
                                    <h2>Example Popup</h2>
                                    <p>{this.props.text}</p>
                                    <DefaultButton onClick={this.hidePopup}>Close Popup</DefaultButton>
                                </div>
                            </FocusTrapZone>
                        </Popup>
                    </Layer>
                )}
            </>
        );
    }
}

export const PopupComponent: FunctionComponent<PopupComponentAsComponentProps> = (props: PopupComponentAsComponentProps) => {
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(props.isPopupVisible);

    return (
        <>
            <div>
                <FontIcon
                    aria-label="Touch"
                    iconName="Touch"
                    className={iconClass}
                    onClick={showPopup}
                />
            </div>
            {isPopupVisible && (
                <Layer>
                    <Popup
                        className={popupStyles.root}
                        role="dialog"
                        aria-modal="true"
                        onDismiss={hidePopup}
                        enableAriaHiddenSiblings={true}>
                        <Overlay onClick={hidePopup} />
                        <FocusTrapZone>
                            <div
                                role="document"
                                className={popupStyles.content}>
                                <h2>Example Popup</h2>
                                <p>{props.text}</p>
                                <DefaultButton onClick={hidePopup}>Close Popup</DefaultButton>
                            </div>
                        </FocusTrapZone>
                    </Popup>
                </Layer>
            )}
        </>
    );
};
