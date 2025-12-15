export interface IAddHTMLTagsArgs {
    startTag: string;
    endTag: string;
    textAreaElementId: string;
}

export default function addHTMLTags(args: IAddHTMLTagsArgs) {
    const { startTag, endTag, textAreaElementId } = args;
    const textAreaElement = document.getElementById(
        textAreaElementId,
    )! as HTMLInputElement;

    const startPos = textAreaElement.selectionStart as number;
    const endPos = textAreaElement.selectionEnd as number;

    const value = textAreaElement.value;
    const selectedText = textAreaElement.value.substring(startPos, endPos);
    const textWithAddedTags = startTag + selectedText + endTag;

    textAreaElement.value =
        value.substring(0, startPos) + textWithAddedTags + value.substring(endPos);
    textAreaElement.selectionEnd = startPos + textWithAddedTags.length;
    return textAreaElement;
}
