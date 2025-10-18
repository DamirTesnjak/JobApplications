export interface IButtonProps {
    id?: string;
    className: 'button' | 'textButton' | 'submitButton' | 'deleteButton' | 'primaryTextButton';
    iconName?: string;
    type: 'button' | 'submit' | 'reset';
    text?: string;
    onClick?: () => void;
}