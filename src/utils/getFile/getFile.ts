export type IFile = {
    name: string;
    data: string;
    contentType: string;
}

export function getFile(file: IFile) {
    const { name, data, contentType } = file;
    const fileType = contentType?.split('/')[1];

    if (fileType === 'pdf') {
        // Create new tag for download file
        const anchor = document.createElement('a');
        anchor.download = `${name}.${fileType}`;
        anchor.href = 'data:application/octet-stream;base64,' + data;
        anchor.dataset["downloadurl"] = [
            contentType,
            anchor.download,
            anchor.href,
        ].join(':');
        anchor.click();
        setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            URL.revokeObjectURL(anchor.href);
        }, 100);
    } else {
        return 'data:application/octet-stream;base64,' + data;
    }
    return;
}
